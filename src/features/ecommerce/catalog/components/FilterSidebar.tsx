import DualRangeSlider from './DualRangeSlider';
import { useFiltersStore } from '../stores/useFiltersStore';
import { ProductCardDashboardSpecial } from '../../../../components/ProductCardDashboardSpecial';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../shared/services/productsService';

const FeaturedProduct = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['featured-product'],
    queryFn: () => fetchProducts({ limit: 1 }), // el primer producto será el DESTACADO
  });

  if (isLoading) return <div className="h-64 flex items-center justify-center">Cargando producto destacado...</div>;
  if (error || !data?.data?.length) return null;

  return (
    <div className="h-64">
      <ProductCardDashboardSpecial 
        product={data.data[0]} 
        onAddToCart={() => {}}
      />
    </div>
  );
};

export const FilterSidebar =() => {

  const { 
    minPrice,
    maxPrice,
    setPriceRange,
    resetFilters
  } = useFiltersStore();

  return (
    <div className="w-full h-full">
      <div className="bg-white px-4 p-2 shadow-sm rounded-xl sticky">
        {/* Header with Clear Filters */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
          <button
            onClick={resetFilters}
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Limpiar todo
          </button>
        </div>

        <h4 className="font-semibold mb-3 text-gray-800">Precio</h4>
        <DualRangeSlider 
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => setPriceRange(min, max)}
        />

        {/* Featured Product */}
        <h4 className="font-semibold mb-3 text-gray-800">Destacado</h4>
        <div className=" mb-20">
          <FeaturedProduct />
        </div>
      </div>
    </div>
  );
};
