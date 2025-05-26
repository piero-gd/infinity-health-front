import { useState } from 'react'
import AppSidebar from '../components/AppSidebar'
import AppNavbar from '../components/AppNavbar'
import { Outlet } from 'react-router-dom'

interface Props {
  onLogout: () => void
}

export default function SimpleLayout({ onLogout }: Props) {
  // Estado para el sidebar abierto/cerrado
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Ancho del sidebar: w-56 abierto, w-16 cerrado
  const sidebarWidth = sidebarOpen ? 'ml-56' : 'ml-16'

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Sidebar fijo */}
      <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Navbar ajustado al sidebar */}
      <div
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${sidebarWidth}`}
      >
        <AppNavbar
          onLogout={onLogout}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Contenido principal ajustado al sidebar y debajo del navbar */}
      <main
        className={`pt-16 transition-all duration-300 ${sidebarWidth} ml-0`}
        // pt-16 asume que el navbar tiene altura h-16 (ajusta si es diferente)
      >
        <Outlet />
      </main>
    </div>
  )
}
