import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { PiShoppingCartLight } from 'react-icons/pi';
import { SlEnergy } from "react-icons/sl";
import { mockProductCatalog } from '../data/mockProductCatalog';
import type { Product } from '../types';

interface TemporalProductCardProps {
    product?: Product[];
}

export default function TemporalProductCard({ product = mockProductCatalog }: TemporalProductCardProps) {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
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
        // Aquí puedes añadir la lógica para navegar al detalle del producto
    };

    const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        console.log('Añadir al carrito:', product);
        // Aquí puedes añadir la lógica para añadir al carrito
    };

    return (
        <div >
            <div className="flex justify-between">
                <h3 className="text-3xl font-medium mb-2">Productos Recomendados</h3>
            <button className="text-sm rounded-full px-4 py-2 border border-primary-light font-medium text-gray-500 shadow-xl">Ver Catalogo</button>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            
            {product.map((item) => {
                const isFavorite = favorites.has(item.id);
                
                return (
                    <div
                        key={item.id}
                        onClick={() => handleCardClick(item)}
                        className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col"
                    >
                        {/* Favorite Button */}
                        <button
                            onClick={(e) => handleToggleFavorite(e, item.id)}
                            className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                            aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                        >
                            {isFavorite ? (
                                <FaHeart className="w-5 h-5 fill-red-400 text-red-400" />
                            ) : (
                                <FaRegHeart className="w-5 h-5 hover:text-red-400" />
                            )}
                        </button>

                        {/* Category */}
                        <span className="absolute top-5 left-3 z-10 inline-flex items-center px-2 py-0.5 bg-[var(--color-primary-light)] border-1 border-[var(--color-primary-accent)] rounded-full text-xs font-medium text-[var(--color-primary-accent)]">
                           {item.categoria} <SlEnergy className="mr-1 w-3 h-3" />
                        </span>

                        {/* Product Image */}
                        <div className="aspect-square bg-gray-100 overflow-hidden">
                            <img
                                src={item.imagen || 'https://via.placeholder.com/300'}
                                alt={item.nombre}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                loading="lazy"
                            />
                        </div>


                        {/* Product Info */}
                        <div className="p-4 flex-1 flex flex-col">
                            {/* Title */}
                            <h3 className="font-semibold text-gray-900 text-center mb-2">
                                {item.nombre}
                            </h3>

                            {/* Description */}
                            <p className="text-base text-gray-500 text-center mb-2">
                                {item.descripcion}
                            </p>

                            {/* Price */}
                            <div className="mt-auto">
                                <div className="flex items-baseline gap-2 justify-center mb-3">
                                    {item.precioanterior && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {formatPrice(item.precioanterior)}
                                        </span>
                                    )}
                                    <span className="text-lg font-bold text-[var(--color-primary)]">
                                        {formatPrice(item.precionuevo)}
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={(e) => handleAddToCartClick(e, item)}
                                    className=" bg-gradient-to-r from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:from-[var(--color-btn-gradient-bottom)] hover:to-[var(--color-btn-gradient-top)] text-white py-2 px-2 rounded-full shadow-lg text-sm font-medium transition-all flex justify-right gap-2"
                                >
                                    <PiShoppingCartLight size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        </div>
    );
}