import type { CartProduct } from '../../shared/types';

export interface CartItem {
  id: string; 
  name: string;
  category: string;
  images: string[];
  price: number;
  price_amb: number;
  cantidad: number;
}

export interface ListCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, cantidad: number) => void;
  onRemoveItem: (id: string) => void;
  className?: string;

}

export interface ProgressCartProps {
  currentStep: number;
  className?: string;
}

export interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

export interface TotalCartProps {
  subtotalNormalPrice: number;
  subtotalEmbajadorPrice: number;
  shipping: number;
  discount: number;
  className?: string;
}

export interface UseAmbassadorValidationProps {
  onApplyPromoCode: (code: string) => void;
}

export interface UseAmbassadorValidationReturn {
  isAmbassador: boolean;
  promoCode: string;
  setPromoCode: (code: string) => void;
  handlePromoCodeSubmit: (e: React.FormEvent) => void;
  validationMessage: { text: string; type: 'success' | 'error' | null };
}

// Interfaces para useCart hook
export interface CartHookReturn {
  // Estado
  items: CartProduct[];
  itemCount: number;
  subtotal: number;
  subtotalEmbajador: number;
  shipping: number;
  discount: number;
  total: number;
  isCheckingOut: boolean;
  checkoutSuccess: boolean;
  checkoutError: boolean | string;
  
  // Acciones
  addToCart: (productId: number, quantity?: number) => void;
  addToCartBySlug: (slug: string, quantity?: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  checkout: () => void;
  clearCart: () => void;
  
  // UI
  isCartOpen: boolean;
  toggleCart: () => void;
}
