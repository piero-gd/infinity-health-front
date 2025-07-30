import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useFiltersStore } from '../stores/useFiltersStore';

import { TbBolt } from "react-icons/tb";
import { MdOutlineWaterDrop } from "react-icons/md";
import { BiLeaf } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { FaFire } from "react-icons/fa";
import { PiBaseballCapLight } from "react-icons/pi";
import { PiSquaresFour } from "react-icons/pi";
import { VscSettings } from "react-icons/vsc";

import CategoriesSlideMenu from './CategoriesSlideMenu';

const categories = [
  { id: 'all', name: 'Todos', icon: <PiSquaresFour/>, color: 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] hover:bg-white hover:text-[var(--color-primary)]' },
  { id: 'energy', name: 'Energy', icon: <TbBolt/>, color: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 hover:text-blue-700' },
  { id: 'detox', name: 'Detox', icon: <MdOutlineWaterDrop/>, color: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:text-green-700' },
  { id: 'relax', name: 'Relax', icon: <BiLeaf/>, color: 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:text-purple-700' },
  { id: 'glow', name: 'Glow', icon: <BsStars/>, color: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200 hover:text-yellow-700' },
  { id: 'power', name: 'Power', icon: <FaFire/>, color: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200 hover:text-orange-700' },
  { id: 'ropa_deportiva', name: 'Ropa deportiva', icon: <PiBaseballCapLight/>, color: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:text-gray-700' },
  { id: 'accesorios', name: 'Accesorios', icon: <PiBaseballCapLight/>, color: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:text-gray-700' }
];

const sortOptions = [
  { id: 'recommended', name: 'Recomendados' },
  { id: 'newest', name: 'Lo más reciente' },
  { id: 'price-low', name: 'Precio: de menor a mayor' },
  { id: 'price-high', name: 'Precio: de mayor a menor' }
];

export default function FilterTop() {
  // Estado local solo para UI
  const [showSort, setShowSort] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Estados y acciones desde Zustand
  const { 
    selectedCategory, 
    selectedSort, 
    searchQuery,
    setCategory, 
    setSort, 
    setSearchQuery 
  } = useFiltersStore();

  const handleFilterCategories = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="w-full p-5">
      {/* Barra de búsqueda y ordenamiento */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* Header para móvil */}
        <div className="w-full flex items-center justify-between md:justify-start gap-3">
          <h3 className="font-medium text-gray-900 whitespace-nowrap">Tienda</h3>
          
          <div className="flex-1 flex items-center gap-2 justify-end md:justify-start">
            {/* Barra de búsqueda - Solo en desktop */}
            <div className="hidden md:block relative flex-1 max-w">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-full 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         placeholder-gray-500 text-sm"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white bg-[var(--color-primary)] rounded-full p-1" />
            </div>

            {/* Botón Filtros - Móvil */}
            <button 
              onClick={handleFilterCategories}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-full 
                       bg-white text-gray-400 hover:bg-gray-50 xl:hidden text-sm font-medium whitespace-nowrap"
            >
              <VscSettings className="h-4 w-4" />
              <span className="md:hidden">Filtros</span>
            </button>
            
            {/* Mobile Filters Menu */}
            {showMobileFilters && (
              <CategoriesSlideMenu onClose={() => setShowMobileFilters(false)} />
            )}

            {/* Botón Ordenar - Móvil */}
            <div className="relative">
              <button 
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-full 
                         bg-white text-gray-400 hover:bg-gray-50 text-sm font-medium whitespace-nowrap"
              >
                {selectedSort ? sortOptions.find(opt => opt.id === selectedSort)?.name || 'Ordenar por' : 'Ordenar por'}
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showSort && (
                <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSort(option.id);
                        setShowSort(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros de categorías */}
      <div className="mt-4 flex xl:flex-wrap p-3 gap-5 overflow-x-auto snap-x pb-1">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="relative pb-1"
          >
            <button
              onClick={() => setCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 mb-2 rounded-full text-sm font-medium
                        transition-all duration-200 border-2 shadow-sm
                        ${category.color}
                        ${selectedCategory === category.id 
                          ? `ring-2 ring-offset-1 ring-${category.color} scale-105` 
                          : 'ring-0 hover:scale-105'}
                        `}
            >
              {category.name}
              <span className="text-base">{category.icon}</span>
            </button>
            {/* Línea inferior para la categoría seleccionada */}
            {selectedCategory === category.id && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-full" />
            )}          
          </div>
        ))}
      </div>
    </div>
  );
}