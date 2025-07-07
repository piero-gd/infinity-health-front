import { useNavigate } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import { PiShoppingCartLight } from "react-icons/pi";

import type { ProductCardProps } from '../features/ecommerce/productDetail/types';

export const ProductCardDashboardSpecial: React.FC<ProductCardProps> = ({
    product
}) => {
    const navigate = useNavigate();
    
    const formatPrice = (price: number) => {
        return `$ ${price.toFixed(2)}`;
      };
    
    //click de card
    const handleCardClick = () => {
        navigate(`/product/${product.slug}`);
    };

    //Implementacion para el futuro
    const handleAddToCartClick = () => {
    };

    return (
        <div className="w-full h-full flex justify-center">
            <div
                onClick={handleCardClick}
                className="relative bg-gradient-to-t from-pink-900 to-pink-500 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer w-full max-w-[16rem] h-80 flex flex-col"
            >
                {/* Imagen de Producto - Cubre toda la card */}
                <div className="absolute inset-0 w-full h-full">
                    <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Overlay para mejorar legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 "></div>

                {/* Contenido Principal - Lado Izquierdo */}
                <div className="absolute top-6 left-5 z-10 max-w-[55%]">
                    {/* Nombre */}
                    <h2 className="text-lg font-black text-black mb-2 leading-tight">
                        {product.name}
                    </h2>

                    {/* Calificacion */}
                    <div className="flex items-center gap-1 mb-3">
                        <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-black">
                            {product.rating}
                        </span>
                    </div>

                    {/* Category Tag */}
                    <div className="inline-block">
                        <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-300">
                            {product.category}
                        </span>
                    </div>
                </div>

                {/* Sección de Abajo - Precios y Botón */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="relative bg-white/60 backdrop-blur rounded-full px-4 py-2 shadow-lg flex border border-white items-center justify-between">
                        {/* Precios */}
                        <div className="flex flex-col">
                            { formatPrice(product.price) && (
                                <span className="text-gray-500  text-xs">
                                    {formatPrice(product.price)}
                                </span>
                            )}
                            <span className="text-lg font-black text-[var(--color-primary)] flex items-center gap-1">
                                {formatPrice(product.price_amb)}
                                <img src="../../img/payInfinity.svg" className="w-4 h-4 mb-0.5"/>
                            </span>
                        </div>

                        {/* Botón Añadir al Cart */}
                        <button
                            onClick={handleAddToCartClick}
                            className="w-10 h-10 bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:bg-blue-600 text-white rounded-full shadow-2xl transition-all flex items-center justify-center group hover:scale-105"
                        >
                            <PiShoppingCartLight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardDashboardSpecial;