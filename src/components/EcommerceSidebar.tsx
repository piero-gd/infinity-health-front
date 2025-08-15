import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CgCalculator, CgGym } from "react-icons/cg";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { GoPerson } from "react-icons/go";
import { FaStore } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi2";
import { useFiltersStore } from "../features/ecommerce/catalog/stores/useFiltersStore";
import { useAuthStore } from "../features/auth/stores/useAuthStore";

interface EcommerceSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const modulesUser = [
  {
    name: "Inicio",
    icon: <HiOutlineHome className="h-6 w-6" />,
    route: "/dashboard",
  },
  {
    name: "Calculadora",
    icon: <CgCalculator className="h-6 w-6" />,
    route: "/calculator",
  },
  {
    name: "Biblioteca de Ejercicios",
    icon: <CgGym className="h-6 w-6" />,
    route: "/exercises",
  },
  {
    name: "Academia",
    icon: <FaChalkboardTeacher className="h-6 w-6" />,
    route: "/academy/course/1",
  },
  {
    name: "Mi Cuenta",
    icon: <GoPerson className="h-6 w-6" />,
    route: "/profile",
  },
];

const modulesGuest = [
  {
    name: "Nosotros",
    icon: <HiOutlineLightningBolt className="h-6 w-6" />,
    route: "/support",
  },
  {
    name: "Atención al cliente",
    icon: <BiSupport className="h-6 w-6" />,
    route: "/support",
  }
];

const productsModule = {
  name: "Productos",
  icon: <FaStore className="h-6 w-6" />,
  route: "/catalog",
  filters: [
    { name: "Energy", value: "energy" },
    { name: "Detox", value: "detox" },
    { name: "Relax", value: "relax" },
    { name: "Glow", value: "glow" },
    { name: "Power", value: "power" },
  ]
};

const logoutModule = {
  name: "Salir",
  icon: <LuLogOut className="h-6 w-6" />
};

const EcommerceSidebar: React.FC<EcommerceSidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuthStore();
  const [showFilters, setShowFilters] = React.useState(false);
  const { setCategory, selectedCategory } = useFiltersStore();
  
  const isActive = (path: string) => location.pathname.startsWith(path);
  
  const handleFilterClick = (category: string) => {
    setCategory(category);
    setOpen(false);
    // Navigate to catalog if not already there
    if (!location.pathname.startsWith('/catalog')) {
      navigate('/catalog');
    }
  };
  
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const onClose = () => {
    setOpen(false);
  };
  
  return (
    <div
      className={`
        fixed top-0 left-0 h-full z-50 bg-white border-r border-gray-200 flex flex-col
        transition-transform duration-300 ease-in-out
        w-64 shadow-xl
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:hidden
      `}
    >
      <div className="flex flex-col h-full pt-4 overflow-y-auto">

          <div className="flex items-center border-b border-gray-200 justify-between px-6 pt-2 pb-5 bg-white sticky top-0 z-10">
          <a href="/" className="flex items-center">
                <img
                  src="/img/health-logo-light-mode.png"
                  className="h-5 w-auto"
                />
              </a>
                  <button 
                    onClick={onClose}
                    className="flex items-center text-black text-sm font-medium"
                    aria-label="Cerrar menú de filtros"
                  >
                    <IoCloseSharp className="w-5 h-5 mr-1 rounded-full border-2 border-[var(--color-primary)] text-black" />
                    Cerrar
                  </button>
       </div>

        {/* Lista de módulos */}
        <nav className="flex-1">
          {/* Módulo de productos */}
          <div className="relative group mb-2 ">
            <div
              onClick={() => setShowFilters(!showFilters)}
              className={`
                w-full flex items-center justify-between gap-3 px-3 py-2.5 
                text-sm font-medium cursor-pointer
                transition-all duration-200
                ${isActive(productsModule.route) 
                  ? "bg-blue-50 border-r-4 rounded-r-lg border-[var(--color-primary)] text-[var(--color-primary)]" 
                  : "text-gray-700 hover:bg-gray-50 hover:border-r-4 hover:border-[var(--color-primary)]"
                }
              `}
            >
              <div className="flex items-center gap-3 ">
                <span
                  className={`
                    flex-shrink-0 transition-transform duration-200
                    group-hover:scale-110 px-2
                    ${isActive(productsModule.route) ? "text-[var(--color-primary)]" : "text-gray-500"}
                  `}
                >
                  {productsModule.icon}
                </span>
                <span className="whitespace-nowrap">
                  {productsModule.name}
                </span>
              </div>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Filtros desplegables */}
            {showFilters && (
              <div className="pl-14 space-y-0.5">
                {productsModule.filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => handleFilterClick(filter.value)}
                    className={`w-full text-left px-2 py-2 text-sm rounded transition-colors duration-150 ${
                      selectedCategory === filter.value 
                        ? 'text-[var(--color-primary)] font-medium' 
                        : 'text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50'
                    }`}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Módulos de usuario (solo para usuarios autenticados) */}
          {isAuthenticated && modulesUser.map((mod) => (
            <div key={mod.name} className="relative group mb-1">
              <a
                href={mod.route}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 
                  text-sm font-medium cursor-pointer
                  transition-all duration-200
                  ${isActive(mod.route) 
                    ? "bg-blue-50 border-r-4 rounded-r-lg border-[var(--color-primary)] text-[var(--color-primary)]" 
                    : "text-gray-700 hover:bg-gray-50 hover:border-r-4 hover:border-[var(--color-primary)]"
                  }
                `}
              >
                <span
                  className={`
                    flex-shrink-0 transition-transform duration-200
                    group-hover:scale-110 px-2
                    ${isActive(mod.route) ? "text-[var(--color-primary)]" : "text-gray-500"}
                  `}
                >
                  {mod.icon}
                </span>
                <span className="whitespace-nowrap">
                  {mod.name}
                </span>
              </a>

              
            </div>
          ))}
        </nav>
 
        {/* Módulo de Invitado */}
        {modulesGuest.map((mod) => (
          <div key={mod.name} className="relative group mb-1">
            <a
              href={mod.route}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 
                text-sm font-medium cursor-pointer
                transition-all duration-200
                ${isActive(mod.route) 
                  ? "bg-blue-50 border-r-4 rounded-r-lg border-[var(--color-primary)] text-[var(--color-primary)]" 
                  : "text-gray-700 hover:bg-gray-50 hover:border-r-4 hover:border-[var(--color-primary)]"
                }
              `}
            >
              <span
                className={`
                  flex-shrink-0 transition-transform duration-200
                  group-hover:scale-110 px-2
                  ${isActive(mod.route) ? "text-[var(--color-primary)]" : "text-gray-500"}
                `}
              >
                {mod.icon}
              </span>
              <span
                className={`
                  transition-all duration-300
                  ${open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                  }
                  whitespace-nowrap
                `}
              >
                {mod.name}
              </span>
            </a>
          </div>
        ))}

        {/* Módulo de cierre de sesión en la parte inferior */}
        <div className="mt-auto pb-4">
          <div className="relative group mb-1">
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 
                text-sm font-medium cursor-pointer
                transition-all duration-200
                text-gray-700 hover:bg-gray-50 hover:border-r-4 hover:border-[var(--color-primary)]
              `}
            >
              <span
                className={`
                  flex-shrink-0 transition-transform duration-200
                  group-hover:scale-110 px-2
                  text-gray-500
                `}
              >
                {logoutModule.icon}
              </span>
              <span
                className={`
                  transition-all duration-300
                  ${open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                  }
                  whitespace-nowrap
                `}
              >
                {logoutModule.name}
              </span>
            </button>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceSidebar;