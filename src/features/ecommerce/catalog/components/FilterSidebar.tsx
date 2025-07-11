import DualRangeSlider from './DualRangeSlider';
import { useFiltersStore } from '../stores/useFiltersStore';

export const FilterSidebar =() => {
  // Solo utilizamos las propiedades necesarias del store
  const { 
    minPrice,
    maxPrice,
    setPriceRange,
    resetFilters
  } = useFiltersStore();

  return (
    <div className="w-full">
      <div className="bg-white p-4 sticky">
        {/* Header with Clear Filters */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
          <button
            onClick={resetFilters}
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Limpiar todo
          </button>
        </div>

        <h3 className="font-semibold mb-3 text-gray-800">Precio</h3>
        <DualRangeSlider 
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => setPriceRange(min, max)}
        />

        {/* Featured Product */}
        <h3 className="font-semibold mb-3 mt-6 text-gray-800">Destacado</h3>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
          {/* AÑADIR UNA IMAGEN DE UN PRODUCTO */}
        </div>
      </div>
    </div>
  );
};
