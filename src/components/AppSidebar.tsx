import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { CgCalculator, CgGym } from "react-icons/cg";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

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
    name: "Ejercicios",
    icon: <CgGym className="h-6 w-6" />,
    route: "/exercises",
  },
  {
    name: "Calculadora",
    icon: <CgCalculator className="h-6 w-6" />,
    route: "/calculator",
  },
  {
    name: "Academia",
    icon: <FaChalkboardTeacher className="h-6 w-6" />,
    route: "/academy/course/1",
  },
];

const AppSidebar: React.FC<AppSidebarProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`
    fixed top-0 left-0 h-full z-40 bg-white shadow-lg flex flex-col
    transition-all duration-300 ease-in-out
    ${open ? "w-56" : "w-16"}
    ${open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
  `}
    >
      {/* Botón hamburguesa: cerrar en mobile, colapsar en desktop */}
      <button
        className="flex items-center justify-center h-16 focus:outline-none hover:scale-110 transition-transform"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Replegar sidebar" : "Desplegar sidebar"}
      >
        <Bars3Icon className="h-6 w-6 text-primary" />
      </button>

      {/* Lista de módulos */}
      <nav className="flex-1 mt-4">
        {modules.map((mod) => (
          <div key={mod.name} className="relative group flex">
            <a
              href={mod.route}
              className={`
                flex items-center gap-4 px-4 py-3 my-1 rounded-md
                text-primary font-medium cursor-pointer
                transition-all duration-200
                hover:bg-white/10 group
              `}
            >
              <span
                className={`
                  transition-transform duration-200
                  group-hover:scale-110
                `}
              >
                {mod.icon}
              </span>
              <span
                className={`
                  transition-opacity duration-200
                  ${
                    open
                      ? "opacity-100 ml-0"
                      : "opacity-0 ml-[-16px] pointer-events-none"
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
                  bg-gray-900 text-white text-xs rounded px-3 py-1
                  opacity-0 group-hover:opacity-100 pointer-events-none
                  shadow-lg transition-opacity duration-200
                  z-50
                `}
              >
                {mod.name}
              </span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AppSidebar;
