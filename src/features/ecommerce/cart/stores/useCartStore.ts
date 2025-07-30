import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CartProduct } from '../../shared/types/product.model';

interface CartState {
  // Estado
  items: CartProduct[];
  isOpen: boolean;
  
  // Acciones
  addItem: (product: CartProduct) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        isOpen: false,
        
        addItem: (product) => {
          const { items } = get();
          const existingItem = items.find(item => item.id === product.id);
          
          if (existingItem) {
            // Si el producto ya está en el carrito, actualizar cantidad
            set({
              items: items.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + product.quantity }
                  : item
              )
            });
          } else {
            // Si es un producto nuevo, agregarlo al carrito
            set({ items: [...items, product] });
          }
        },
        
        removeItem: (productId) => {
          set({
            items: get().items.filter(item => item.id !== productId)
          });
        },
        
        updateQuantity: (productId, quantity) => {
          // No permitir cantidades menores a 1
          if (quantity < 1) return;
          
          set({
            items: get().items.map(item => 
              item.id === productId ? { ...item, quantity } : item
            )
          });
        },
        
        clearCart: () => set({ items: [] }),
        
        toggleCart: () => set(state => ({ isOpen: !state.isOpen }))
      }),
      {
        name: 'infinity-health-cart',
        // Solo persistir los items, no el estado de UI
        partialize: (state) => ({ items: state.items }),
      }
    )
  )
);
