
import {FaBolt} from 'react-icons/fa';

const scrollToSection = (e: React.MouseEvent) => {
  e.preventDefault();
  const element = document.getElementById('client-progress');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const StickyClientProgressButton = () => {
  return (
    <button 
      onClick={scrollToSection}
      className="fixed top-1/3 right-4 transform -translate-y-1/2 sm:hidden z-50 border-none bg-transparent p-0 focus:outline-none"
      aria-label="Ir a la sección de progreso"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <FaBolt className="text-white text-lg" />
      </div>
    </button>
  );
};

export default StickyClientProgressButton;
