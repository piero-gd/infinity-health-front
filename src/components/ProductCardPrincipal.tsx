import { useNavigate } from 'react-router-dom';
import { PiShoppingCartLight } from "react-icons/pi";
import { CategoriesTag } from './CategoriesTag';
import type { ProductCardProps } from '../features/ecommerce/shared/types';

export const ProductCardPrincipal: React.FC<ProductCardProps> = ({
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
            className="group relative bg-white rounded-xl overflow-hidden 
            cursor-pointer h-full w-[280px] flex-shrink-0 flex flex-col border border-gray-100"
            style={{ width: '280px', height: '400px' }}
        >
            {/* Categoria */}
            <div className="absolute top-5 left-5 z-20">
                <CategoriesTag categoryName={product.category_info?.name || 'Producto'} />
            </div>

            {/* Imagen del Producto */}
            <div
                className="relative m-2 overflow-hidden flex justify-center items-center bg-white p-0"
                style={{ height: '60%' }} // 60% de la altura
            >
                <img 
                    src={product.images[0]?.image_url || product.featured_image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Informacion del Producto */}
            <div
                className="bg-white p-3 flex flex-col items-center justify-between"
                style={{ height: '40%' }} // 40% de la altura
            >
                {/* Titulo y Calificacion */}
                <div className="flex flex-col items-center w-full mb-1 relative">
                    <h4 className="font-semibold text-gray-900 text-base leading-tight truncate text-center w-full">
                        {product.name}
                    </h4>
                </div>

                {/* Slogan */}
                <p className="text-sm text-gray-500 mb-2 leading-snug truncate text-center w-full">
                    {product.slogan}
                </p>

                {/* Precio */}
                <div className="mb-1 w-full flex flex-col items-center">
                    {product.price !== product.price_amb && (
                        <div className="text-sm text-gray-400 mb-0.5 line-through">
                            {formatPrice(product.price)}
                        </div>
                    )}
                    <div className="flex items-center gap-2 justify-center">
                        <span className="text-base font-bold text-[var(--color-primary)]">
                            {formatPrice(product.price_amb)}
                        </span>
                        {product.price !== product.price_amb && (
                         <img src="../../img/payInfinity.svg" className="w-4 h-4 mb-0.5" />
                        )}
                    </div>
                </div>

                {/* Boton */}
                <div className="flex justify-end w-full mt-auto">
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