import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import type { CartProduct } from '../../shared/types/product.model';

interface CartState {
  // Estado
  items: CartProduct[];
  isOpen: boolean;
  freeShipping: boolean;
  
  // Valores derivados - calculados automáticamente
  subtotal: number;
  subtotalEmbajador: number;
  itemCount: number;
  shipping: number;
  discount: number;
  total: number;
  isCheckingOut: boolean;
  checkoutSuccess: boolean;
  checkoutError: boolean | string;
  
  // Acciones
  addItem: (product: CartProduct) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  startCheckout: () => void;
  completeCheckout: (success: boolean, error?: string) => void;
  setFreeShipping: (isFree: boolean) => void;
}

// Función para calcular valores derivados
const calculateDerivedValues = (items: CartProduct[], freeShipping: boolean = false) => {
  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const subtotalEmbajador = items.reduce((sum, item) => sum + (parseFloat(item.price_amb || item.price) * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  // Valores fijos por ahora, podrían ser calculados según reglas de negocio
  const shipping = (freeShipping || subtotal === 0) ? 0 : 10; // Envío gratis para recojo en sede o carrito vacío
  const discount = 0; // Por implementar: descuentos por cupones, etc.
  const total = subtotal + shipping - discount;
  
  return {
    subtotal,
    subtotalEmbajador,
    itemCount,
    shipping,
    discount,
    total
  };
};

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado básico
        items: [],
        isOpen: false,
        freeShipping: false,
        
        // Valores derivados iniciales
        ...calculateDerivedValues([]),
        isCheckingOut: false,
        checkoutSuccess: false,
        checkoutError: false,
        
        addItem: (product) => {
          const { items, freeShipping } = get();
          const existingItem = items.find(item => item.id === product.id);
          
          let newItems;
          if (existingItem) {
            // Si el producto ya está en el carrito, actualizar cantidad
            newItems = items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + product.quantity }
                : item
            );
          } else {
            // Si es un producto nuevo, agregarlo al carrito
            newItems = [...items, product];
          }
          
          // Actualizar estado con nuevos items y valores derivados
          set({ 
            items: newItems,
            ...calculateDerivedValues(newItems, freeShipping)
          });
        },
        
        removeItem: (productId) => {
          const { items, freeShipping } = get();
          const newItems = items.filter(item => item.id !== productId);
          set({
            items: newItems,
            ...calculateDerivedValues(newItems, freeShipping)
          });
        },
        
        updateQuantity: (productId, quantity) => {
          // No permitir cantidades menores a 1
          if (quantity < 1) return;
          
          const { items, freeShipping } = get();
          const newItems = items.map(item => 
            item.id === productId ? { ...item, quantity } : item
          );
          
          set({
            items: newItems,
            ...calculateDerivedValues(newItems, freeShipping)
          });
        },
        
        clearCart: () => set({ 
          items: [],
          freeShipping: false,
          ...calculateDerivedValues([], false),
          checkoutSuccess: false,
          checkoutError: false
        }),
        
        toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

        // Nuevas acciones para el checkout
        startCheckout: () => set({
          isCheckingOut: true,
          checkoutSuccess: false,
          checkoutError: false
        }),

        completeCheckout: (success, error) => set({
          isCheckingOut: false,
          checkoutSuccess: success,
          checkoutError: error || false,
          // Si fue exitoso, limpiar el carrito
          ...(success ? { items: [], freeShipping: false, ...calculateDerivedValues([]) } : {})
        }),
        
        setFreeShipping: (isFree) => {
          const { items } = get();
          set({ 
            freeShipping: isFree,
            ...calculateDerivedValues(items, isFree)
          });
        }
      }),
      {
        name: 'infinity-health-cart',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
);
