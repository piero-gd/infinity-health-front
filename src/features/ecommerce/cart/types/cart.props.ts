import type { CartItem } from './cart.model';

/**
 * Props para el componente de lista del carrito
 */
export interface ListCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, cantidad: number) => void;
  onRemoveItem: (id: string) => void;
  className?: string;
}

/**
 * Props para el componente de progreso del carrito
 */
export interface ProgressCartProps {
  currentStep: number;
  className?: string;
}

/**
 * Props para el componente de total del carrito
 */
export interface TotalCartProps {
  subtotalNormalPrice: number;
  subtotalEmbajadorPrice: number;
  shipping: number;
  discount: number;
  className?: string;
}

/**
 * Props para validación de embajador
 */
export interface UseAmbassadorValidationProps {
  onApplyPromoCode: (code: string) => void;
}
