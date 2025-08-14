import { Bars3Icon } from "@heroicons/react/24/solid";
import React from "react";
import { GoPerson } from "react-icons/go";
import { MiniCart } from "../features/ecommerce/cart";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from '../features/auth/stores/useAuthStore';

interface EcommerceNavbarProps {
  setSidebarOpen?: (open: boolean) => void;
  sidebarOpen?: boolean;
}

export default function EcommerceNavbar({ setSidebarOpen, sidebarOpen }: EcommerceNavbarProps) {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  
  const navigationLinks = [
    { name: "Inicio", href: "/dashboard" },
    { name: "Tienda", href: "/catalog" },
    { name: "Servicios", href: "/servicios" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const dropdown = document.getElementById('account-dropdown');
      const button = document.getElementById('account-button');
      
      if (dropdown && button && !dropdown.contains(target) && !button.contains(target)) {
        setAccountMenuOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when navigating
  const handleNavigation = (path: string) => {
    navigate(path);
    setAccountMenuOpen(false);
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="sticky top-0 z-40">
      <nav className="bg-white xl:px-26 px-6 py-3 shadow-sm"> 
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                className="p-2 -ml-2 rounded-md text-gray-700 "
                onClick={() => setSidebarOpen?.(!sidebarOpen)}
                aria-expanded={sidebarOpen}
              >
                <span className="sr-only">
                  {sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
                </span>
                <Bars3Icon 
                  className={`h-6 w-6 ${sidebarOpen ? '' : ''}`} 
                  aria-hidden="true" 
                />
              </button>
            </div>
            
            {/* Logo - Mobile */}
            <div className="lg:hidden flex-shrink-0 mr-auto pl-4">
              <a href="/" className="flex items-center">
                <img
                  src="/img/health-logo-light-mode.png"
                  className="h-8 w-auto"
                />
              </a>
            </div>
            
            {/* Logo - Desktop */}
            <div className="hidden  lg:flex flex-shrink-0">
              <a href="/" className="flex items-center">
                <img
                  src="/img/health-logo-light-mode.png"
                  className="h-8 w-auto"
                />
              </a>
            </div>

            {/* Navegación central - Solo desktop */}
            <div className="hidden lg:flex items-center px-6 py-3 space-x-10">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) => 
                    `transition-colors text-sm duration-200 px-2 py-1 ${
                      isActive 
                        ? 'text-[var(--color-primary)] font-semibold border-b-2 border-[var(--color-primary)] ' 
                        : 'text-gray-600 hover:text-[var(--color-primary)] '
                    }`
                  }
                  end
                  onClick={() => handleNavigation(link.href)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Sección derecha desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Mini Carrito */}
              <MiniCart className="cursor-pointer hover:text-[var(--color-primary)] hover:scale-103 transition-all duration-200" />

              <div className="relative">
                <div className="flex items-center space-x-2 ml-4">
                  {/* Mi cuenta con dropdown */}
                  <div className="relative" id="account-dropdown">
                    <div className="flex items-center">
                      {isAuthenticated ? (
                        <NavLink 
                          to="/profile" 
                          className={({ isActive }) => 
                            `transition-colors duration-200 px-2 items-center inline-flex justify-between gap-2 py-1 rounded ${
                              isActive 
                                ? 'text-[var(--color-primary)] font-semibold' 
                                : 'text-gray-600 hover:text-[var(--color-primary)] '
                            }`
                          }
                        >
                          <GoPerson className="h-6 w-6 hover:text-[var(--color-primary)] hover:scale-103 transition-all duration-200" />
                          <span className="text-sm text-gray-700 mt-1">Mi Cuenta</span>
                        </NavLink>
                      ) : (
                        <div className="px-2 py-1">
                          <GoPerson className="h-6 w-6 text-gray-600" />
                        </div>
                      )}
                      <button
                        id="account-button"
                        className="flex items-center cursor-pointer outline-none relative z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAccountMenuOpen(!accountMenuOpen);
                        }}
                        aria-expanded={accountMenuOpen}
                        aria-haspopup="true"
                      >
                        <svg 
                          className={`w-4 h-4 ml-1 mt-1 transition-transform duration-200 ${accountMenuOpen ? 'transform rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Dropdown menu */}
                    <div 
                      className={`absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl z-50 border border-gray-100 transition-all duration-200 transform ${accountMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="account-button"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isAuthenticated ? (
                        // Logged-in user menu
                        <div className="py-0">
                          <a 
                            href="/profile" 
                            className="block px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation('/profile?section=orders');
                            }}
                          >
                            Mis Pedidos
                          </a>
                          <a 
                            href="/orders" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation('/profile?section=profile');
                            }}
                          >
                            Datos Personales
                          </a>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              logout();
                              handleNavigation('/login');
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Cerrar Sesión
                          </button>
                        </div>
                      ) : (
                        // Guest user menu
                        <div>
                          <a 
                            href="/login" 
                            className="block px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation('/login');
                            }}
                          >
                            Iniciar Sesión
                          </a>
                          <a 
                            href="/register" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation('/register');
                            }}
                          >
                            Crear Cuenta
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile right icons */}
            <div className="lg:hidden flex items-center space-x-3">
              <MiniCart className="w-10 h-10 cursor-pointer hover:text-[var(--color-primary)] hover:scale-103 transition-all duration-200 flex items-center justify-center relative" />
              
              <button 
                className="w-10 h-10 cursor-pointer flex items-center justify-center"
                onClick={() => navigate('/profile')}
              >
                <GoPerson className="h-6 w-6 text-gray-700 hover:text-[var(--color-primary)] hover:scale-103 transition-all duration-200" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}