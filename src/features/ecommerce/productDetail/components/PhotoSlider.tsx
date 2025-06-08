import { useState } from 'react';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

interface PhotoSliderProps {
    images: string[];
    videos?: string[];
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({ images, videos = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
  
    return (
      <div className="p-4 mx-8">
        {/* Main Image */}
        <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '9/10' }}>
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {currentIndex >= images.length ? (
              <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={48} className="text-white" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-6xl font-light">IMG {currentIndex + 1}</div>
            )}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            aria-label="Imagen anterior"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button 
            onClick={nextImage}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            aria-label="Siguiente imagen"
          >
            <ArrowRight size={24} />
          </button>
        </div>
  
        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3 mx-8 mt-4">
          {[...images, ...videos].slice(0, 4).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                currentIndex === index ? 'ring-2 ring-blue-500 bg-gray-300' : 'hover:bg-gray-300'
              }`}
            >
              {index >= images.length ? (
                <div className="flex flex-col items-center">
                  <Play size={24} className="text-gray-700" />
                  <span className="text-xs mt-1 text-gray-700">Video</span>
                </div>
              ) : (
                <span className="text-gray-700">IMG {index + 1}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };
  