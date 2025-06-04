import {
  ArrowRightOnRectangleIcon,
  FaceSmileIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";

interface Props {
  onLogout: () => void;
  setSidebarOpen?: (open: boolean) => void;
}

export default function AppNavbar({ onLogout, setSidebarOpen }: Props) {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-[var(--color-background)] px-4 py-3 shadow sm:justify-start">
      {/* Botón hamburguesa SOLO en mobile */}
      {setSidebarOpen && (
        <button
          className="sm:hidden mr-2 text-primary"
          onClick={() => setSidebarOpen(true)}
          aria-label="Abrir menú"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      )}

      {/* Logo centrado visualmente en mobile */}
      <a
        href="/"
        className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 flex items-center gap-2 my-1"
      >
        <img
          src="/img/health-logo-light-mode.png"
          alt="Infinity Health"
          className="h-8 w-auto max-w-[150px]"
        />
      </a>

      {/* Perfil y logout SOLO en desktop */}
      <div className="ml-auto hidden sm:flex items-center gap-6">
        <button className="flex items-center gap-1 hover:text-[var(--color-primary-accent)] transition">
          <FaceSmileIcon className="h-5 w-5" />
          <span className="text-[var(--color-text)]">Perfil</span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-1 hover:text-[var(--color-primary-accent)] transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span className="text-[var(--color-text)]">Logout</span>
        </button>
      </div>
    </nav>
  );
}
