import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import ProgressCart from '../../cart/components/ProgressCart';
import { useCheckoutStore } from '../stores/useCheckoutStore';

export default function ConfirmationPage() {
    const navigate = useNavigate();
    const { orderComplete, orderId, currentStep, resetCheckout } = useCheckoutStore();
    
    // Redirigir si no se ha completado una orden
    useEffect(() => {
        if (!orderComplete || !orderId) {
            navigate('/cart');
        }
    }, [orderComplete, orderId, navigate]);

    // Función para volver a la tienda
    const handleBackToStore = () => {
        resetCheckout();
        navigate('/');
    };

    return (
        <div className="mx-auto max-w-7xl">
            <div className="pt-12">
                <ProgressCart currentStep={4} />
            </div>
            
            <div className="flex flex-col items-center justify-center py-12 px-6 xl:px-0">
                <div className="bg-white rounded-3xl p-8 md:p-12 max-w-3xl w-full text-center shadow-md">
                    <div className="flex justify-center">
                        <FaCheckCircle className="text-green-500 text-6xl mb-6" />
                    </div>
                    
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        ¡Tu orden ha sido confirmada!
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-6">
                        Gracias por tu compra. Hemos enviado un correo electrónico con los detalles de tu pedido.
                    </p>
                    
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <div className="text-left">
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Número de orden:</span> #{orderId}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">Estado:</span> Procesando
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button
                            onClick={handleBackToStore}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                        >
                            Volver a la tienda
                        </button>
                        
                        <button
                            onClick={() => navigate('/account/orders')}
                            className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 py-3 px-6 rounded-lg font-medium transition-colors duration-200"
                        >
                            Ver mis pedidos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
