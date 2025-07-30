import type { Product } from './product.model';

/**
 * Parámetros para la función de búsqueda de productos
 */
export interface FetchProductsParams {
  category?: string | null;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  sort?: string;
  page?: number;
  limit?: number;
  product?: string;
  merchandising?: string;
  objective?: string;
  format?: string;
}

/**
 * Respuesta de la API de productos con paginación
 */
export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
