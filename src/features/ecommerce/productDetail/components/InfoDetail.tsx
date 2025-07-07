import { useState } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";
import { CategoriesTag } from '../../../../components/CategoriesTag';
import { CiDeliveryTruck } from "react-icons/ci";
import type { InfoDetailProps } from '../types';

export const InfoDetail: React.FC<InfoDetailProps> = ({ 
    product,
    onAddToCart = () => {},
}) => {
    const [quantity, setQuantity] = useState(1);
   
    //para implementar luego
    const handleAddToCart = () => {
        onAddToCart(product, quantity);
    };

    const formatPrice = (price: number) => {
        return `$ ${price.toFixed(2)}`;
      };
    
    //calcular descuento
    const calculateDiscount = (): number => {
        if (!product.precioNormal) return 0;
        return Math.round(((product.precioNormal - product.precioEmbajador) / product.precioNormal) * 100);
    };

    const discount = calculateDiscount();
    
    return (
        <div className="xl:p-5 p-0 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-3">
                <h1 className="text-3xl font-bold text-gray-800">{product.nombre}</h1> 
                <div className="xl:block hidden">
                    <CategoriesTag categoryName={product.categoria} className="text-sm" />
                </div>
            </div>

            {/* PRECIOS + RESEÑAS */}
            <div className="flex items-center gap-3 justify-between pt-8">
            <div className="flex flex-col gap-2">
                    {formatPrice(product.precioNormal) && (
                        <span className="xl:text-lg text-md text-gray-500">
                            {formatPrice(product.precioNormal)}
                        </span>
                    )}
                    <div className="flex items-center gap-3">
                        <span className="xl:text-2xl text-lg font-bold text-[var(--color-primary)] flex items-center gap-1">
                            {formatPrice(product.precioEmbajador)}
                            <img src="../../img/payInfinity.svg" className="w-5 h-5 mb-0.5" />
                        </span>
                        {discount > 0 && (
                            <span className="ml-12 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-sm font-medium">
                                -{discount}%
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Rating */}
                <div className="items-center">
                    <div className="flex items-center text-yellow-400 gap-1">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < (product.calificacion || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                        ({product.resena || 0})
                    </span>
                </div>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="mt-6">
                <p className="text-gray-600">{product.descripcion}</p>
            </div>

            {/* BOTONES */}
            <div className="flex flex-row gap-4 mt-8 mb-0 xl:mb-10 xl:relative md:relative fixed bottom-0 left-0 right-0 z-50 xl:p-0 p-8 xl:bg-transparent xl:rounded-none rounded-t-3xl xl:border-none border-2 border-white bg-white/89 md:bg-transparent md:border-none backdrop-blur-sm justify-center xl:justify-start">
                <div className="flex items-center border border-gray-300 bg-gray-50 rounded-full">
                    <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-4 py-2 text-xl "
                    >
                        -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="px-4 py-2 text-xl"
                    >
                        +
                    </button>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className="bg-gradient-to-b from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] text-white py-3 px-6 shadow-lg rounded-full font-semibold transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                >
                    <span>Añadir </span> <span className="xl:block hidden">al carrito</span>
                    <PiShoppingCartLight size={20} />
                </button>
                
            </div>


              {/* DELIVERY */}
              <div className="mt-4  bg-white p-4 rounded-lg ">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2"><CiDeliveryTruck className="text-[var(--color-primary)]" size={20} />Delivery</h4>
              <div className=" pb-4">
                <p className="text-sm text-gray-600 mb-4">
                  Lorem ipsum proin accumsan nibh lacus vitae lobortis nunc ultricies.
                </p>
                
                <div className="space-y-2  xl:px-4 px-0 ">
                  <div className="grid grid-cols-2  xl:gap-4 text-sm font-medium text-gray-500 pb-3 border-b">
                    <span>Zona</span>
                    <span>Tiempo</span>
                  </div>
                  <div className="grid grid-cols-2 xl:gap-4 text-sm py-0 xl:py-2 border-b">
                    <span>Lima Metropolitana</span>
                    <span>4-5 días hábiles</span>
                  </div>
                  <div className="grid grid-cols-2 xl:gap-4 text-sm py-0 xl:py-2 border-b">
                    <span>Delivery a Provincias</span>
                    <span>4-5 días hábiles</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};