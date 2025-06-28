import { useState } from "react";

export default function PriceRange() {
  const minPrice = 0;
  const maxPrice = 150;
  const [currentMin, setCurrentMin] = useState(minPrice);
  const [currentMax, setCurrentMax] = useState(maxPrice);
  const handleMinChange = (value: number) => {
    setCurrentMin(value);
  };
  const handleMaxChange = (value: number) => {
    setCurrentMax(value);
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 text-gray-800">Precio</h3>
      <div className="space-y-4">

        {/* Min AND Max Range Slider */}
        <div className="flex gap-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMin}
            onChange={(e) => handleMinChange((e.target as HTMLInputElement).valueAsNumber)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={currentMax}
            onChange={(e) => handleMaxChange((e.target as HTMLInputElement).valueAsNumber)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        {/* Price Display */}
        <div className="flex justify-between items-center">
          <div className="text-sm ">
            <span className="font-semibold text-blue-600">${currentMin}.00</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-600">${currentMax}.00</span>
          </div>
        </div>
        
        {/* Input Fields */}
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="number"
              value={currentMin}
              onChange={(e) => handleMinChange(parseInt(e.target.value) || minPrice)}
              min={minPrice}
              max={maxPrice}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <span className="self-center text-gray-400">-</span>
          <div className="flex-1">
            <input
              type="number"
              value={currentMax}
              onChange={(e) => handleMaxChange(parseInt(e.target.value) || maxPrice)}
              min={minPrice}
              max={maxPrice}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-full focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}