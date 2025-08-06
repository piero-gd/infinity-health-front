import type { CartProduct } from '../../shared/types';

/**
 * Representa un item en el carrito con la estructura adaptada para la UI
 */
export interface CartItem {
  id: string; 
  name: string;
  category: string;
  images: string[];
  price: number;
  price_amb: number;
  cantidad: number;
}

/**
 * Define un paso en el proceso de checkout
 */
export interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

// Re-exportamos CartProduct para conveniencia
export type { CartProduct };
