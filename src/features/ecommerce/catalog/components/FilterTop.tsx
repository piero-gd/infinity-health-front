import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 'energy', name: 'Energy', icon: '⚡', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'detox', name: 'Detox', icon: '🌿', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'relax', name: 'Relax', icon: '🧘', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'glow', name: 'Glow', icon: '✨', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'power', name: 'Power', icon: '💪', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'merch', name: 'Merch', icon: '👕', color: 'bg-gray-100 text-gray-700 border-gray-200' }
];

const sortOptions = [
  { id: 'recommended', name: 'Recomendados' },
  { id: 'newest', name: 'Lo más reciente' },
  { id: 'price-low', name: 'Precio: de menor a mayor' },
  { id: 'price-high', name: 'Precio: de mayor a menor' }
];

export default function FilterTop() {
  const [showSort, setShowSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');

  return (
    <div className="w-full bg-white p-5 rounded-lg shadow-sm">
      {/* Barra de búsqueda y ordenamiento */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Título y búsqueda */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
          <h3 className=" font-medium text-gray-900">Tienda</h3>
          <div className="relative flex-1 ml-20">
            <input
              type="text"
              placeholder=" Buscar producto..."
              className="block w-full pr-10 pl-2 py-2 border border-gray-300 rounded-full 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       placeholder-gray-500 text-sm"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white bg-[var(--color-primary)] rounded-full p-1" />
          </div>
        </div>

        {/* Menú de ordenamiento súper simple */}
        <div className="relative">
          <button 
            onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full 
                     bg-white text-gray-400 hover:bg-gray-50 text-sm font-medium"
          >
            {selectedSort || 'Ordenar por:'}
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showSort && (
            <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedSort(option.name);
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

      {/* Filtros de categorías */}
      <div className="mt-4 flex flex-wrap gap-3">
        {categories.map(category => (
          <div key={category.id} className="border-b-2 border-[var(--color-primary)]">
            <button
              onClick={() => console.log('Categoría seleccionada:', category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
                        transition-all duration-200 hover:shadow-md
                        ${category.color} shadow-sm ring-2 ring-offset-1 ring-blue-300`}
            >
              {category.name}
              <span className="text-base">{category.icon}</span>
            </button>
          </div>
        ))}
      </div>

   
    </div>
  );
}