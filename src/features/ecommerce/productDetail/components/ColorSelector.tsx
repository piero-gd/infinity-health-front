import { useState, useEffect } from 'react';
import type { ColorOption } from '../../shared/types/product.model';

interface ColorSelectorProps {
    colors?: ColorOption[];
    selectedColor?: string;
    onColorSelect?: (color: string) => void;
    label?: string;
    className?: string;
}

export const ColorSelector = ({
    colors = [],
    selectedColor: externalSelectedColor,
    onColorSelect,
    label = 'Color',
    className = ''
}: ColorSelectorProps) => {
    const [internalSelectedColor, setInternalSelectedColor] = useState<string>('');
    
    // Sincronizar el estado interno con el prop externo
    useEffect(() => {
        if (externalSelectedColor !== undefined) {
            setInternalSelectedColor(externalSelectedColor);
        }
    }, [externalSelectedColor]);

    const handleColorSelect = (colorValue: string) => {
        setInternalSelectedColor(colorValue);
        if (onColorSelect) {
            onColorSelect(colorValue);
        }
    };

    if (!colors || colors.length === 0) {
        return null;
    }

    return (
        <div className={className}>
            <h4 className="text-sm font-semibold mb-2 text-gray-700">{label}</h4>
            <div className="flex flex-wrap items-center gap-3">
                {colors.map((color) => {
                    const isSelected = internalSelectedColor === color.value;
                    return (
                        <label key={color.value} className="cursor-pointer">
                            <input
                                type="radio"
                                name="color"
                                value={color.value}
                                checked={isSelected}
                                onChange={() => handleColorSelect(color.value)}
                                className="sr-only"
                            />
                            <div 
                                className={`
                                    relative w-8 h-8 rounded-full border-2
                                    ${isSelected 
                                        ? 'ring-2 ring-gray-700 ring-offset-2' 
                                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
                                    }
                                    transition-all duration-200
                                `}
                                style={{
                                    backgroundColor: color.value,
                                    borderColor: color.borderColor || color.value,
                                }}
                            />
                        </label>
                    );
                })}
            </div>
        </div>
    );
};