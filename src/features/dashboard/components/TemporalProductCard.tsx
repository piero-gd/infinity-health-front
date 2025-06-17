import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { PiShoppingCartLight } from 'react-icons/pi';
import { AiOutlineShop } from "react-icons/ai";
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
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-medium ">Recomendados para ti</h3>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary  shadow-lg rounded-full hover:bg-primary/10 transition-colors">
                    Ver Tienda
                    <AiOutlineShop className="w-4 h-4" />
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.map((item) => {
                    const isFavorite = favorites.has(item.id);
                    
                    return (
                        <div
                            key={item.id}
                            onClick={() => handleCardClick(item)}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col border border-gray-100"
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
                                    alt={item.nombre}
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
                    );
                })}
            </div>
        </div>
    );
}