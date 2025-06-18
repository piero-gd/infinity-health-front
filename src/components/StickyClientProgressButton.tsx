import { SlEnergy } from "react-icons/sl";


const scrollToSection = (e: React.MouseEvent) => {
  e.preventDefault();
  const element = document.getElementById('client-progress');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const StickyClientProgressButton = () => {
  return (
    <div className="fixed bottom-1/6 right-0 transform -translate-y-1/2 sm:hidden z-50">      
      {/* Button Container */}
      <button 
        onClick={scrollToSection}
        className="border-none bg-transparent p-0 focus:outline-none"
      >
        <div className="flex items-center justify-center w-16 h-15 rounded-l-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative">
          <SlEnergy className="ml-2 text-white text-lg" size={24}/>
        </div>
      </button>
    </div>
  );
};

export default StickyClientProgressButton;