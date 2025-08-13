import { RiLock2Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import PaymentLogos from "../../../../components/PaymentLogos";
import { useCartStore } from '../../cart/stores/useCartStore';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { useCheckout } from '../hooks/useCheckout';

interface ProductsCheckoutProps {
    showCompletePurchase?: boolean;
}

export default function ProductsCheckout({ showCompletePurchase = false }: ProductsCheckoutProps) {
    // Obtener datos del carrito
    const { 
        items, 
        subtotal, 
        subtotalEmbajador,
        discount, 
        shipping 
    } = useCartStore();
    
    // Estado del checkout
    const { referralCode } = useCheckoutStore();
    
    // Hook de checkout para completar la compra y navegar al siguiente paso
    const { processCardPayment, proceedToPayment, isSubmitting } = useCheckout();
    
    // Calcular total
    const isAmbassador = !!referralCode; // Simplificado, idealmente esto vendría del store
    const effectiveSubtotal = isAmbassador ? subtotalEmbajador : subtotal;
    const total = effectiveSubtotal + shipping - discount;

    return (
        <div className="bg-gray-50 w-full">
            <div className="w-full max-auto md:max-w-full lg:max-w-md mx-auto space-y-6 pb-6">
                
                {/* Main Checkout Card */}
                <div className="bg-white rounded-2xl p-6 ">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Tu Pedido</h2>
                    
                    {/* Product List */}
                    <div className="space-y-4 mb-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-6 pb-4 border-b border-gray-100 last:border-b-0">
                                {/* Product Image */}
                                <div className="w-15 h-15 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                    {item.images?.[0]?.image_url ? (
                                        <img 
                                            src={item.images[0].image_url} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-gray-400 text-xl">
                                            <FaShoppingCart />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Product Info */}
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 text-left">{item.name}</h3>
                                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                </div>
                                
                                {/* Product Price */}
                                <div className="text-right">
                                    <span className="font-semibold text-gray-900">
                                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ambassador Code */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ingresa un código de Embajador"
                                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Order */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Subtotal:</span>
                            <span className="text-gray-900 font-semibold">$ {subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Envío:</span>
                            <span className="text-gray-900 font-semibold">$ {shipping.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Descuento:</span>
                            <span className="text-gray-900 font-semibold">$ {discount.toFixed(2)}</span>
                        </div>
                        
                        <hr className="border-gray-200 my-4" />
                        
                        <div className="flex justify-between items-center border-b pb-4 text-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Total</h2>
                            <span className="text-2xl font-semibold text-[var(--color-primary)]">
                                $ {total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    {showCompletePurchase ? (
                        <button 
                            className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
                            onClick={processCardPayment}
                            disabled={isSubmitting || items.length === 0}
                        >
                            <span>{isSubmitting ? 'Procesando...' : 'Completar compra'}</span>
                            <RiLock2Line className="text-white" size={18} />
                        </button>
                    ) : (
                        <>
                            <button 
                                className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl cursor-pointer"
                                onClick={proceedToPayment}
                                disabled={items.length === 0 || isSubmitting}
                            >
                                <span>{isSubmitting ? 'Creando orden...' : 'Continuar al pago'}</span>
                                <BiChevronRight className="text-white" size={18} />
                            </button>
                            <p className="text-xs text-gray-500 text-center mt-2">
                                Todos los campos requeridos deben completarse antes de continuar
                            </p>
                        </>
                    )}
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl p-6 my-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <RiLock2Line className="text-gray-400" size={20} />
                        <span className="text-sm text-gray-500 font-medium">Pagos seguros con:</span>
                    </div>
                    
                    <div className="w-full">
                        <PaymentLogos />
                    </div>
                </div>
            </div>
        </div>
    );
}