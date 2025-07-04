import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import { CategoriesTag } from './CategoriesTag';
import type { ProductCardProps } from '../features/ecommerce/productDetail/types';

export const ProductCardHover: React.FC<ProductCardProps> = ({
    product
}) => {
    const navigate = useNavigate();

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
        }).format(price);
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg
            transition-all cursor-pointer h-full flex flex-col
            bg-cover bg-center bg-no-repeat bg-gray-100
            pt-[75%]"
            style={{
                backgroundImage: `url(${product.imagenes[0]})`
            }}
        >

            {/* Category Badge */}
            <div className="absolute top-5 left-3 z-20 px-3">
                <CategoriesTag categoryName={product.categoria} />
            </div>

            {/* Product Image - Hidden but kept for SEO and accessibility */}
            <div className="absolute opacity-0 w-0 h-0 overflow-hidden">
                <img 
                    src={product.imagenes[0]}
                    alt={product.nombre}
                    loading="lazy"
                />
            </div>

            {/* Product Info */}
            <div className="bg-white/95 backdrop-blur-sm p-4 flex-1 flex flex-col rounded-t-2xl mt-[35%] relative z-10">
                {/* Title and Rating */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight flex-1">
                        {product.nombre}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                        <FaStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">
                            {product.calificacion || '4.9'}
                        </span>
                    </div>
                </div>

                {/* Slogan */}
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                    {product.slogan}
                </p>

                {/* Price */}
                <div className="mb-4">
                    {product.precioAnterior && (
                        <div className="text-sm text-gray-400 line-through mb-1">
                            {formatPrice(product.precioAnterior)}
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-600">
                            {formatPrice(product.precio)}
                        </span>
                        {product.precioAnterior && (
                         <img src="../../img/payInfinity.svg" className="w-5 h-5 mb-0.5" />
                        )}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-3 px-4 rounded-full shadow-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:shadow-xl"
                >
                    <PiShoppingCartLight className="w-5 h-5" />
                    Agregar
                </button>
            </div>
        </div>
    );
};