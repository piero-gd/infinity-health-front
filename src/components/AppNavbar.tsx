import {
  ArrowRightOnRectangleIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";

interface Props {
  onLogout: () => void;
  setSidebarOpen?: (open: boolean) => void;
}

export default function AppNavbar({ onLogout }: Props) {
  return (
    <nav className="sticky top-0 z-40 flex flex-wrap items-center justify-between bg-[var(--color-background)] px-4 py-3 shadow">
      <a href="/" className="flex items-center gap-2 ml-1 my-1">
        <img
          src="/img/health-logo-light-mode.png"
          alt="Infinity Health"
          className="h-8 w-auto max-w-[150px]"
        />
      </a>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-1 hover:text-[var(--color-primary-accent)] transition">
          <FaceSmileIcon className="h-5 w-5" />
          <span className="hidden sm:inline text-[var(--color-text)]">Perfil</span>
        </button>
        <button onClick={onLogout} className="flex items-center gap-1 hover:text-[var(--color-primary-accent)] transition">
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span className="hidden sm:inline text-[var(--color-text)]">Logout</span>
        </button>
      </div>
    </nav>
  );
}
