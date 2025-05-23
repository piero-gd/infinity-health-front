import React from 'react';
import { Bars3Icon, FireIcon } from '@heroicons/react/24/solid';

interface AppSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const modules = [
  {
    name: 'Ejercicios',
    icon: <FireIcon className="h-6 w-6" />,
    route: '/ejercicios',
  },
  // Agrega más módulos aquí
];

const AppSidebar: React.FC<AppSidebarProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full z-40
        bg-[var(--color-primary)] transition-all duration-300
        ${open ? 'w-56' : 'w-16'}
        shadow-lg flex flex-col
      `}
    >
      {/* Botón para desplegar/replegar */}
      <button
        className="flex items-center justify-center h-16 focus:outline-none hover:bg-primary/80 transition-colors"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Replegar sidebar' : 'Desplegar sidebar'}
      >
        <Bars3Icon className="h-6 w-6 text-white" />
      </button>

      {/* Lista de módulos */}
      <nav className="flex-1 mt-4">
        {modules.map((mod) => (
          <a
            key={mod.name}
            href={mod.route}
            className={`
              flex items-center gap-4 px-4 py-3 my-1 rounded-md
              text-white font-medium cursor-pointer
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
                ${open ? 'opacity-100 ml-0' : 'opacity-0 ml-[-16px] pointer-events-none'}
                whitespace-nowrap
              `}
            >
              {mod.name}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default AppSidebar;