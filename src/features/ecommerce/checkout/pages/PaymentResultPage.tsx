import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { useCartStore } from '../../cart/stores/useCartStore';
import { verifyPayment } from '../services/paymentService';
import { showToast } from '../../../../utils/toastConfig';
import SimpleLoader from '../../../../components/SimpleLoader';

/**
 * Página que maneja el retorno del pago (usando UUID)
 * Se encarga de verificar el estado del pago y actualizar la orden
 */
export default function PaymentResultPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  
  const status = queryParams.get('status');
  const paymentId = queryParams.get('payment_id') || '';
  const orderUuid = queryParams.get('order_uuid') || queryParams.get('order_id') || ''; // Backward compatibility
  
  const [isVerifying, setIsVerifying] = useState(true);
  const { setOrderComplete, setError } = useCheckoutStore();
  const { clearCart } = useCartStore();
  
  // Ref para evitar procesamiento duplicado
  const hasProcessedRef = useRef(false);
  
  // Función para limpiar órdenes procesadas antiguas (más de 24 horas)
  const cleanupOldProcessedOrders = () => {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;
      
      keys.forEach(key => {
        if (key.endsWith('_timestamp')) {
          const timestamp = parseInt(localStorage.getItem(key) || '0');
          if (now - timestamp > dayInMs) {
            // Eliminar tanto el timestamp como la orden procesada
            localStorage.removeItem(key);
            const orderKey = key.replace('_timestamp', '');
            localStorage.removeItem(orderKey);
            console.log('Orden antigua eliminada:', orderKey);
          }
        }
      });
    } catch (error) {
      console.error('Error limpiando órdenes antiguas:', error);
    }
  };

  useEffect(() => {
    console.log('PaymentResultPage - useEffect ejecutado');
    console.log('Parámetros:', { status, paymentId, orderUuid });
    
    // Prevenir ejecuciones múltiples
    if (hasProcessedRef.current) {
      return;
    }
    
    // Validar parámetros requeridos
    if (!status || !orderUuid) {
      console.error('PaymentResultPage - Faltan parámetros requeridos:', { status, orderUuid });
      setError('Faltan parámetros en la URL de retorno del pago');
      navigate('/cart');
      return;
    }

    // Limpiar órdenes procesadas antiguas
    cleanupOldProcessedOrders();
    
    // Marcar como procesado para evitar duplicados
    hasProcessedRef.current = true;

    const processPaymentResult = async () => {
      try {
        // Verificar si esta orden ya fue procesada anteriormente
        const processedOrderKey = `processed_order_${orderUuid}`;
        if (localStorage.getItem(processedOrderKey) === 'true') {
          console.log('PaymentResultPage - Orden ya procesada previamente:', orderUuid);
          setIsVerifying(false);
          navigate('/checkout/thank-you');
          return;
        }

        if (status === 'success') {
          console.log('PaymentResultPage - Verificando pago exitoso...');
          
          // Verificar el pago con el backend (si tienes paymentId)
          if (paymentId) {
            const verificationResult = await verifyPayment(paymentId, orderUuid);
            
            if (!verificationResult.verified) {
              throw new Error(verificationResult.error || 'No se pudo verificar el pago');
            }
          }
          
          console.log('PaymentResultPage - Pago verificado exitosamente');
          
          // Limpiar el carrito
          clearCart();
          console.log('PaymentResultPage - Carrito limpiado');
          
          // Marcar orden como completada usando UUID
          setOrderComplete(orderUuid);
          console.log('PaymentResultPage - Orden marcada como completada:', orderUuid);
          
          // Marcar esta orden como procesada para evitar duplicados futuros
          localStorage.setItem(`processed_order_${orderUuid}`, 'true');
          localStorage.setItem(`processed_order_${orderUuid}_timestamp`, Date.now().toString());
          
          console.log('PaymentResultPage - Orden procesada exitosamente');
          
          // Mostrar mensaje de éxito
          showToast.success('¡Pago exitoso!', 'Tu orden ha sido procesada correctamente');
          
          // Navegar a página de éxito
          setIsVerifying(false);
          navigate('/checkout/thank-you');
          
        } else if (status === 'failure' || status === 'error') {
          // Pago fallido
          console.log('PaymentResultPage - Pago falló o fue cancelado');
          setError('El pago no se pudo completar');
          showToast.error('Pago fallido', 'El pago no se pudo completar. Puedes intentarlo nuevamente.');
          setIsVerifying(false);
          
          // Redirigir a página de pago después de un delay
          setTimeout(() => {
            navigate('/checkout/payment');
          }, 3000);
          
        } else {
          // Estado desconocido
          console.error('PaymentResultPage - Estado de pago desconocido:', status);
          setError('Estado de pago desconocido');
          showToast.error('Error', 'Estado de pago no reconocido');
          setIsVerifying(false);
          
          // Redirigir al carrito después de un delay
          setTimeout(() => {
            navigate('/cart');
          }, 3000);
        }
        
      } catch (error) {
        console.error('PaymentResultPage - Error general:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al procesar el resultado del pago';
        setError(errorMessage);
        showToast.error('Error', errorMessage);
        setIsVerifying(false);
        
        // Redirigir al carrito después de un delay
        setTimeout(() => {
          navigate('/cart');
        }, 3000);
      }
    };

    processPaymentResult();

  }, [status, paymentId, orderUuid, navigate, setError, setOrderComplete, clearCart]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <SimpleLoader />
          <h2 className="mt-4 text-xl font-medium text-gray-700">
            Verificando el pago...
          </h2>
          <p className="mt-2 text-gray-500">
            Por favor espera mientras procesamos tu transacción
          </p>
        </div>
      </div>
    );
  }

  // Si llegamos aquí, hubo un error
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Error en el procesamiento
        </h2>
        <p className="text-gray-600 mb-4">
          Hubo un problema al procesar tu pago. Serás redirigido en unos momentos.
        </p>
        <button
          onClick={() => navigate('/cart')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Volver al carrito
        </button>
      </div>
    </div>
  );
}
