import { useCheckoutStore } from '../../stores/useCheckoutStore';
import { useCartStore } from '../../../cart/stores/useCartStore';

export default function Header() {
    const { orderId } = useCheckoutStore();
    const { subtotal, shipping, discount } = useCartStore();
    
    // Calcular total
    const total = subtotal + shipping - discount;
    
    // Obtener fecha actual
    const currentDate = new Date().toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Función para obtener el orderId (del store o del localStorage)
    const getOrderId = () => {
        if (orderId) return orderId;
        
        // Buscar en localStorage si no hay en el store
        const recentOrderKeys = Object.keys(localStorage).filter(key => 
            key.startsWith('processed_order_') && !key.endsWith('_timestamp')
        );
        
        if (recentOrderKeys.length > 0) {
            const latestOrderKey = recentOrderKeys[recentOrderKeys.length - 1];
            return latestOrderKey.replace('processed_order_', '');
        }
        
        return 'No disponible';
    };

    return (
        <div className="rounded-3xl overflow-hidden w-full">
            <div className="py-8 flex flex-col items-center">
                <img 
                    src="img/Icono exito.svg" 
                    alt="Icono exito" 
                    className="w-48 h-48"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">¡¡Gracias!!</h2>
                <p className="text-gray-600">Tu pedido ha sido recibido</p>
            </div>
            
            <div className="px-0 pb-4 mt-4">
                <div className="bg-white rounded-2xl shadow-sm grid grid-cols-2 xl:grid-cols-4 w-full">
                    <div className="p-5 border-b border-dashed border-gray-300 xl:border-b-0 xl:border-r">
                        <p className="font-semibold text-gray-700 text-sm">N° de pedido:</p>
                        <p className="text-gray-600">{getOrderId()}</p>
                    </div>
                    <div className="p-5 border-b border-dashed border-gray-300 xl:border-b-0 xl:border-r">
                        <p className="font-semibold text-gray-700 text-sm">Fecha:</p>
                        <p className="text-gray-600">{currentDate}</p>
                    </div>
                    <div className="p-5 border-dashed border-gray-300 xl:border-b-0 xl:border-r">
                        <p className="font-semibold text-gray-700 text-sm">Total:</p>
                        <p className="text-gray-600">${total.toFixed(2)}</p>
                    </div>
                    <div className="p-5">
                        <p className="font-semibold text-gray-700 text-sm">Método de pago:</p>
                        <p className="text-gray-600">Tarjeta de Crédito/Débito</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
