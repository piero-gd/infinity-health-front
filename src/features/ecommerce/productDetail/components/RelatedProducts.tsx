import { ShoppingCart } from "lucide-react";

// Related Products Component
export const RelatedProducts: React.FC = () => {
    const relatedProducts = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' }
    ];
  
    const handleBuyProduct = (productId: string) => {
      console.log(`Comprando producto: ${productId}`);
      // Aquí iría la lógica de compra
    };
  
    return (
      <div className="mt-16">

        {/* Título y Descripción */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8 mb-14">
          {/* Lado izquierdo con título */}
          <div>
            <h2 className="ml-8 text-3xl font-bold text-gray-900">
              Productos relacionados
            </h2>
          </div>
  
          {/* Lado Derecho con descripción */}
          <div>
            <p className="ml-22 text-gray-500 text-sm leading-relaxed">
              Lorem Ipsum Dolor Sit Amet Consectetur. Vel A Posuere Habitant Nunc Sit Eget Etiam. Sed In Duis In Scelerisque.
              Ipsum Dolor Sit Amet Consectetur. Vel A Posuere Habitant Nunc Sit Eget Etiam. Sed In Duis In Scelerisque.
            </p>
          </div>
        </div> 

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Productos */}
          {relatedProducts.map((product) => (
            <div key={product.id} className="relative">
              {/* Tarjeta de producto */}
              <div className="bg-gray-300 rounded-2xl aspect-[7/10] relative flex items-end p-8">
                {/* Botón de compra */}
                <button
                  onClick={() => handleBuyProduct(product.id)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 ml-8 mr-8 "
                >COMPRAR
                  <ShoppingCart size={16} />
                  
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  };