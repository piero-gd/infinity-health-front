export interface CartItem {
  id: string; 
  nombre: string;
  categoria: string;
  imagenes: string[];
  precioNormal: number;
  precioEmbajador: number;
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
