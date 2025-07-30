import type { CartProduct } from '../../shared/types/product.model';

/**
 * Tipo de retorno para el hook useAmbassadorValidation
 */
export interface UseAmbassadorValidationReturn {
  isAmbassador: boolean;
  promoCode: string;
  setPromoCode: (code: string) => void;
  handlePromoCodeSubmit: (e: React.FormEvent) => void;
  validationMessage: { text: string; type: 'success' | 'error' | null };
}

/**
 * Tipo de retorno para el hook useCart
 */
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
