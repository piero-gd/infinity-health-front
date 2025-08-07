interface ColorOption {
    value: string;
    name?: string;
}

interface ColorSelectorProps {
    colors?: ColorOption[];
    selectedColor?: string;
    onColorSelect?: (color: string) => void;
}

export const ColorSelector = ({
    colors = [],
    selectedColor,
    onColorSelect,
}: ColorSelectorProps) => {
    if (!colors || colors.length === 0) {
        return null;
    }

    const handleColorSelect = (colorValue: string) => {
        onColorSelect?.(colorValue);
    };

    return (
        <div>
            <h4 className="text-sm font-semibold mb-2 text-gray-700">Color</h4>
            <div className="flex flex-wrap items-center gap-3">
                {colors.map((color) => {
                    const isSelected = selectedColor === color.value;
                    return (
                        <label key={color.value} className="cursor-pointer">
                            <input
                                type="radio"
                                value={color.value}
                                checked={isSelected}
                                onChange={() => handleColorSelect(color.value)}
                                className="sr-only"
                            />
                            <div 
                                className={`
                                    w-8 h-8 rounded-full border-2 
                                    ${isSelected ? 'ring-2 ring-gray-700 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'}
                                    transition-all duration-200
                                `}
                                style={{
                                    backgroundColor: color.value,
                                    borderColor: isSelected ? color.value : 'transparent',
                                }}
                            />
                        </label>
                    );
                })}
            </div>
        </div>
    );
};