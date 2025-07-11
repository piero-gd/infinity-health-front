import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import DualRangeSlider from './DualRangeSlider';
import { useFiltersStore } from '../stores/useFiltersStore';

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
  <div className="mb-2">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <span>{title}</span>
      <span className={`transform transition-transform ${isOpen ? '' : 'rotate-180'}`}><FaAngleDown /></span>
    </button>
    {isOpen && (
      <div className="mt-1 pl-2 space-y-2">
        {children}
      </div>
    )}
  </div>
);

export const FilterSidebar =() => {
  const [openSections, setOpenSections] = useState({
    productos: true,
    merchandising: true
  });

  // Estados y acciones desde Zustand
  const { 
    selectedProduct, 
    selectedMerchandising, 
    selectedObjective, 
    selectedFormat,
    minPrice,
    maxPrice,
    setProduct,
    setMerchandising,
    setObjective,
    setFormat,
    setPriceRange,
    resetFilters
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

  const objectives = [
    'Aumentar energía', 'Subir masa muscular', 'Reducir el estrés', 
    'Mejorar el rendimiento', 'Reforzar defensas'
  ];

  const formats = ['Bebida instantánea', 'Polvo / Suplemento'];

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

        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800">Categorías</h3>
          
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

        {/* Objectives */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800">Objetivo</h3>
          <div className="space-y-2 pl-2">
            {objectives.map((objective) => (
              <label key={objective} className="flex items-center text-sm cursor-pointer hover:text-blue-600 transition-colors">
                <input
                  type="radio"
                  name="objective"
                  value={objective}
                  checked={selectedObjective === objective}
                  onChange={(e) => setObjective(e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="truncate">{objective}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Format */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-gray-800">Formato</h3>
          <div className="space-y-2 pl-2">
            {formats.map((format) => (
              <label key={format} className="flex items-center text-sm cursor-pointer hover:text-blue-600 transition-colors">
                <input
                  type="radio"
                  name="format"
                  value={format}
                  checked={selectedFormat === format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="truncate">{format}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Featured Product */}
        <h3 className="font-semibold mb-3 text-gray-800">Destacado</h3>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
          {/* AÑADIR UNA IMAGEN DE UN PRODUCTO */}
        </div>
      </div>
    </div>
  );
};
