import { IoCloseSharp } from "react-icons/io5";
import DualRangeSlider from './DualRangeSlider';
import { FaAngleDown } from "react-icons/fa6";
import { useState } from 'react';
import { useFiltersStore } from '../stores/useFiltersStore';

interface CategoriesSlideMenuProps {
  onClose: () => void;
}

const Accordion = ({ 
  title, 
  children, 
  isOpen = false, 
  onToggle = () => {} 
}: { 
  title: string; 
  children: React.ReactNode; 
  isOpen?: boolean; 
  onToggle?: () => void 
}) => (
  <div className="mb-0">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center text-left text-sm font-medium text-black p-2 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <span className="text-base">{title}</span>
      <span className={`transform transition-transform ${isOpen ? '' : 'rotate-180'}`}><FaAngleDown /></span>
    </button>
    {isOpen && (
      <div className="mt-1 pl-2 space-y-2">
        {children}
      </div>
    )}
  </div>
);

export default function CategoriesSlideMenu({ onClose }: CategoriesSlideMenuProps) {
  const [openSections, setOpenSections] = useState({
    productos: true,
    merchandising: true
  });

  // Estados y acciones desde Zustand
  const { 
    selectedProduct, 
    selectedMerchandising, 
    minPrice,
    maxPrice,
    setProduct,
    setMerchandising,
    setPriceRange,
    selectedSort,
    setSort
  } = useFiltersStore();
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const products = [
    'Energy', 'Detox', 'Relax', 'Glow', 'Power'
  ];
  
  const merchandising = [
    'Ropa Deportiva', 'Accesorios'
  ];

  const sortOptions = [
    'Recomendados', 'Lo más reciente', 'Precio: de menor a mayor', 'Precio: de mayor a menor'
  ];

  const handleApplyFilters = () => {
    // Ya no necesitamos esta función ya que Zustand maneja todo en tiempo real
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 ">
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

          {/* Categorías */}
          <div>
            <div className="border-b border-gray-100 border-t">
              <h4 className="text-md font-medium text-black mb-3 mt-3">Categorías</h4>
            </div>
            
            {/* Productos */}
            <div className="border-b border-gray-100">
              <Accordion 
                title="Productos"
                isOpen={openSections.productos}
                onToggle={() => toggleSection('productos')}
              >
                <div className="space-y-2 pl-2">
                  {products.map((product) => (
                    <label key={product} className="flex items-center text-sm cursor-pointer hover:text-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="product"
                        value={product}
                        checked={selectedProduct === product}
                        onChange={(e) => setProduct(e.target.value)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="truncate">{product}</span>
                    </label>
                  ))}
                </div>
              </Accordion>
            </div>

            {/* Merch Health */}
            <div>
              <Accordion 
                title="Merchandising"
                isOpen={openSections.merchandising}
                onToggle={() => toggleSection('merchandising')}
              >
                <div className="space-y-2 pl-2">
                  {merchandising.map((item) => (
                    <label key={item} className="flex items-center text-sm cursor-pointer hover:text-blue-600 transition-colors">
                      <input
                        type="radio"
                        name="merchandising"
                        value={item}
                        checked={selectedMerchandising === item}
                        onChange={(e) => setMerchandising(e.target.value)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="truncate">{item}</span>
                    </label>
                  ))}
                </div>
              </Accordion>
            </div>

            {/* Packs Health */}
            <div className="border-b border-gray-100 pb-3 mb-3 border-t">
              <button className="flex items-center justify-between w-full text-left">
                <span className="text-gray-700 font-medium mt-3">Packs Health</span>
              </button>
            </div>

            {/* Objetivo */}
            <div className="border-b border-gray-100 pb-3 mb-3">
              <button className="flex items-center justify-between w-full text-left">
                <span className="text-gray-700 font-medium">Objetivo</span>
              </button>
            </div>

            {/* Formato */}
            <div className="border-b border-gray-100 pb-3">
              <button className="flex items-center justify-between w-full text-left">
                <span className="text-gray-700 font-medium">Formato</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white sticky bottom-0 z-10">
          <button
            onClick={handleApplyFilters}
            className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-4 rounded-full font-medium text-lg hover:bg-blue-600 transition-colors"
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