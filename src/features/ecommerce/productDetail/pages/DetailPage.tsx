import { InfoDetail } from '../components/InfoDetail';
import { PhotoSlider } from '../components/PhotoSlider';
import { ShareOptions } from '../components/ShareOptions';
import { mockProduct } from '../data/mockProduct';
import { RelatedProducts } from '../components/RelatedProducts';

export default function DetailPage() {
  // Use the first product as default for now
  const currentProduct = mockProduct[0];

  if (!currentProduct) {
    return <div>No hay productos disponibles</div>;
  }

  return (
    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Photo Slider - Columna Izquierda */}
        <div className="lg:sticky lg:top-4 lg:h-fit">
          <PhotoSlider 
            images={currentProduct.imagenes} 
            videos={currentProduct.videos} 
          />
        </div>
        
        {/* Product Info - Columna Derecha */}
        <div className="space-y-8">
          <InfoDetail product={currentProduct} />
          <ShareOptions productId={currentProduct.id} />
        </div>
      </div>

      {/* Related Products - Sección Completa Abajo */}
      <div className="mt-16 w-full">
        <RelatedProducts 
          currentProductId={currentProduct.id} 
          category={currentProduct.categoria} 
        />
      </div>
    </div>
  );
}