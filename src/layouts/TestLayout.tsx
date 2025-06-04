import AppNavbar from '../components/AppNavbar'
import { Outlet } from 'react-router-dom'

interface Props {
  onLogout: () => void
}

export default function TestLayout({ onLogout }: Props) {

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
        <AppNavbar onLogout={onLogout} />
        <Outlet />
    </div>
  )
}
