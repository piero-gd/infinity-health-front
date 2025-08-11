import ProductCardDashboardSpecial from "../../../../components/ProductCardDashboardSpecial";
import type { RelatedProductsProps } from "../../shared/types";
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from "../../shared/services/productsService";

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
    currentProductId, 
    category}) => {
    // Obtener todos los productos usando React Query
    const { data } = useQuery({
        queryKey: ['all-products'],
        queryFn: () => fetchProducts({}),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
    
    const products = data?.data || [];
    
    let relatedProducts = products.filter(
        (product) => 
            product.category === category && 
            product.id !== currentProductId
    );

    if (relatedProducts.length < 4) {
        const additionalProducts = products
            .filter(p => p.id !== currentProductId && !relatedProducts.some(rp => rp.id === p.id))
            .slice(0, 4 - relatedProducts.length);
        relatedProducts = [...relatedProducts, ...additionalProducts];
    }

    relatedProducts = relatedProducts.slice(0, 4);

    if (relatedProducts.length === 0) return null;
    
    return (
        <div className="mt-16 w-full px-4 sm:px-6 lg:px-8 ">
            {/* Title and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-4">
                <div>
                    <h2 className="text-center xl:text-left text-2xl font-bold text-gray-900">
                        Productos relacionados
                    </h2>
                </div>
                <div>
                    <p className="xl:block hidden text-gray-500 text-sm leading-relaxed">
                        {relatedProducts.some(p => p.category === category) 
                            ? 'Descubre más productos de la misma categoría que podrían interesarte.'
                            : 'Productos que podrían interesarte.'}
                    </p>
                </div>
            </div>

            {/* Grid of related products */}
            <div className="w-full overflow-x-auto pb-4 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-full">
                    {relatedProducts.map((product) => (
                        <div key={product.id} className="w-full h-full">
                            <ProductCardDashboardSpecial
                                product={product}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};