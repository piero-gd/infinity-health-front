import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { CgCalculator, CgGym } from "react-icons/cg";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaStore } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useAuthStore } from "../features/auth/stores/useAuthStore";

interface AppSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const modules = [
  {
    name: "Dashboard",
    icon: <RxDashboard className="h-6 w-6" />,
    route: "/dashboard",
  },
  {
    name: "Ecommerce",
    icon: <FaStore className="h-6 w-6" />,
    route: "/catalog",
  },
  {
    name: "Calculadora",
    icon: <CgCalculator className="h-6 w-6" />,
    route: "/calculator",
  },
  {
    name: "Ejercicios",
    icon: <CgGym className="h-6 w-6" />,
    route: "/exercises",
  },
  {
    name: "Academia",
    icon: <FaChalkboardTeacher className="h-6 w-6" />,
    route: "/academy/course/1",
  },
  {
    name: "Soporte",
    icon: <BiSupport className="h-6 w-6" />,
    route: "/support",
  }
];

const logoutModule = {
  name: "Salir",
  icon: <LuLogOut className="h-6 w-6" />
};

const AppSidebar: React.FC<AppSidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  
  const isActive = (path: string) => location.pathname.startsWith(path);
  
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  return (
    <div
      className={`
        fixed top-0 left-0 h-full z-40 bg-white border-r border-gray-200 flex flex-col
        transition-all duration-300 ease-in-out
        ${open ? "w-56" : "w-16"}
        ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
      `}
    >
      {/* Botón hamburguesa: cerrar en mobile, colapsar en desktop */}
      <div className="flex items-center justify-start h-17 px-4">
        <button
          className="flex items-center justify-center focus:outline-none transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Replegar sidebar" : "Desplegar sidebar"}
        >
          <Bars3Icon className="ml-0.5 h-7 w-7 text-[var(--color-primary)]" />
        </button>
      </div>

      <div className="flex flex-col h-full">
        {/* Lista de módulos */}
        <nav className="flex-1 py-4">
          {modules.map((mod) => (
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

              {/* Tooltip solo si sidebar está colapsado */}
              {!open && (
                <span
                  className={`
                    absolute left-full top-1/2 -translate-y-1/2 ml-2
                    bg-gray-900 text-white text-sm rounded-md px-4 py-2
                    opacity-0 group-hover:opacity-100 pointer-events-none
                    shadow-lg transition-opacity duration-200
                    z-50 whitespace-nowrap
                  `}
                >
                  {mod.name}
                </span>
              )}
            </div>
          ))}
        </nav>

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

            {/* Tooltip solo si sidebar está colapsado */}
            {!open && (
              <span
                className={`
                  absolute left-full top-1/2 -translate-y-1/2 ml-2
                  bg-gray-900 text-white text-sm rounded-md px-4 py-2
                  opacity-0 group-hover:opacity-100 pointer-events-none
                  shadow-lg transition-opacity duration-200
                  z-50 whitespace-nowrap
                `}
              >
                {logoutModule.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;