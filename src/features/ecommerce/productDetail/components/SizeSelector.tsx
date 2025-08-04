import { useState, useEffect } from 'react';
import type { SizeOption } from '../../shared/types/product.model';

interface SizeSelectorProps {
    sizes?: SizeOption[];
    selectedSize?: string;
    onSizeSelect?: (size: string) => void;
    label?: string;
    className?: string;
    showStock?: boolean;
}

export const SizeSelector = ({
    sizes = [],
    selectedSize: externalSelectedSize,
    onSizeSelect,
    label = 'Talla',
    className = '',
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
        <div className={className}>
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700">{label}</h4>
                {internalSelectedSize && showStock && (
                    <span className="text-xs font-medium" 
                          style={{ color: (sizes.find(s => s.value === internalSelectedSize)?.stock || 0) > 0 ? '#10B981' : '#EF4444' }}>
                        {(sizes.find(s => s.value === internalSelectedSize)?.stock || 0) > 0 
                            ? `${sizes.find(s => s.value === internalSelectedSize)?.stock || 0} disponibles` 
                            : 'Agotado'}
                    </span>
                )}
            </div>
            <div className="flex flex-wrap gap-3">
                {sortedSizes.map((size) => {
                    const isSelected = internalSelectedSize === size.value;
                    const isAvailable = size.available && (size.stock > 0);
                    
                    return (
                        <button
                            key={size.value}
                            type="button"
                            onClick={() => handleSizeSelect(size.value)}
                            disabled={!isAvailable}
                            className={`
                                relative w-12 h-12 border-2 rounded-lg text-sm font-semibold transition-all duration-200 
                                flex items-center justify-center
                                ${isSelected 
                                    ? 'bg-black text-white border-black shadow-md' 
                                    : isAvailable
                                        ? 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
                                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                                }
                            `}
                        >
                            {size.originalLabel || size.label}
                            {!isAvailable && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-gray-400 rotate-45 absolute"></div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};