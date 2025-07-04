import { mockProduct } from '../../productDetail/data/mockProduct';
import type { Product } from '../../productDetail/types';
import { ProductCardHover } from '../../../../components/ProductCardHover';
import { ProductCardPrincipal } from '../../../../components/ProductCardPrincipal';
export default function ProductList() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Catálogo de Productos</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {mockProduct.map((product: Product) => (
                    <div key={product.id} className="h-full">
                        <ProductCardHover 
                            product={product}
                        />
                    </div>
                ))}
            </div>

        {/*prueba*/}

        <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {mockProduct.map((product: Product) => (
                    <div key={product.id} className="h-full">
                        <ProductCardPrincipal 
                            product={product}
                        />
                    </div>
                ))}
            </div>

        </div>
        </div>
    );
}