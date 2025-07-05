import { mockProduct } from '../../productDetail/data/mockProduct';
import type { Product } from '../../productDetail/types';
import { ProductCardHover } from '../../../../components/ProductCardHover';
import { ProductCardPrincipal } from '../../../../components/ProductCardPrincipal';
import { useState } from 'react';

export default function ProductList() {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {mockProduct.map((product: Product) => (
                    <div 
                        key={product.id} 
                        className="h-full relative"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        {/* Tarjeta normal */}
                        <div 
                            className={`transition-all duration-500 ease-in-out transform ${hoveredProduct === product.id ? 'opacity-0 scale-95 absolute' : 'opacity-100 scale-100'}`}
                            style={{ transitionProperty: 'opacity, transform' }}
                        >
                            <ProductCardPrincipal 
                                product={product}
                            />
                        </div>
                        
                        {/* Tarjeta hover */}
                        <div 
                            className={`transition-all duration-500 ease-in-out transform ${hoveredProduct === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute top-0'}`}
                            style={{ transitionProperty: 'opacity, transform' }}
                        >
                            <ProductCardHover 
                                product={product}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}