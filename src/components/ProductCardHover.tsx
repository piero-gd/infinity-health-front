import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import { CategoriesTag } from './CategoriesTag';
import type { ProductCardProps } from '../features/ecommerce/shared/types';

export const ProductCardHover: React.FC<ProductCardProps> = ({
    product
}) => {
    const navigate = useNavigate();

    const formatPrice = (price: string) => {
        return `$ ${parseFloat(price).toFixed(2)}`;
      };

    const handleCardClick = () => {
        navigate(`/product/${product.slug}`);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="group relative bg-white rounded-xl overflow-hidden shadow-lg
            cursor-pointer h-full w-[350px] flex-shrink-0 flex flex-col border border-gray-100"
            style={{ width: '350px', height: '450px' }}
        >
            {/* Category Badge */}
            <div className="absolute top-5 left-5 z-20">
                <CategoriesTag categoryName={product.category_info?.name || 'Producto'} />
            </div>

            {/* Product Image */}
            <div
                className="relative w-full overflow-hidden flex justify-center items-center bg-white p-0"
                style={{ height: '60%' }} // 5/8 de la altura
            >
                <img 
                    src={product.images[1]?.image_url || product.images[0]?.image_url || product.featured_image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Product Info */}
            <div
                className="bg-white/90 p-3 flex flex-col  rounded-t-xl "
                style={{ height: '40%' }} // 3/8 de la altura
            >
                {/* Title and Rating */}
                <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 text-base leading-tight flex-1 truncate">
                        {product.name}
                    </h4>
                    <div className="flex items-center gap-1 ml-2">
                        <FaStar className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">
                            {product.rating || '4.9'}
                        </span>
                    </div>
                </div>

                {/* Slogan */}
                <p className="text-sm text-gray-500 mb-2 leading-snug truncate">
                    {product.slogan}
                </p>

                {/* Price */}
                <div className="mb-1">
                    { product.price !== product.price_amb && (
                        <div className="text-sm text-gray-400 mb-0.5 line-through">
                            {formatPrice(product.price)}
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[var(--color-primary)]">
                            {formatPrice(product.price_amb)}
                        </span>
                        {product.price !== product.price_amb && (
                         <img src="../../img/payInfinity.svg" className="w-4 h-4 mb-0.5" />
                        )}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="mt-3 w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-2.5 px-4 rounded-full text-sm font-extralight transition-all flex items-center justify-center gap-2"
                >
                    Agregar
                    <PiShoppingCartLight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};