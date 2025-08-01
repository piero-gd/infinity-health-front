import { get } from '../../../../services/api';
import type { Product } from '../types/product.model';
import type { FetchProductsParams, ProductsResponse } from '../types/product.types';
import { adaptFiltersForApi } from '../adapters/apiAdapters';

// Re-exportar tipos para mantener la misma API pública
export type { FetchProductsParams, ProductsResponse } from '../types/product.types';
export { fetchProductById, fetchProductBySlug } from './productDetailService';

const API_PRODUCTS_ENDPOINT = 'products';

/**
 * Obtiene productos filtrados desde la API
 * @param params Parámetros para filtrar, ordenar y paginar productos
 * @returns Promise con la respuesta de productos
 */
export const fetchProducts = async (params: FetchProductsParams): Promise<ProductsResponse> => {
  try {
    // Usar el adaptador para convertir los filtros al formato de la API
    const queryParams = adaptFiltersForApi(params);
    
    // Realizar la llamada a la API
    const endpoint = `${API_PRODUCTS_ENDPOINT}?${queryParams.toString()}`;
    console.log(`Fetching products from API: ${endpoint}`);
    
    // La API devuelve un array de productos directamente, no un objeto ProductsResponse
    const products = await get<Product[]>(endpoint);
    console.log('API response received, products length:', products?.length);
    
    // Comprobar si tenemos productos válidos
    if (!products || !Array.isArray(products)) {
      console.warn('API returned invalid products data:', products);
      throw new Error('Invalid API response format');
    }
    
    // Simular datos de paginación desde el backend
    // Cuando trabajamos con API real, debería devolver metadata de paginación
    // Por ahora, vamos a implementar una paginación local para fines de demostración
    
    // Ordenamos los productos en el cliente como respaldo
    let sortedProducts = [...products];
    
    // Aplicar ordenación en el cliente para garantizar el orden correcto
    if (params.sort) {
      console.log(`Applying client-side sorting: ${params.sort}`);
      
      switch (params.sort) {
        case 'recommended':
          sortedProducts.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));
          break;
        case 'newest':
          sortedProducts.sort((a, b) => 
            new Date(b.created).getTime() - new Date(a.created).getTime()
          );
          break;
        case 'price-low':
          sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case 'price-high':
          sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
      }
    }
    
    // Total de productos antes de la paginación
    const totalProducts = sortedProducts.length;
    
    // Aplicar paginación en el cliente
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    // Obtener productos de la página actual
    const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
    
    console.log(`Pagination: page ${page}, showing ${paginatedProducts.length} of ${totalProducts} products (${startIndex}-${endIndex})`);
    
    // Adaptar la respuesta al formato ProductsResponse que espera el frontend
    const adaptedResponse: ProductsResponse = {
      data: paginatedProducts,
      total: totalProducts,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalProducts / limit)
    };
    
    console.log('Adapted response for frontend:', adaptedResponse);
    return adaptedResponse;
  } catch (error) {
    console.error('Error fetching products from API:', error);
    // Propagar el error para que la UI pueda manejarlo
    throw error;
  }
};
