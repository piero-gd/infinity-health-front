export interface CartItem {
  id: string;  // Changed from Product[] to string
  nombre: string;
  categoria: string;
  imagenes: string[];
  precio: number;
  precioAnterior?: number;
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
  onApplyPromoCode: (code: string) => void;
  onProceedToCheckout: () => void;
  className?: string;
}
