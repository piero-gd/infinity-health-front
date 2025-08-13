import React from 'react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  // Datos del menú basados en tu diseño
  const menuData = {
    productos: [
      { name: 'Energy ⚡', href: '/catalog/energy', description: 'Suplementos energéticos' },
      { name: 'Detox', href: '/catalog/detox', description: 'Productos detox' },
      { name: 'Relax', href: '/catalog/relax', description: 'Relajación y bienestar' },
      { name: 'Glow', href: '/catalog/glow', description: 'Cuidado de la piel' },
      { name: 'Power', href: '/catalog/power', description: 'Fuerza y resistencia' },
    ],
    merchHealth: [
      { name: 'Ropa Deportiva', href: '/catalog/ropa-deportiva', description: 'Indumentaria fitness' },
      { name: 'Accesorios', href: '/catalog/accesorios', description: 'Complementos de entrenamiento' },
    ],
    packsHealth: [
      { name: 'Kit/Pack #1', href: '/catalog/pack-1', description: 'Pack básico de inicio' },
      { name: 'Kit/Pack #2', href: '/catalog/pack-2', description: 'Pack avanzado completo' },
    ]
  };

  const handleItemClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay para cerrar al hacer click fuera */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-10 z-40"
        onClick={onClose}
      />
      
      {/* Megamenu */}
      <div className="absolute left-0 top-full w-full bg-white shadow-2xl border-t border-gray-100 z-50 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Columna 1: Productos */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                Productos
              </h3>
              <div className="space-y-2">
                {menuData.productos.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleItemClick}
                    className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <svg 
                        className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Columna 2: Merch Health */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                Merch Health
              </h3>
              <div className="space-y-2">
                {menuData.merchHealth.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleItemClick}
                    className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <svg 
                        className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Columna 3: Packs Health */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2">
                Packs Health
              </h3>
              <div className="space-y-2">
                {menuData.packsHealth.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleItemClick}
                    className="group block p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <svg 
                        className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sección inferior opcional - CTA o destacados */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <h4 className="text-sm font-semibold text-gray-900">¿No encuentras lo que buscas?</h4>
                <p className="text-xs text-gray-600">Explora todo nuestro catálogo completo</p>
              </div>
              <Link
                to="/catalog"
                onClick={handleItemClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-colors duration-200"
              >
                Ver todo el catálogo
                <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default MegaMenu;