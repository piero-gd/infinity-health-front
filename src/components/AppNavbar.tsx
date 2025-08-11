import {
  Bars3Icon,
} from "@heroicons/react/24/solid";

import { RiCoinsFill } from "react-icons/ri";
import { useAuthStore } from "../features/auth/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

interface Props {
  setSidebarOpen?: (open: boolean) => void;
  balance?: string;
  notificationCount?: number;
}

export default function AppNavbar({ 
  setSidebarOpen, 
  balance = "1,264 $",
}: Props) {
  // Get user data from auth store
  const { userData } = useAuthStore();
  const username = userData?.username || '';
  const firstName = userData?.first_name || '';
  const userAvatar = "/img/hombre.png";

  const navigate = useNavigate();

  // Usa firstName si está disponible, de lo contrario usa username
  const displayName = firstName || username;

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 xl:py-3 py-4 shadow-sm border-b border-gray-200">
      
      {/* Mobile Layout */}
      <div className="flex sm:hidden items-center justify-between w-full">
        {/* Left side - Logo and hamburger button */}
        <div className="flex items-center gap-4">
          {setSidebarOpen && (
            <button
              className="text-[var(--color-primary)] p-1"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          )}
          <a href="https://infinityhealth.fit/" className="flex items-center">
            <img
              src="/img/health-logo-light-mode.png"
              alt="Infinity Health"
              className="h-8 w-auto max-w-[120px]"
            />
          </a>
        </div>

        {/* Right side icons - Mobile */}
        <div className="flex items-center gap-4">
          {/* Balance */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <RiCoinsFill className="h-5 w-5 text-[var(--color-primary)]" />
            <span className="text-sm font-semibold text-gray-800">{balance}</span>
          </div>

          {/* User avatar */}
          <button className="flex items-center">
            <div className="rounded-full cursor-pointer hover:scale-104  p-0.5 overflow-hidden bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)]">
            <img
              src={userAvatar}
              onClick={() => navigate('/profile')}
              className="h-9 w-9  rounded-full object-cover"
            />
            </div>
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between w-full px-26">
        {/* Logo */}
        <a href="https://infinityhealth.fit/" className="flex items-center gap-2">
          <img
            src="/img/health-logo-light-mode.png"
            alt="Infinity Health"
            className=" ml-2 h-8 w-auto max-w-[120px]"
          />
        </a>

        {/* Right side - Desktop */}
        <div className="flex items-center gap-8">
          {/* Balance */}
          <div className="flex items-center gap-2">
            <RiCoinsFill className="h-6 w-6 text-[var(--color-primary)]" />
            <span className="text-md font-semibold text-gray-800">{balance}</span>
          </div>

        

          {/* User name and avatar */}
          <div className="flex items-center gap-3">
            <span className="text-gray-800 font-semibold mr-2">{displayName}</span>
            <div className="rounded-full cursor-pointer hover:scale-104  p-0.5 overflow-hidden bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)]">
            <img
              src={userAvatar}
              onClick={() => navigate('/profile')}
              className="h-10 w-10 rounded-full object-cover "
            />
            </div>
          </div>


        </div>
      </div>
    </nav>
  );
}