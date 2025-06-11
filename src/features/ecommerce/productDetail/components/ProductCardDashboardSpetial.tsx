import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import { PiShoppingCartLight } from "react-icons/pi";

import type { ProductCardProps } from '../types';

export const ProductCardDashboardSpetial: React.FC<ProductCardProps> = ({ 
    product,
    onAddToCart,
    onToggleFavorite 
}) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
        }).format(price);
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart?.(product.id);
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        onToggleFavorite?.(product.id);
    };

    return (
        <div 
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col"
        >
            {/* Title */}
                <h1 className="absolute top-8 left-7 z-45 p-2 text-2xl font-semibold text-gray-900 text-center">
                    {product.nombre}
                </h1>

            {/* Category */}
            <span className="absolute top-24 left-7 z-45 p-2 bg-white/80 rounded-full border border-gray-200 text-xs font-medium text-gray-500 mb-1">
                    {product.categoria}
                </span>

            {/* Calificacion */}
            <span className="absolute top-16 left-7 z-45 p-2 text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    {product.calificacion}
                </span>

            {/* Product Image */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
                <img 
                    src={product.imagenes[0] || 'https://via.placeholder.com/300'} 
                    alt={product.nombre}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            

            {/* Product Info */}
            <div className="p-4 flex-1 flex flex-col bg-gray-100">

                {/* Price */}
                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 justify-center">
                        {product.precioAnterior && (
                            <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.precioAnterior)}
                            </span>
                        )}
                        <span className="text-sm font-bold text-[var(--color-primary)] ">
                            {formatPrice(product.precio)}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCartClick}
                        className="mt-3 bg-gradient-to-b from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] hover:bg-gray-200 text-white py-2 px-4 rounded-full shadow-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                    ><PiShoppingCartLight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};