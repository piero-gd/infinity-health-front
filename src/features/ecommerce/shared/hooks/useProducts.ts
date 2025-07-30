import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById, fetchProductBySlug } from '../services/productService';
import { useFiltersStore } from '../../catalog/stores/useFiltersStore';

/**
 * Hook personalizado para obtener productos con React Query
 * Usa el estado de Zustand para los filtros
 */
export const useProducts = (page = 1, limit = 10) => {
  console.log(`useProducts hook called with page=${page}, limit=${limit}`);
  
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

  // Usar React Query para obtener y cachear datos
  return useQuery({
    // El queryKey debe contener todos los parámetros que pueden cambiar
    // Esto garantiza que React Query haga una nueva petición cuando algún parámetro cambie
    queryKey: ['products', {
      category: selectedCategory,
      minPrice,
      maxPrice,
      searchQuery,
      sort: selectedSort || 'recommended',
      // Incluir explícitamente página y límite para asegurar re-fetch con cambio de página
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
      sort: selectedSort || 'recommended',
      page,
      limit,
      product: selectedProduct,
      merchandising: selectedMerchandising,
      objective: selectedObjective,
      format: selectedFormat
    }),
    // Mantener datos anteriores mientras se cargan los nuevos, pero solo como placeholder
    placeholderData: (previousData) => previousData,
    // Reducir el tiempo de staleness para la paginación
    // Esto hace que React Query fetche más frecuentemente cuando cambian los parámetros
    staleTime: 1000 * 30, // 30 segundos
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
