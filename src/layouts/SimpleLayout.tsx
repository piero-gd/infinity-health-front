import { useState } from "react";
import AppSidebar from "../components/AppSidebar";
import AppNavbar from "../components/AppNavbar";
import { Outlet } from "react-router-dom";
import { useDisableBodyScroll } from "../hooks/useDisableBodyScroll";

interface Props {
  onLogout: () => void;
  
}

export default function SimpleLayout({ onLogout }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useDisableBodyScroll(sidebarOpen && window.innerWidth < 640);
  // Solo aplicar ml (margin-left) si NO estamos en mobile
  const sidebarWidthDesktop = sidebarOpen ? "ml-56" : "ml-16";

  return (
    <div className="min-h-screen bg-exercises-wallpaper text-[var(--color-text)]">
      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {/* Backdrop solo visible en mobile cuando sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-xs sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Navbar (ajustada al sidebar solo en desktop) */}
      <div
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 hidden sm:block ${sidebarWidthDesktop}`}
      >
        <AppNavbar onLogout={onLogout} setSidebarOpen={setSidebarOpen} />
      </div>
      {/* En mobile, navbar debe estar siempre sin margen */}
      <div className="fixed top-0 left-0 right-0 z-30 block sm:hidden">
        <AppNavbar onLogout={onLogout} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Contenido principal (ajustado solo en desktop) */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "sm:ml-56" : "sm:ml-16"
        } ml-0`}
      >
        <Outlet />
      </main>
    </div>
  );
}
