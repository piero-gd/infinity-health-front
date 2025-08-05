import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import ProgressCart from '../components/ProgressCart';
import ListCart from '../components/ListCart';
import TotalCart from '../components/TotalCart';
import { RelatedProducts } from '../../productDetail/components/RelatedProducts';
import { useCart } from '../hooks/useCart';
import { useCheckout } from '../../checkout/hooks/useCheckout';
import { useEffect } from 'react';

export default function CartPage() {
    const navigate = useNavigate();
    
    // Utilizamos nuestro hook personalizado para el carrito
    const { 
        items, 
        subtotal,
        subtotalEmbajador,
        shipping,
        discount,
        updateCartQuantity,
        removeFromCart
    } = useCart();
    
    // Hook de checkout para proceder al proceso de pago
    const { proceedToShipping } = useCheckout();
    
    // Reiniciar el paso de checkout cuando se carga la página del carrito
    useEffect(() => {
        // Scroll al inicio de la página cuando se carga el carrito
        window.scrollTo(0, 0);
        
        // Si quieres reiniciar el checkout al entrar al carrito
        // resetCheckoutProcess();
    }, []);

    // Adaptadores para manejar la conversión entre los tipos antiguos y nuevos
    const handleUpdateQuantity = (id: string, quantity: number) => {
        updateCartQuantity(Number(id), quantity);
    };

    const handleRemoveItem = (id: string) => {
        removeFromCart(Number(id));
    };

    // Convertir CartProduct[] a CartItem[] para compatibilidad
    const cartItems = items.map(item => ({
        id: item.id.toString(),
        name: item.name,
        category: item.category_info.name,
        images: item.images.map(img => img.image_url),
        price: parseFloat(item.price),
        price_amb: parseFloat(item.price_amb),
        cantidad: item.quantity
    }));

    return (
        <div className="mx-auto max-w-7xl">
            
            <div className="pt-12">
                <ProgressCart currentStep={1} />
            </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 xl:px-0 px-6">
                <div className="lg:col-span-2">
                    {cartItems.length > 0 ? (
                      <ListCart 
                        items={cartItems}
                        onUpdateQuantity={handleUpdateQuantity} 
                        onRemoveItem={handleRemoveItem}
                      />
                    ) : (
                      <div className="bg-white rounded-3xl p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
                        <p className="text-gray-600 mb-8">Agrega algunos productos para continuar con tu compra</p>
                        <Link to="/catalog">
                          <button className="bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-3 px-6 rounded-full">
                            Ver productos
                          </button>
                        </Link>
                      </div>
                    )}
                </div>
                <div className="lg:col-span-1">
                    <TotalCart 
                      subtotalNormalPrice={subtotal}
                      subtotalEmbajadorPrice={subtotalEmbajador}
                      shipping={shipping}
                      discount={discount}
                    />
                </div>
           </div>

            <div className="mt-8 mb-8 flex items-center justify-center xl:justify-start">
                <Link to="/catalog">
                  <button className="border-2 border-[var(--color-primary)] bg-white text-[var(--color-primary)] font-medium py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                    <FaArrowLeft className="w-6 h-6 mr-2"/>
                    Continuar comprando
                  </button>
                </Link>
            </div>

            {cartItems.length > 0 && items[0]?.category_info && (
              <div>
                <RelatedProducts 
                  currentProductId={items[0].id} 
                  category={items[0].category_info.id}
                  categoryName={items[0].category_info.name}
                />
              </div>
            )}
            
        </div>
    );
}