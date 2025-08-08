import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import Header from '../components/thankyou/Header';
import Summary from '../components/thankyou/Summary';
import InfoDetail from '../components/thankyou/InfoDetail';
import Advice from '../components/thankyou/Advice';

export default function ThankYouPage() {
    const navigate = useNavigate();
    const { orderComplete, orderId, resetCheckout } = useCheckoutStore();
    const [isValidating, setIsValidating] = useState(true);
    const [hasValidOrder, setHasValidOrder] = useState(false);
    
    // Validar que la orden esté completa antes de mostrar la página
    useEffect(() => {
        const validateOrder = async () => {
            console.log('ThankYouPage - Validando orden...');
            console.log('orderComplete:', orderComplete);
            console.log('orderId:', orderId);
            
            // Esperar un momento para que el estado se actualice
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Verificar si tenemos una orden completa en el store
            if (orderComplete && orderId) {
                console.log('ThankYouPage - Orden válida encontrada en store');
                setHasValidOrder(true);
                setIsValidating(false);
                return;
            }
            
            // Verificar si hay una orden procesada recientemente en localStorage
            const recentOrderKeys = Object.keys(localStorage).filter(key => 
                key.startsWith('processed_order_') && !key.endsWith('_timestamp')
            );
            
            console.log('ThankYouPage - Órdenes en localStorage:', recentOrderKeys);
            
            if (recentOrderKeys.length > 0) {
                // Encontramos una orden procesada recientemente
                const latestOrderKey = recentOrderKeys[recentOrderKeys.length - 1];
                const orderId = latestOrderKey.replace('processed_order_', '');
                console.log('ThankYouPage - Orden encontrada en localStorage:', orderId);
                setHasValidOrder(true);
                setIsValidating(false);
                return;
            }
            
            // Si no hay ninguna orden válida, redirigir al carrito
            console.log('ThankYouPage - No se encontró orden válida, redirigiendo al carrito');
            navigate('/cart');
        };
        
        validateOrder();
    }, [orderComplete, orderId, navigate]);
    
    // Función para volver a la tienda
    const handleBackToStore = () => {
        resetCheckout();
        navigate('/catalog');
    };

    // Si estamos validando, mostrar spinner
    if (isValidating) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-6">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mb-4" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h2 className="text-xl font-medium text-gray-700">Cargando información de tu pedido...</h2>
                </div>
            </div>
        );
    }

    // Si no hay orden válida, no renderizar nada (se redirigirá)
    if (!hasValidOrder) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-[1000px] mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <Header />
                </div>
                
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Summary */}
                    <div className="w-full">
                        <Summary />
                    </div>
                    
                    {/* Right Side - Info Detail */}
                    <div className="w-full">
                        <InfoDetail />
                    </div>
                </div>
                
                {/* Bottom Advice */}
                <div className="mt-4">
                    <Advice />
                </div>
                
                {/* Navigation buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                    <button
                        onClick={handleBackToStore}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                    >
                        Continuar comprando
                    </button>
                    
                    <button
                        onClick={() => navigate('/profile')}
                        className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 py-3 px-6 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                    >
                        Ver mis pedidos
                    </button>
                </div>
            </div>
        </div>
    );
}
