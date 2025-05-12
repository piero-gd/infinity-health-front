import { useState } from 'react'
import RoutineNavbar from '../features/routines/components/RoutineNavbar'
import RoutineSidebar from '../features/routines/components/RoutineSidebar'
import { Outlet } from 'react-router-dom'

interface Props {
  onLogout: () => void
}

export default function AppLayout({ onLogout }: Props) {
  // Estado compartido para abrir/cerrar sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <RoutineNavbar onLogout={onLogout} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <RoutineSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-auto bg-[var(--color-background)] text-[var(--color-text)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
