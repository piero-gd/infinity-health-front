import RoutineNavbar from '../features/routines/components/RoutineNavbar'
import { Outlet } from 'react-router-dom'

interface Props {
  onLogout: () => void
}

export default function SimpleLayout({ onLogout }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <RoutineNavbar onLogout={onLogout} setSidebarOpen={() => {}} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
