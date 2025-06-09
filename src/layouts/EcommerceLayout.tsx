import EcommerceNavbar from '../components/EcommerceNavbar'
import { Outlet } from 'react-router-dom'

interface Props {
  onLogout: () => void
}

export default function EcommerceLayout({ onLogout }: Props) {

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
        <EcommerceNavbar onLogout={onLogout} />
        <Outlet />
    </div>
  )
}
