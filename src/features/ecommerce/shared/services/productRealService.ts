import type { Product } from '../types';
import { get } from '../../../../services/api';
import type { FetchProductsParams, ProductsResponse } from './productMockService';

const API_PRODUCTS_ENDPOINT = 'products';

// Adaptador para convertir los filtros de frontend a formato de API
function adaptFiltersForApi(filters: FetchProductsParams): URLSearchParams {
  const queryParams = new URLSearchParams();
  const { 
    category, minPrice = 0, maxPrice = 10000, searchQuery = '', 
    sort = 'recommended', page = 1, limit = 10, product = '', 
    merchandising = '', objective = '', format = '' 
  } = filters;
  
  // Mapeo de categorías de slug a ID numérico
  const CATEGORY_ID_MAP: Record<string, number> = {
    'energy': 8,
    'detox': 5,
    'relax': 7,
    'glow': 6,
    'power': 9,
    'ropa_deportiva': 10,
    'accesorios': 11
  };
  
  // Convertir slug de categoría a ID numérico
  if (category) {
    if (category !== 'all') {
      // Si es una categoría válida en nuestro mapeo
      if (typeof category === 'string' && CATEGORY_ID_MAP[category]) {
        const categoryId = CATEGORY_ID_MAP[category];
        console.log(`Mapped category slug '${category}' to ID: ${categoryId}`);
        queryParams.append('category', categoryId.toString());
      } 
      // Si es directamente un ID numérico
      else if (!isNaN(Number(category))) {
        console.log(`Using category ID directly: ${category}`);
        queryParams.append('category', category.toString());
      } 
      else {
        console.warn(`Unknown category: ${category}, not applying category filter`);
      }
    } else {
      console.log('Category is "all", not applying any category filter');
    }
  }
  
  // Parámetros de filtrado
  if (minPrice > 0) queryParams.append('min_price', minPrice.toString());
  if (maxPrice < 10000) queryParams.append('max_price', maxPrice.toString());
  if (searchQuery) queryParams.append('search', searchQuery);
  
  // Mapeo de parámetros de ordenación
  const sortMapping: Record<string, string> = {
    'recommended': 'rating',
    'newest': 'created',
    'price-low': 'price',
    'price-high': 'price'
  };
  
  // Paginación
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  
  // Ordenación - Mejor manejo y depuración
  console.log(`Applying sorting: ${sort}`);
  
  const sortKey = sort as keyof typeof sortMapping;
  const sortField = sortMapping[sortKey] || 'rating';
  queryParams.append('sort', sortField);
  
  // Manejar la dirección de ordenación explícitamente
  if (sort === 'price-low') {
    console.log('Setting order to ASC for price-low');
    queryParams.append('order', 'asc');
  } else if (sort === 'price-high') {
    console.log('Setting order to DESC for price-high');
    queryParams.append('order', 'desc');
  } else if (sort === 'newest') {
    // Para newest, queremos orden descendente por fecha
    console.log('Setting order to DESC for newest');
    queryParams.append('order', 'desc');
  } else {
    // Para recommended (rating), queremos orden descendente
    console.log('Setting order to DESC for other sort types');
    queryParams.append('order', 'desc');
  }
  
  // Otros filtros
  if (product) queryParams.append('product_type', product);
  if (merchandising) queryParams.append('merchandising', merchandising);
  if (objective) queryParams.append('objective', objective);
  if (format) queryParams.append('format', format);
  
  return queryParams;
}

/**
 * Obtiene productos filtrados desde la API
 * @param params Parámetros para filtrar, ordenar y paginar productos
 * @returns Promise con la respuesta de productos
 */
export const fetchRealProducts = async (params: FetchProductsParams): Promise<ProductsResponse> => {
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

/**
 * Obtiene un producto por su ID desde la API
 */
export const fetchRealProductById = async (id: number): Promise<Product | null> => {
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
export const fetchRealProductBySlug = async (slug: string): Promise<Product | null> => {
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
