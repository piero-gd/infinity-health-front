import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '../stores/useCartStore';
import { cartService } from '../services/cartService';
import type { CartHookReturn } from '../types';

/**
 * Hook para gestionar el carrito de compras
 * Combina Zustand para el estado local y React Query para operaciones asíncronas
 */
export function useCart(): CartHookReturn {
  const queryClient = useQueryClient();
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity: updateItemQuantity, 
    clearCart,
    isOpen,
    toggleCart
  } = useCartStore();
  
  // Configuración fija (podría venir de una API en el futuro)
  const shipping = 5.99;
  const discountPercent = 0; // Por ahora no hay descuento
  
  // Calcular totales
  const subtotal = items.reduce(
    (sum, item) => sum + (parseFloat(item.price) * item.quantity), 
    0
  );
  
  const subtotalEmbajador = items.reduce(
    (sum, item) => sum + (parseFloat(item.price_amb) * item.quantity), 
    0
  );
  
  // Calcular descuento
  const discount = (subtotal * discountPercent) / 100;
  
  // Calcular total
  const total = subtotal + shipping - discount;
  
  // Mutación para añadir al carrito por ID
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number, quantity: number }) => {
      const product = await cartService.addToCart(productId, quantity);
      return product;
    },
    onSuccess: (product) => {
      if (product) {
        addItem(product);
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    }
  });
  
  // Mutación para añadir al carrito por slug
  const addToCartBySlugMutation = useMutation({
    mutationFn: async ({ slug, quantity }: { slug: string, quantity: number }) => {
      const product = await cartService.addToCartBySlug(slug, quantity);
      return product;
    },
    onSuccess: (product) => {
      if (product) {
        addItem(product);
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      }
    }
  });
  
  // Mutación para actualizar cantidad
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number, quantity: number }) => {
      await cartService.updateQuantity(productId, quantity);
      return { productId, quantity };
    },
    onSuccess: ({ productId, quantity }) => {
      updateItemQuantity(productId, quantity);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  
  // Mutación para eliminar del carrito
  const removeFromCartMutation = useMutation({
    mutationFn: (productId: number) => cartService.removeFromCart(productId),
    onSuccess: (_, productId) => {
      removeItem(productId);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  
  // Mutación para checkout
  const checkoutMutation = useMutation({
    mutationFn: () => cartService.checkout(items),
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  
  return {
    // Estado
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    subtotalEmbajador,
    shipping,
    discount,
    total,
    isCheckingOut: checkoutMutation.isPending,
    checkoutSuccess: checkoutMutation.isSuccess,
    checkoutError: checkoutMutation.isError 
      ? checkoutMutation.error?.toString() || true
      : false,
    
    // Acciones
    addToCart: (productId: number, quantity: number = 1) => 
      addToCartMutation.mutate({ productId, quantity }),
    addToCartBySlug: (slug: string, quantity: number = 1) => 
      addToCartBySlugMutation.mutate({ slug, quantity }),
    updateCartQuantity: (productId: number, quantity: number) => 
      updateQuantityMutation.mutate({ productId, quantity }),
    removeFromCart: (productId: number) => 
      removeFromCartMutation.mutate(productId),
    checkout: () => checkoutMutation.mutate(),
    clearCart,
    
    // UI
    isCartOpen: isOpen,
    toggleCart
  };
}
