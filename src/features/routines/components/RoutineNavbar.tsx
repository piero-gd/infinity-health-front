import { ArrowRightOnRectangleIcon, BookOpenIcon, FaceSmileIcon } from '@heroicons/react/24/solid';

export default function RoutineNavbar({ onLogout }: { onLogout: () => void }) {
  return (
    <nav className="sticky top-0 z-10 flex items-center bg-[var(--color-background)] px-4 py-3 shadow">
      <div className="flex items-center mr-auto gap-2">
        <BookOpenIcon className="h-6 w-6 text-[var(--color-primary)]" />
        <span className="font-bold text-xl">Infinity Health</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 hover:text-white transition">
          <FaceSmileIcon className="h-5 w-5" />
          <span>Perfil</span>
        </div>
        <button onClick={onLogout} className="flex items-center gap-1 hover:text-white transition">
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}