import type { FetchProductsParams } from '../types/product.types';

/**
 * Adaptador para convertir los filtros de frontend a formato de API
 */
export function adaptFiltersForApi(filters: FetchProductsParams): URLSearchParams {
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
