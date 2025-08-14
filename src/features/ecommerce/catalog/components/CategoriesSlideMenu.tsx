import { IoCloseSharp } from "react-icons/io5";
import DualRangeSlider from './DualRangeSlider';
import { useFiltersStore } from '../stores/useFiltersStore';

interface CategoriesSlideMenuProps {
  onClose: () => void;
}

export default function CategoriesSlideMenu({ onClose }: CategoriesSlideMenuProps) {

  // Estados y acciones desde Zustand
  const {
    minPrice,
    maxPrice,
    setPriceRange,
    selectedSort,
    setSort
  } = useFiltersStore();
  

  const sortOptions = [
    'Recomendados', 'Lo más reciente', 'Precio: de menor a mayor', 'Precio: de mayor a menor'
  ];

  const handleApplyFilters = () => {
    // Ya no necesitamos esta función ya que Zustand maneja todo en tiempo real
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent flex z-50 ">
      <div className="bg-white w-80 h-full shadow-2xl rounded-r-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-4 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-900">Filtros</h2>
          <button 
            onClick={onClose}
            className="flex items-center text-black text-sm font-medium"
            aria-label="Cerrar menú de filtros"
          >
            <IoCloseSharp className="w-5 h-5 mr-1 rounded-full border-2 border-[var(--color-primary)] text-black" />
            Cerrar
          </button>
        </div>

        <div className="px-6 pb-2 space-y-6">
          {/* Ordenar por */}
          <div className="w-full">
            <h4 className="text-md font-medium text-black mb-4">Ordenar por</h4>
            <div className="flex gap-2 overflow-x-auto -mx-1 px-1">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSort(option)}
                  className={`flex-shrink-0 whitespace-nowrap px-3 py-1.5 border rounded-full text-sm ${
                    selectedSort === option 
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Precio */}
          <div>
            <h4 className="text-md font-medium text-black mb-4">Precio</h4>
            <div className="relative">
              <DualRangeSlider 
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={(min, max) => setPriceRange(min, max)}
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-white sticky bottom-0 z-10">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-2 rounded-full font-medium text-lg hover:bg-blue-600 transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Click para cerrar */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}