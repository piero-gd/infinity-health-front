import { useState, useEffect } from 'react';
import type { SizeOption } from '../../shared/types/product.model';

interface SizeSelectorProps {
    sizes?: SizeOption[];
    selectedSize?: string;
    onSizeSelect?: (size: string) => void;
    showStock?: boolean;
}

export const SizeSelector = ({
    sizes = [],
    selectedSize: externalSelectedSize,
    onSizeSelect,
    showStock = true
}: SizeSelectorProps) => {
    const [internalSelectedSize, setInternalSelectedSize] = useState<string>('');
    
    // Sincronizar el estado interno con el prop externo
    useEffect(() => {
        if (externalSelectedSize !== undefined) {
            setInternalSelectedSize(externalSelectedSize);
        }
    }, [externalSelectedSize]);

    const handleSizeSelect = (sizeValue: string) => {
        const selectedSize = sizes.find(s => s.value === sizeValue);
        if (selectedSize && selectedSize.available) {
            setInternalSelectedSize(sizeValue);
            if (onSizeSelect) {
                onSizeSelect(sizeValue);
            }
        }
    };

    if (!sizes || sizes.length === 0) {
        return null;
    }

    // Ordenar las tallas lógicamente (XS, S, M, L, XL, etc.)
    const sortedSizes = [...sizes].sort((a, b) => {
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '36', '38', '40', '42', '44', '46', '48', '50'];
        const indexA = sizeOrder.indexOf(a.value);
        const indexB = sizeOrder.indexOf(b.value);
        
        if (indexA === -1 && indexB === -1) return a.value.localeCompare(b.value);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        
        return indexA - indexB;
    });

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">Talla</h4>
                {internalSelectedSize && showStock && (
                    <span className="text-xs font-medium" 
                          style={{ color: (sizes.find(s => s.value === internalSelectedSize)?.stock || 0) > 0 ? '#10B981' : '#EF4444' }}>
                        {(sizes.find(s => s.value === internalSelectedSize)?.stock || 0) > 0 ? 'En stock' : 'Agotado'}
                    </span>
                )}
            </div>
            <div className="flex flex-wrap gap-2">
                {sortedSizes.map((size) => {
                    const isSelected = internalSelectedSize === size.value;
                    const isAvailable = size.available && (size.stock > 0);
                    
                    return (
                        <label 
                            key={size.value} 
                            className={`
                                relative flex items-center justify-center h-10 px-3 text-sm font-medium border rounded-sm
                                ${isSelected 
                                    ? 'border-gray-700 bg-black text-gray-200 cursor-pointer' 
                                    : 'border-gray-700 text-gray-700'
                                }
                                ${!isAvailable ? 'border-gray-300 bg-gray-200 text-gray-700 cursor-not-allowed' : ''}
                            `}
                        >
                            <input
                                type="radio"
                                value={size.value}
                                checked={isSelected}
                                onChange={() => isAvailable && handleSizeSelect(size.value)}
                                className="sr-only"
                                disabled={!isAvailable}
                            />
                            {size.value}
                            {!isAvailable && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-1/2 h-0.25 bg-gray-700 rotate-180 absolute"></div>
                                </div>
                            )}
                        </label>
                    );
                })}
            </div>
        </div>
    );
};