import { useState, useEffect } from 'react';
import type { Product } from '../../shared/types';
import { ProductCardHover } from '../../../../components/ProductCardHover';
import { ProductCardPrincipal } from '../../../../components/ProductCardPrincipal';
import { useProducts } from '../../shared/hooks/useProducts';
import { useFiltersStore } from '../../catalog/stores/useFiltersStore';
import Loader from '../../../../components/Loader';

export default function ProductList() {
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const limit = 12;
    
    // Obtener estado de filtros para detectar cambios
    const { 
        selectedCategory,
        selectedSort,
        minPrice,
        maxPrice,
        searchQuery,
        selectedProduct,
        selectedMerchandising,
        selectedObjective,
        selectedFormat
    } = useFiltersStore();
    
    // Usar React Query a través de nuestro hook personalizado
    const { 
        data, 
        isLoading, 
        isError, 
        error, 
        isFetching,
        refetch
    } = useProducts(page, limit);
    
    // Detectar cambios en los filtros y reiniciar la paginación
    useEffect(() => {
        console.log('Filters changed, resetting to page 1');
        if (page !== 1) {
            setPage(1);
        }
    }, [
        selectedCategory,
        selectedSort,
        minPrice,
        maxPrice,
        searchQuery,
        selectedProduct,
        selectedMerchandising,
        selectedObjective,
        selectedFormat
    ]);

    // Manejar los diferentes estados de la consulta
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-16">
                <h3 className="text-xl text-red-600">Error al cargar productos</h3>
                <p className="mt-2 text-gray-500">{(error as Error)?.message || 'Ocurrió un error inesperado'}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    const products = data?.data || [];
    const totalProducts = data?.total || 0;

    // Función para cambiar de página
    const handlePageChange = (newPage: number) => {
        console.log(`Changing page from ${page} to ${newPage}`);
        setPage(newPage);
        // Forzar refresco de datos con la nueva página
        refetch();
        // Scroll hacia arriba al cambiar de página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Indicador de carga durante refetch */}
            {isFetching && !isLoading && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
                    Actualizando productos...
                </div>
            )}
            
            {/* Contador de productos */}
            <div className="mb-4 text-sm text-gray-500">
                {totalProducts} productos encontrados
            </div>
            
            {products.length === 0 ? (
                <div className="text-center py-16">
                    <h3 className="text-xl text-gray-600">No se encontraron productos que coincidan con los filtros</h3>
                    <p className="mt-2 text-gray-500">Prueba con otros criterios de búsqueda</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {products.map((product: Product) => (
                        <div 
                            key={product.id} 
                            className="h-full relative"
                            onMouseEnter={() => setHoveredProduct(product.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            {/* Tarjeta normal */}
                            <div 
                                className={`transition-all duration-800 ease-in-out transform ${hoveredProduct === product.id ? 'opacity-0 scale-95 absolute' : 'opacity-100 scale-100'}`}
                                style={{ transitionProperty: 'opacity, transform' }}
                            >
                                <ProductCardPrincipal 
                                    product={product}
                                />
                            </div>
                            
                            {/* Tarjeta hover */}
                            <div 
                                className={`transition-all duration-800 ease-in-out transform ${hoveredProduct === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute top-0'}`}
                            >
                                <ProductCardHover 
                                    product={product}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Paginación simple */}
            {totalProducts > limit && (
                <div className="mt-8 flex justify-center gap-2">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-4 py-2 border rounded-md ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 border bg-blue-50 rounded-md">
                        {page} de {Math.ceil(totalProducts / limit)}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= Math.ceil(totalProducts / limit)}
                        className={`px-4 py-2 border rounded-md ${page >= Math.ceil(totalProducts / limit) ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}