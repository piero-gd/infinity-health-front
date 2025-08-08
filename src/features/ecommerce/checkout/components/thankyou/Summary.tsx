import { useCartStore } from '../../../cart/stores/useCartStore';
import { useCheckoutStore } from '../../stores/useCheckoutStore';
import { FaShoppingCart } from 'react-icons/fa';

export default function Summary() {
    const { items, subtotal, shipping, discount } = useCartStore();
    const { referralCode } = useCheckoutStore();
    
    // Calcular total
    const total = subtotal + shipping - discount;
    
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h1 className="text-xl font-bold mb-4 text-gray-800">Resumen del pedido</h1>
            
            {/* Product List */}
            <div className="space-y-4 mb-6">
                {/* Header */}
                <div className="flex justify-between pb-2 border-b border-gray-400">
                    <span className="font-semibold text-gray-700">Productos</span>
                    <span className="font-semibold text-gray-700">Subtotal: ${subtotal.toFixed(2)}</span>
                </div>
                
                {/* Product Items */}
                <div className="space-y-3">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="flex justify-between pb-4 border-b border-dashed items-center border-gray-300 last:border-b-0">
                                <div className="flex items-center">
                                    <div className="border border-gray-200 p-2 rounded-lg">
                                        {item.images?.[0]?.image_url ? (
                                            <img 
                                                src={item.images[0].image_url} 
                                                className="w-16 h-16 object-cover rounded" 
                                                alt={item.name}
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                                                <FaShoppingCart className="text-gray-400 text-xl" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <span className="text-black font-medium">{item.name}</span>
                                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="font-medium">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            <FaShoppingCart className="mx-auto text-4xl mb-2" />
                            <p>No hay productos en la orden</p>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Summary */}
            <div className="space-y-1 border-t border-black pt-2">
                <div className="flex justify-between">
                    <span className="text-black">Subtotal:</span>
                    <span className="text-black font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-black">Envío:</span>
                    <span className="text-black font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-black">Descuento:</span>
                    <span className="text-black font-semibold">-${discount.toFixed(2)}</span>
                </div>
                {referralCode && (
                    <div className="flex justify-between text-green-600">
                        <span className="text-sm">Código embajador ({referralCode}):</span>
                        <span className="text-sm font-semibold">Aplicado</span>
                    </div>
                )}
                <div className="flex justify-between pt-4 mt-2 border-t border-black">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-xl text-[var(--color-primary)]">${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
