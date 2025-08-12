import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { showToast } from '../../../../utils/toastConfig';

/**
 * Página que simula el entorno de pago de Mercado Pago
 * En un escenario real, el usuario sería redirigido a Mercado Pago
 */
export default function SimulatedPaymentPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderUuid = queryParams.get('order_uuid') || queryParams.get('order_id') || ''; // Backward compatibility
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // Si no hay order_uuid en la URL, redirigir al checkout
    if (!orderUuid) {
      showToast.error('Error', 'Información de orden no válida');
      navigate('/checkout/payment');
    }
  }, [orderUuid, navigate]);
  
  /**
   * Maneja la selección de resultado de pago y redirige a la URL correspondiente
   */
  const handlePaymentResult = async (status: 'success' | 'failure' | 'pending') => {
    setIsProcessing(true);
    
    try {
      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generar un payment_id simulado
      const simulatedPaymentId = `sim_${Date.now()}`;
      
      // Redirigir a la página de resultado con los parámetros que enviaría Mercado Pago
      navigate(`/checkout/payment-result?status=${status}&payment_id=${simulatedPaymentId}&order_uuid=${orderUuid}`);
      
    } catch (error) {
      console.error('Error al procesar resultado:', error);
      showToast.error('Error', 'No se pudo procesar la solicitud');
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="mx-auto max-w-3xl py-16 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-md">
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/img/payInfinity.svg" 
            alt="Infinity Pay" 
            className="h-12 mr-2" 
          />
          <span className="text-2xl font-bold">Simulador de Pago</span>
        </div>
        
        <div className="mb-8 p-4 bg-blue-50 rounded-xl">
          <h2 className="text-lg font-medium mb-2 text-blue-800">Información</h2>
          <p className="text-sm text-blue-600">
            Esta es una simulación del proceso de pago. En un entorno real, serías redirigido a la 
            plataforma de Mercado Pago para completar el pago con tus datos de tarjeta.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Selecciona un resultado de pago:</h3>
          
          <div className="flex flex-col gap-4">
            <button 
              className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-medium transition-colors cursor-pointer"
              onClick={() => handlePaymentResult('success')}
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando...' : 'Simular Pago Exitoso'}
            </button>
            
            <button 
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-xl font-medium transition-colors cursor-pointer"
              onClick={() => handlePaymentResult('pending')}
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando...' : 'Simular Pago Pendiente'}
            </button>
            
            <button 
              className="bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-medium transition-colors cursor-pointer"
              onClick={() => handlePaymentResult('failure')}
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando...' : 'Simular Pago Fallido'}
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <button
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={() => navigate('/checkout/payment')}
            disabled={isProcessing}
          >
            Cancelar y volver al checkout
          </button>
        </div>
      </div>
    </div>
  );
}
