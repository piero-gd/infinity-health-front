import { useState, useRef, useEffect } from 'react';

interface DualRangeSliderProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

export default function DualRangeSlider({ minPrice, maxPrice, onPriceChange }: DualRangeSliderProps) {
  const [minValue, setMinValue] = useState(minPrice);
  const [maxValue, setMaxValue] = useState(maxPrice);
  const [isDragging, setIsDragging] = useState(false);
  const [startOffsetX, setStartOffsetX] = useState(0);

  const MIN_RANGE = 0;
  const MAX_RANGE = 1000;

  const sliderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);

  // Sincronizar con props
  useEffect(() => {
    setMinValue(minPrice);
    setMaxValue(maxPrice);
  }, [minPrice, maxPrice]);

  const updateProgress = () => {
    const range = MAX_RANGE - MIN_RANGE;
    const valueRange = maxValue - minValue;
    const width = (valueRange / range) * 100;
    const minOffset = ((minValue - MIN_RANGE) / range) * 100;
    
    if (progressRef.current) {
      progressRef.current.style.width = `${width}%`;
      progressRef.current.style.left = `${minOffset}%`;
    }
  };

  useEffect(() => {
    updateProgress();
  }, [minValue, maxValue]);

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= maxValue) {
      setMaxValue(value);
      onPriceChange(value, value);
    } else {
      setMinValue(value);
      onPriceChange(value, maxValue);
    }
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= minValue) {
      setMinValue(value);
      onPriceChange(value, value);
    } else {
      setMaxValue(value);
      onPriceChange(minValue, value);
    }
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = progressRef.current?.getBoundingClientRect() || { left: 0 };
    setStartOffsetX(e.clientX - rect.left);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current || !progressRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const progressWidth = parseFloat(progressRef.current.style.width || '0');

    let newLeft = ((e.clientX - sliderRect.left - startOffsetX) / sliderRect.width) * 100;
    newLeft = Math.min(Math.max(newLeft, 0), 100 - progressWidth);

    progressRef.current.style.left = `${newLeft}%`;

    const range = MAX_RANGE - MIN_RANGE;
    const newMin = Math.round((newLeft / 100) * range) + MIN_RANGE;
    const newMax = newMin + (maxValue - minValue);

    setMinValue(newMin);
    setMaxValue(newMax);
    onPriceChange(newMin, newMax);

    if (minInputRef.current) minInputRef.current.value = newMin.toString();
    if (maxInputRef.current) maxInputRef.current.value = newMax.toString();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startOffsetX, maxValue, minValue]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Dual Range Slider */}
      <div className="mb-6">
        <div 
          ref={sliderRef}
          className={`relative h-2 bg-gray-200 mb-4 rounded-lg ${isDragging ? 'cursor-grabbing' : ''}`}
        >
          {/* Progress Bar */}
          <div
            ref={progressRef}
            onMouseDown={handleProgressMouseDown}
            className="absolute w-[80%] left-[10%] h-full bg-[var(--color-primary)] rounded-lg cursor-grab hover:bg-[var(--color-primary)] transition-colors"
          />
          
          {/* Min Range Input */}
          <input
            ref={minInputRef}
            type="range"
            min={MIN_RANGE}
            max={MAX_RANGE}
            value={minValue}
            onChange={handleMinSliderChange}
            className="absolute w-full h-2 bg-transparent transparent pointer-events-none appearance-none cursor-pointer range-slider-thumb"
          />
          
          {/* Max Range Input */}
          <input
            ref={maxInputRef}
            type="range"
            min={MIN_RANGE}
            max={MAX_RANGE}
            value={maxValue}
            onChange={handleMaxSliderChange}
            className="absolute w-full h-2 transparent pointer-events-none bg-transparent appearance-none cursor-pointer range-slider-thumb"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="number"
              value={minValue}
              onChange={(e) => handleMinSliderChange(e)}
              min={MIN_RANGE}
              max={MAX_RANGE}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
            />
          </div>
          <span className="self-center text-gray-400">-</span>
          <div className="flex-1">
            <input
              type="number"
              value={maxValue}
              onChange={(e) => handleMaxSliderChange(e)}
              min={MIN_RANGE}
              max={MAX_RANGE}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}