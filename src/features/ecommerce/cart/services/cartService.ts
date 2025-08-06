import type { CartProduct } from '../types';
import { fetchProductById, fetchProductBySlug } from '../../shared/services/productsService';

/**
 * Servicio para operaciones del carrito
 * Esta implementación simula llamadas a una API, pero utiliza localStorage
 * para persistir los datos.
 * 
 * En un entorno real, estas funciones harían fetch a endpoints de API.
 */
export const cartService = {
  /**
   * Obtiene los items actuales del carrito
   */
  async getCart(): Promise<CartProduct[]> {
    // Simulamos latencia de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Recuperar de localStorage para simular una API
    const cartData = localStorage.getItem('infinity-health-cart');
    if (!cartData) return [];
    
    try {
      const parsed = JSON.parse(cartData);
      return parsed.state?.items || [];
    } catch {
      return [];
    }
  },
  
  /**
   * Añade un producto al carrito
   */
  async addToCart(productId: number, quantity: number = 1): Promise<CartProduct | null> {
    // Obtener producto de la API
    const product = await fetchProductById(productId);
    if (!product) return null;
    
    // Convertir a formato CartProduct
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      price_amb: product.price_amb,
      images: product.images,
      category_info: product.category_info,
      quantity: quantity,
      specifications: product.specifications
    };
    
    return cartProduct;
  },
  
  /**
   * Añade un producto al carrito usando el slug
   */
  async addToCartBySlug(slug: string, quantity: number = 1): Promise<CartProduct | null> {
    // Obtener producto por slug
    const product = await fetchProductBySlug(slug);
    if (!product) return null;
    
    // Convertir a formato CartProduct
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      price_amb: product.price_amb,
      images: product.images,
      category_info: product.category_info,
      quantity: quantity,
      specifications: product.specifications
    };
    
    return cartProduct;
  },
  
  /**
   * Actualiza la cantidad de un producto en el carrito
   */
  async updateQuantity(_productId: number, _quantity: number): Promise<boolean> {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 200));
    // En una API real, aquí haríamos un PUT/PATCH
    return true; // Simula éxito
  },
  
  /**
   * Elimina un producto del carrito
   */
  async removeFromCart(_productId: number): Promise<boolean> {
    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 200));
    // En una API real, aquí haríamos un DELETE
    return true; // Simula éxito
  },
  
  /**
   * Aplica un código de embajador/promoción
   */
  async applyPromoCode(code: string): Promise<{
    valid: boolean;
    discount?: number;
    message: string;
  }> {
    // Simular latencia
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular validación de código
    const isValid = code.toLowerCase() === "infinity2023";
    
    return {
      valid: isValid,
      discount: isValid ? 10 : 0, // 10% de descuento
      message: isValid 
        ? "¡Código aplicado correctamente!" 
        : "El código promocional no es válido"
    };
  },
  
  /**
   * Procesa el checkout del carrito
   */
  async checkout(_cartItems: CartProduct[]): Promise<{
    success: boolean;
    orderId?: string;
    error?: string;
  }> {
    // Simular proceso de checkout
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // En un 90% de los casos, simular éxito
    if (Math.random() > 0.1) {
      return {
        success: true,
        orderId: `INF-${Date.now()}`
      };
    } else {
      // Simular error ocasional
      return {
        success: false,
        error: "Error procesando el pago. Por favor intente nuevamente."
      };
    }
  }
};
