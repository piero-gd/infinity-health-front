import type { Product } from '../types';
import type { 
  FetchProductsParams, 
  ProductsResponse 
} from './productMockService';
import { 
  fetchMockProducts, 
  fetchMockProductById, 
  fetchMockProductBySlug 
} from './productMockService';

import { 
  fetchRealProducts, 
  fetchRealProductById, 
  fetchRealProductBySlug 
} from './productRealService';

// Determinar si usar la API real o datos mock
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';

/**
 * Obtiene productos filtrados desde la API o desde mock data
 * @param params Parámetros para filtrar, ordenar y paginar productos
 * @returns Promise con la respuesta de productos
 */
export const fetchProducts = async (params: FetchProductsParams): Promise<ProductsResponse> => {
  if (USE_REAL_API) {
    return fetchRealProducts(params);
  } else {
    return fetchMockProducts(params);
  }
};

/**
 * Obtiene un producto por su ID, ya sea desde la API o desde los datos mock
 */
export const fetchProductById = async (id: number): Promise<Product | null> => {
  if (USE_REAL_API) {
    return fetchRealProductById(id);
  } else {
    return fetchMockProductById(id);
  }
};

/**
 * Obtiene un producto por su slug, ya sea desde la API o desde los datos mock
 */
export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  if (USE_REAL_API) {
    return fetchRealProductBySlug(slug);
  } else {
    return fetchMockProductBySlug(slug);
  }
};
