import { ChevronDown, ChevronUp } from 'lucide-react';
import { IoCloseSharp } from "react-icons/io5";
import DualRangeSlider from './p2';


interface CategoriesSlideMenuProps {
  onClose: () => void;
}

export default function CategoriesSlideMenu({ onClose }: CategoriesSlideMenuProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50 ">
      <div className="bg-white w-80 h-full overflow-y-auto shadow-2xl rounded-r-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-4  bg-white sticky top-0 z-10">
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
              <button className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 bg-white text-gray-700 rounded-full   border border-gray-300 text-sm hover:bg-gray-50">
                Recomendados
              </button>
              <button className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 bg-white text-gray-700 rounded-full border border-gray-300 text-sm hover:bg-gray-50">
                Lo más reciente
              </button>
              <button className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 bg-white text-gray-700 rounded-full border border-gray-300 text-sm hover:bg-gray-50">
                Precio: de menor a mayor
              </button>
              <button className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 bg-white text-gray-700 rounded-full border border-gray-300 text-sm hover:bg-gray-50">
                Precio: de mayor a menor
              </button>
            </div>
          </div>

          {/* Precio */}
          <div>
            <h4 className="text-md font-medium text-black mb-4">Precio</h4>
            <div className="relative">
           <DualRangeSlider/>
           </div>
          </div>

          {/* Categorías */}
          <div>
            <div className="border-b border-gray-100 border-t">
            <h4 className="text-md font-medium text-black mb-3 mt-3">Categorías</h4>
            </div>
            
            {/* Productos */}
            <div className="border-b border-gray-100 pb-3 mb-3 mt-3">
              <button className="flex items-center justify-between w-full text-left">
                <span className="text-gray-700 font-medium">Productos</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Merch Health */}
            <div className="pb-3 mb-3">
              <button className="flex items-center justify-between w-full text-left mb-3">
                <span className="text-gray-700 font-medium">Merch Health</span>
                <ChevronUp className="w-5 h-5 text-gray-400" />
              </button>
              
              <div className="space-y-3 ml-4">
                <label className="flex items-center">
                  <input type="checkbox" className="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-3 text-gray-600">Ropa Deportiva</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-3 text-gray-600">Accesorios</span>
                </label>
              </div>
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
        <div className="p-6  bg-white sticky bottom-0 z-10">
          <button className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-4 rounded-full font-medium text-lg hover:bg-blue-600 transition-colors">
            Aplicar Filtros
          </button>
        </div>
      </div>
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}