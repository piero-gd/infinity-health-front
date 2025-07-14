import mockData from '../../productDetail/data/mock.json';
import type { Product } from '../../productDetail/types';

// Parámetros para la función de búsqueda
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

// Respuesta que imita la estructura de una API real
export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Simula una llamada API para obtener productos filtrados
 * En un entorno real, esto haría una llamada fetch a tu backend
 */
export const fetchProducts = async ({
  category = null,
  minPrice = 0,
  maxPrice = 10000,
  searchQuery = '',
  sort = 'recommended',
  page = 1,
  limit = 10,
  product = '',
  merchandising = '',
  objective = '',
  format = '',
}: FetchProductsParams): Promise<ProductsResponse> => {
  // Simular latencia de red (eliminar en producción)
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Convertir datos del mock a tipo Product
  const products = mockData as Product[];
  
  // Aplicar filtros
  let filteredProducts = [...products];
  
  // Filtro por categoría principal
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      if (category === 'energy') return product.category_info?.subcategory === 'energy';
      if (category === 'detox') return product.category_info?.subcategory === 'detox';
      if (category === 'relax') return product.category_info?.subcategory === 'relax';
      if (category === 'glow') return product.category_info?.subcategory === 'glow';
      if (category === 'power') return product.category_info?.subcategory === 'power';
      if (category === 'ropa_deportiva') return product.category_info?.subcategory === 'ropa_deportiva';
      if (category === 'accesorios') return product.category_info?.subcategory === 'accesorios';
      return false;
    });
  }
  
  // Filtro por rango de precios
  filteredProducts = filteredProducts.filter(product => {
    const price = parseFloat(product.price);
    return price >= minPrice && price <= maxPrice;
  });
  
  // Filtro por búsqueda
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }
  
  // Filtro por tipo específico de producto
  if (product) {
    filteredProducts = filteredProducts.filter(p => 
      p.category_info?.name === product
    );
  }
  
  // Filtro por merchandising
  if (merchandising) {
    filteredProducts = filteredProducts.filter(p => 
      p.category_info?.subcategory_display === merchandising
    );
  }
  
  // Filtro por objetivo (esto dependería de cómo esté estructurado en tu API real)
  if (objective) {
    filteredProducts = filteredProducts.filter(p => 
      p.description.toLowerCase().includes(objective.toLowerCase())
    );
  }
  
  // Filtro por formato
  if (format) {
    filteredProducts = filteredProducts.filter(p => 
      p.specifications?.some(spec => spec.size === format)
    );
  }
  
  // Aplicar ordenación
  switch (sort) {
    case 'recommended':
      filteredProducts.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));
      break;
    case 'newest':
      filteredProducts.sort((a, b) => 
        new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      break;
    case 'price-low':
      filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    default:
      break;
  }
  
  // Calcular paginación
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(filteredProducts.length / limit);
  
  return {
    data: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    totalPages
  };
};

/**
 * Simula una llamada API para obtener un producto por su ID
 */
export const fetchProductById = async (id: number): Promise<Product | null> => {
  // Simular latencia de red
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const products = mockData as Product[];
  return products.find(product => product.id === id) || null;
};

/**
 * Simula una llamada API para obtener un producto por su slug
 */
export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  // Simular latencia de red
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const products = mockData as Product[];
  return products.find(product => product.slug === slug) || null;
};
