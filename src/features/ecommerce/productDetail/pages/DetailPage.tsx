import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { InfoDetail } from '../components/InfoDetail';
import { PhotoSlider } from '../components/PhotoSlider';
import { ShareOptions } from '../components/ShareOptions';
import { RelatedProducts } from '../components/RelatedProducts';
import AboutProduct from '../components/AboutProduct';
import { useProductBySlug } from '../../shared/hooks/useProducts';
import { useCart } from '../../cart';


export default function DetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Usar el hook para obtener el producto por slug
  const { 
    data: currentProduct, 
    isLoading: loading, 
    error 
  } = useProductBySlug(slug);
  
  // Usar el hook del carrito
  const { addToCartBySlug } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error al cargar el producto</h2>
          <p className="mt-2 text-gray-500">Ocurrió un error al intentar cargar los detalles del producto.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }
  
  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Producto no encontrado</h2>
          <p className="mt-2 text-gray-500">El producto que estás buscando no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Photo Slider - Columna Izquierda */}
        <div className="lg:sticky lg:top-4 lg:h-fit">
          <PhotoSlider 
            images={currentProduct.images} 
            videos={currentProduct.videos || []}
            videoThumbnails={currentProduct.videoThumbnails || []}
          />
        </div>
        
        {/* Product Info - Columna Derecha */}
        <div className="space-y-2">
          <InfoDetail 
            product={currentProduct} 
            onAddToCart={(_, quantity) => addToCartBySlug(currentProduct.slug, quantity)}
          />
          <ShareOptions slug={currentProduct.slug} />
        </div>
      </div>

      {/* Related Products - Sección Completa Abajo */}
      <div className="mt-16 w-full">
        <RelatedProducts 
          currentProductId={currentProduct.id} 
          category={currentProduct.category}
          categoryName={currentProduct.category_info?.name} 
        />
      </div>

      <div className="mt-16 w-full">
        <AboutProduct />
      </div>

    </div>
  );
}