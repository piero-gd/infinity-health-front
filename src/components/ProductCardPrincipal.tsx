import { useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import { CategoriesTag } from './CategoriesTag';
import type { ProductCardProps } from '../features/ecommerce/productDetail/types';

export const ProductCardPrincipal: React.FC<ProductCardProps> = ({
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
            {/* Categoria */}
            <div className="absolute top-5 left-5 z-20">
                <CategoriesTag categoryName={product.category} />
            </div>

            {/* Imagen del Producto */}
            <div className="relative bg-white flex justify-center items-center h-56 p-4">
                <img 
                    src={product.images[0]}
                    className="w-full h-full object-contain max-h-[200px]"
                    loading="lazy"
                />
            </div>

            {/* Informacion del Producto */}
            <div className="bg-white p-4 flex-1 flex flex-col">
                {/* Titulo y Calificacion */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-xl leading-tight flex-1 text-center">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-1 ml-2 absolute top-6 right-6">
                        <FaStar className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">
                            {product.rating}
                        </span>
                    </div>
                </div>

                {/* Slogan */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 text-center">
                    {product.slogan}
                </p>

                {/* Precio */}
                <div className="mb-1 text-center">
                    {formatPrice(product.price) && (
                        <div className="text-sm text-gray-700 mb-1">
                            {formatPrice(product.price)}
                        </div>
                    )}
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-md font-bold text-[var(--color-primary)]">
                            {formatPrice(product.price_amb)}
                        </span>
                        {formatPrice(product.price) && (
                         <img src="../../img/payInfinity.svg" className="w-5 h-5 mb-0.5" />
                        )}
                    </div>
                </div>

                {/* Boton */}
                <div className="flex justify-end mb-10">
                    <button
                        className="w-12 h-12 bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)]
                        text-white rounded-full shadow-lg transition-all absolute bottom-6 right-6 flex items-center justify-center hover:shadow-xl group-hover:scale-110"
                    >
                        <PiShoppingCartLight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};