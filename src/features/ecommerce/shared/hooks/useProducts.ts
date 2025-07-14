import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById, fetchProductBySlug } from '../services/productService';
import { useFiltersStore } from '../../catalog/stores/useFiltersStore';

/**
 * Hook personalizado para obtener productos con React Query
 * Usa el estado de Zustand para los filtros
 */
export const useProducts = (page = 1, limit = 10) => {
  const {
    selectedCategory,
    selectedSort,
    minPrice,
    maxPrice,
    searchQuery,
    selectedProduct,
    selectedMerchandising,
    selectedObjective,
    selectedFormat
  } = useFiltersStore();

  // Mapeo entre nombres de ordenación en la UI y valores para la API
  const sortMapping: Record<string, string> = {
    'Recomendados': 'recommended',
    'Lo más reciente': 'newest',
    'Precio: de menor a mayor': 'price-low',
    'Precio: de mayor a menor': 'price-high',
  };

  // Usar React Query para obtener y cachear datos
  return useQuery({
    queryKey: ['products', {
      category: selectedCategory,
      minPrice,
      maxPrice,
      searchQuery,
      sort: sortMapping[selectedSort] || 'recommended',
      page,
      limit,
      product: selectedProduct,
      merchandising: selectedMerchandising,
      objective: selectedObjective,
      format: selectedFormat
    }],
    queryFn: () => fetchProducts({
      category: selectedCategory,
      minPrice,
      maxPrice,
      searchQuery,
      sort: sortMapping[selectedSort] || 'recommended',
      page,
      limit,
      product: selectedProduct,
      merchandising: selectedMerchandising,
      objective: selectedObjective,
      format: selectedFormat
    }),
    // Mantener datos anteriores mientras se cargan los nuevos
    placeholderData: (previousData) => previousData,
    // Considerar datos como frescos durante 5 minutos
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook para obtener un producto individual por ID
 */
export const useProduct = (id: number | null) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    // No ejecutar si no hay ID
    enabled: id !== null,
  });
};

/**
 * Hook para obtener un producto individual por slug
 */
export const useProductBySlug = (slug: string | null | undefined) => {
  return useQuery({
    queryKey: ['product-by-slug', slug],
    queryFn: () => fetchProductBySlug(slug!),
    // No ejecutar si no hay slug
    enabled: !!slug,
  });
};
