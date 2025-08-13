import EcommerceNavbar from '../components/EcommerceNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function EcommerceLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <EcommerceNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
