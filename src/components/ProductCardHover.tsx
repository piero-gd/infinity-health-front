import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import { CategoriesTag } from './CategoriesTag';
import type { ProductCardProps } from '../features/ecommerce/productDetail/types';

export const ProductCardHover: React.FC<ProductCardProps> = ({
    product
}) => {
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return `$ ${price.toFixed(2)}`;
      };

    const handleCardClick = () => {
        navigate(`/product/${product.slug}`);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="group relative bg-white rounded-xl overflow-hidden 
            cursor-pointer h-full w-[280px] flex-shrink-0 flex flex-col border border-gray-100"
            style={{ width: '280px' }}
        >
            {/* Category Badge */}
            <div className="absolute top-5 left-5 z-20">
                <CategoriesTag categoryName={product.categoria} />
            </div>

            {/* Product Image */}
            <div className="relative bg-white flex justify-center items-center h-56 p-4">
                <img 
                    src={product.imagenes[1]}
                    alt={product.nombre}
                    className="w-full h-full object-contain max-h-[200px]"
                    loading="lazy"
                />
            </div>

            {/* Product Info */}
            <div className="bg-white p-4 flex-1 flex flex-col">
                {/* Title and Rating */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight flex-1">
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
                    { formatPrice(product.precioNormal) && (
                        <div className="text-sm text-gray-400 mb-1">
                            {formatPrice(product.precioNormal)}
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-[var(--color-primary)]">
                            {formatPrice(product.precioEmbajador)}
                        </span>
                        {formatPrice(product.precioNormal) && (
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