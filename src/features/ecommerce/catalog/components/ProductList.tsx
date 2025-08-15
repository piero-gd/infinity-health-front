import { useState, useEffect, useRef } from 'react';
import type { Product } from '../../shared/types';
import { ProductCardHover } from '../../../../components/ProductCardHover';
import { ProductCardPrincipal } from '../../../../components/ProductCardPrincipal';
import { useProducts } from '../../shared/hooks/useProducts';
import { useFiltersStore } from '../../catalog/stores/useFiltersStore';
import ExerciseLoader from '../../../../components/ExerciseLoader';
import { showToast } from '../../../../utils/toastConfig';

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

    // Mostrar toast de error si hay un error
    const errorShown = useRef(false);
    useEffect(() => {
        if (isError && !errorShown.current) {
            showToast.error('Error', 'No se pudieron cargar los productos. Por favor, inténtalo de nuevo.');
            errorShown.current = true;
        }
        
        // Resetear el flag cuando se resuelve el error
        if (!isError) {
            errorShown.current = false;
        }
    }, [isError, error]);

    // Mostrar toast de carga inicial
    useEffect(() => {
        if (isLoading) {
            showToast.loading('Cargando productos...');
            return () => {
                showToast.dismiss();
            };
        }
    }, [isLoading]);

    // Mostrar toast de actualización
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        
        if (isFetching && !isLoading) {
            showToast.loading('Actualizando productos...');
        } else if (!isLoading) {
            showToast.dismiss();
        }
    }, [isFetching, isLoading]);

    // Manejar los diferentes estados de la consulta - mostrar loader para primera carga
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <ExerciseLoader />
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
        <div className="w-full px-2 py-2">
            {/* Los indicadores de carga/error ahora se manejan con toasts */}
            
            {/* Contador de productos */}
            <div className="ml-2 mb-4 text-sm text-gray-500">
                {totalProducts} productos encontrados
            </div>
            
            {products.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl text-gray-600">No se encontraron productos que coincidan con los filtros</h3>
                    <p className="mt-2 text-gray-500">Prueba con otros criterios de búsqueda</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center ">
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
                <div className="mt-8 mb-4 flex justify-center gap-2">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`px-2 py-2 border rounded-full ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-[var(--color-primary)] hover:bg-blue-50'}`}
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 border border-[var(--color-primary-accent)] bg-blue-50 rounded-full">
                        {page} de {Math.ceil(totalProducts / limit)}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= Math.ceil(totalProducts / limit)}
                        className={`px-2 py-2 border rounded-full ${page >= Math.ceil(totalProducts / limit) ? 'bg-gray-100 text-gray-400' : 'bg-white text-[var(--color-primary)] hover:bg-blue-50'}`}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}