import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Play } from 'lucide-react';

interface PhotoSliderProps {
    images: string[];
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
  
    return (
      <div className="p-4">
        {/* Main Image */}
        <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '1/1' }}>
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {currentIndex === 3 ? (
              <Play size={48} className="text-gray-500" />
            ) : (
              <div className="text-6xl font-light">IMG</div>
            )}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={20} />
          </button>
        </div>
  
        {/* Thumbnails */}
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                currentIndex === index ? 'ring-2 ring-blue-500 bg-gray-300' : 'hover:bg-gray-300'
              }`}
            >
              {index === 3 ? <Play size={16} /> : 'IMG'}
            </button>
          ))}
        </div>
      </div>
    );
  };
  