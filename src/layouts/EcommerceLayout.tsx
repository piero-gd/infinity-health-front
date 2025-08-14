import { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import EcommerceNavbar from '../components/EcommerceNavbar';
import Footer from '../components/Footer';
import EcommerceSidebar from '../components/EcommerceSidebar';
import { useDisableBodyScroll } from "../hooks/useDisableBodyScroll";

export default function EcommerceLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile/tablet on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      // Using 1024px (lg breakpoint) to match the sidebar visibility
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Disable body scroll when sidebar is open on mobile
  useDisableBodyScroll(sidebarOpen && isMobile);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Navbar - Fixed at the top */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
        <EcommerceNavbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>

      {/* Sidebar - Visible on mobile and tablet */}
      <div className="lg:hidden">
        <EcommerceSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </div>
      
      {/* Backdrop for mobile/tablet when sidebar is open */}
      <div 
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Main content - No transform, stays in place */}
      <div className="pt-16 min-h-screen">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
