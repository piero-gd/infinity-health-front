import React, { useState, useRef } from 'react';
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PiShoppingCartLight } from 'react-icons/pi';
import { AiOutlineShop } from "react-icons/ai";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { mockProductCatalog } from '../data/mockProductCatalog';
import type { Product } from '../types';

interface TemporalProductCardProps {
    product?: Product[];
}

// Custom arrow components
const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} !flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors absolute right-0 top-1/2 transform -translate-y-1/2`}
            style={{ ...style }}
            onClick={onClick}
        >
            <FaChevronRight className="text-black" size={20} />
        </div>
    );
};

const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} !flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors absolute left-0 top-1/2 transform -translate-y-1/2`}
            style={{ ...style }}
            onClick={onClick}
        >
            <FaChevronLeft className="text-black" size={20} />
        </div>
    );
};

export default function TemporalProductCard({ product = mockProductCatalog }: TemporalProductCardProps) {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());
    const sliderRef = useRef<Slider>(null);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ]
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'PEN'
        }).format(price);
    };

    const handleToggleFavorite = (e: React.MouseEvent, productId: number) => {
        e.stopPropagation();
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    const handleCardClick = (product: Product) => {
        console.log('Producto clickeado:', product);
    };

    const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        console.log('Añadir al carrito:', product);
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-medium ">Recomendados para ti</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary  shadow-lg rounded-full hover:bg-primary/10 transition-colors">
                    Ver Tienda
                    <AiOutlineShop className="w-4 h-4" />
                </button>
            </div>
            
            <div className="relative px-6">
                <Slider ref={sliderRef} {...sliderSettings} className="py-2">
                    {product.map((item) => (
                        <div key={item.id} className="px-2">
                            <div
                                onClick={() => handleCardClick(item)}
                                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col border border-gray-100 mx-1"
                            >
                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => handleToggleFavorite(e, item.id)}
                                    className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                                >
                                    {favorites.has(item.id) ? (
                                        <FaHeart className="w-5 h-5 fill-red-400 text-red-400" />
                                    ) : (
                                        <FaRegHeart className="w-5 h-5 text-gray-400 hover:text-red-400" />
                                    )}
                                </button>

                                {/* Category */}
                                <span className="absolute top-3 left-3 z-10 inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                    {item.categoria}
                                </span>

                                {/* Product Image */}
                                <div className="aspect-square bg-gray-100 overflow-hidden">
                                    <img
                                        src={item.imagen || 'https://via.placeholder.com/300'}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-semibold text-gray-900 text-center mb-2 line-clamp-2">
                                        {item.nombre}
                                    </h3>

                                    <p className="text-sm text-gray-500 text-center mb-4 line-clamp-2">
                                        {item.descripcion}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="flex items-baseline justify-center gap-2 mb-3">
                                            {item.precioanterior && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    {formatPrice(item.precioanterior)}
                                                </span>
                                            )}
                                            <span className="text-lg font-bold text-primary">
                                                {formatPrice(item.precionuevo)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => handleAddToCartClick(e, item)}
                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                                        >
                                            <PiShoppingCartLight size={18} />
                                            Añadir al carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}