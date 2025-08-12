import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { GoPerson } from "react-icons/go";
import { MiniCart } from "../features/ecommerce/cart";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
//Ad
//import NavBarAd from "./NavBarAd";

interface Props {
  onLogout: () => void;
  setSidebarOpen?: (open: boolean) => void;
}

export default function AppNavbar({ onLogout }: Props) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigationLinks = [
    { name: "Inicio", href: "/dashboard" },
    { name: "Tienda", href: "/catalog" },
    { name: "Servicios", href: "/servicios" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
   <div className="sticky top-0 z-40">

            {/* Ad 
  
      <NavBarAd />   */}
   

    <nav className="bg-white px-4 py-3 shadow-sm"> 
 
      <div className="max-w-7xl mx-auto">
      
        <div className="flex items-center justify-between">
     
          {/* VERSIÓN DESKTOP */}
          {/* Logo - Solo desktop */}
          <div className="hidden lg:flex flex-shrink-0">
            <a href="/" className="flex items-center">
              <img
                src="/img/health-logo-light-mode.png"
                className="h-8 w-auto"
                alt="Logo"
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
                  `transition-colors duration-200 ${
                    isActive 
                      ? 'text-[var(--color-primary)] text-sm font-semibold border-b-2 border-[var(--color-primary)] pb-1' 
                      : 'text-gray-600 text-sm font-normal pb-1 hover:text-[var(--color-primary)]'
                  }`
                }
                end
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Sección derecha desktop */}
          <div className="hidden lg:flex items-center space-x-3">
       
            {/* Mini Carrito */}
            <MiniCart className="cursor-pointer hover:text-[var(--color-primary)] hover:scale-103 transition-all duration-200" />

            <div className="flex items-center space-x-2 ml-4">
              <button className="flex items-center cursor-pointer hover:text-[var(--color-primary)] hover:scale-103 transition-all duration-200 space-x-2"
              onClick={() => navigate('/profile')}>
              <GoPerson className="h-6 w-6" />
              <span className="text-sm text-gray-700">Mi Cuenta</span>
              </button>
            </div>
          </div>

          {/* VERSIÓN MÓVIL */}
          {/* Iconos izquierda - móvil */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              className="w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </button>
            
            
          </div>

          {/* Logo centrado - móvil */}
          <div className="lg:hidden ml-2 flex-1 flex justify-left">
            <a href="/" className="flex items-center">
              <img
                src="/img/health-logo-light-mode.png"
                className="h-7 w-auto"
              />
            </a>
          </div>

          {/* Iconos derecha - móvil */}
          <div className="lg:hidden flex items-center space-x-3">
            <MiniCart className="w-10 h-10 cursor-pointer hover:text-[var(--color-primary)] hover:scale-103 transition-all duration-200 flex items-center justify-center relative" />
            
            <button className="w-10 h-10 cursor-pointer flex items-center justify-center"
            onClick={() => navigate('/profile')}>
              <GoPerson className="h-6 w-6 text-gray-700 hover:text-[var(--color-primary)] hover:scale-103 transition-all duration-200" />
            </button>
          </div>
        </div>

        {/* Menú móvil overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
             {/* Header del menú móvil */}
             <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  {/* Contenedor exterior con gradiente (el borde) */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] p-0.5">
                    {/* Contenedor interior para la imagen */}
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src="/img/hombre.png"
                        className="w-full h-full object-cover"
                        alt="Usuario"
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">Mi Cuenta</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Enlaces de navegación */}
              <div className="py-4">
                <div className="px-4 mb-4">
                  <div className="space-y-1">
                    {navigationLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block py-3 px-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Iconos de acción */}
                <div className="px-4 mb-4 border-b border-1 border-gray-200">
                  <div className="space-y-3 mt-4 mb-4">
                    <button className="flex items-center space-x-3 w-full py-3 px-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                        <MagnifyingGlassIcon className="h-4 w-4" />
                      </div>
                      <span>Buscar</span>
                    </button>
                    
                    <button className="flex items-center space-x-3 w-full py-3 px-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                        <HeartIcon className="h-4 w-4" />
                      </div>
                      <span>Favoritos</span>
                    </button>
                    
                    <a href="/cart" className="flex items-center space-x-3 w-full py-3 px-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center">
                        <ShoppingBagIcon className="h-4 w-4" />
                      </div>
                      <span>Carrito de compras</span>
                    </a>
                  </div>
                </div>

                {/* Acciones de cuenta */}
                <div className="px-4">
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full py-3 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </nav>
    </div>
  );
}