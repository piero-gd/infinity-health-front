import { get } from '../../../../services/api';
import type { Product } from '../types';

const API_PRODUCTS_ENDPOINT = 'products';

/**
 * Obtiene un producto por su ID desde la API
 */
export const fetchProductById = async (id: number): Promise<Product | null> => {
  try {
    // Llamada a la API real para obtener el producto por ID
    const endpoint = `${API_PRODUCTS_ENDPOINT}/${id}`;
    console.log(`Fetching product by ID from API: ${endpoint}`);
    
    // Obtener el producto desde la API
    const product = await get<Product>(endpoint);
    console.log('Product by ID response received');
    
    if (!product) {
      console.warn(`No product found with ID ${id}`);
      return null;
    }
    
    // Asegurarse de que tiene todas las propiedades necesarias
    if (!product.images || !Array.isArray(product.images)) {
      product.images = [];
    }
    
    if (!product.specifications || !Array.isArray(product.specifications)) {
      product.specifications = [];
    }
    
    return product;
  } catch (error) {
    console.error(`Error fetching product ID ${id} from API:`, error);
    // Propagar el error para que la UI pueda manejarlo
    throw error;
  }
};

/**
 * Obtiene un producto por su slug desde la API
 */
export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    // Llamada a la API real para obtener el producto por slug
    const endpoint = `${API_PRODUCTS_ENDPOINT}/${slug}`;
    console.log(`Fetching product by slug from API: ${endpoint}`);
    
    // Obtener el producto desde la API
    const product = await get<Product>(endpoint);
    console.log('Product by slug response received');
    
    if (!product) {
      console.warn(`No product found with slug ${slug}`);
      return null;
    }
    
    // Asegurarse de que tiene todas las propiedades necesarias
    if (!product.images || !Array.isArray(product.images)) {
      product.images = [];
    }
    
    if (!product.specifications || !Array.isArray(product.specifications)) {
      product.specifications = [];
    }
    
    return product;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug} from API:`, error);
    // Propagar el error para que la UI pueda manejarlo adecuadamente
    throw error;
  }
};
