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
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      {/* Backdrop con más transparencia */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar con fondo más transparente */}
      <div className="fixed top-0 left-0 h-full z-50 bg-white/90 backdrop-blur-md border-r border-gray-200/50 flex flex-col w-64 shadow-xl transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-4 bg-white border-b border-gray-200 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="flex items-center text-black text-sm font-medium"
              aria-label="Cerrar menú de filtros"
            >
              <IoCloseSharp className="w-5 h-5 mr-1 rounded-full border-2 border-[var(--color-primary)] text-black" />
              Cerrar
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white overflow-y-auto px-6 py-4 space-y-6">
          {/* Ordenar por */}
          <div className="w-full">
            <h4 className="text-md font-medium text-black mb-4">Ordenar por</h4>
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
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
        <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-10">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors"
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