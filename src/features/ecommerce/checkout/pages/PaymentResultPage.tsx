import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { useCartStore } from '../../cart/stores/useCartStore';
import { verifyPayment } from '../services/paymentService';
import { showToast } from '../../../../utils/toastConfig';
import { createOrder } from '../services/orderService';
import SimpleLoader from '../../../../components/SimpleLoader';

/**
 * Página que maneja el retorno del pago (simulado o real)
 * Se encarga de verificar el estado del pago y actualizar la orden
 */
export default function PaymentResultPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  
  const status = queryParams.get('status');
  const paymentId = queryParams.get('payment_id') || '';
  const orderId = queryParams.get('order_id') || '';
  
  const [isVerifying, setIsVerifying] = useState(true);
  const { setOrderComplete, setError } = useCheckoutStore();
  const { clearCart } = useCartStore();
  
  // Ref para evitar procesamiento duplicado
  const hasProcessedRef = useRef(false);
  
  // Función para limpiar órdenes procesadas antiguas (más de 24 horas)
  const cleanupOldProcessedOrders = () => {
    const oneDay = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    const now = Date.now();
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('processed_order_')) {
        const timestamp = localStorage.getItem(`${key}_timestamp`);
        if (timestamp && (now - parseInt(timestamp)) > oneDay) {
          localStorage.removeItem(key);
          localStorage.removeItem(`${key}_timestamp`);
        }
      }
    });
  };
  
  useEffect(() => {
    // Evitar procesamiento duplicado
    if (hasProcessedRef.current) {
      return;
    }
    
    // Limpiar órdenes procesadas antiguas
    cleanupOldProcessedOrders();
    
    // Validar parámetros necesarios antes de procesar
    if (!status || !paymentId || !orderId) {
      showToast.error('Error', 'Parámetros de pago inválidos');
      navigate('/checkout/payment');
      setIsVerifying(false);
      return;
    }
    
    // Marcar como procesado para evitar duplicados
    hasProcessedRef.current = true;
    
    const processPaymentResult = async () => {
      try {
        // Validar parámetros recibidos (validación adicional por seguridad)
        if (!status || !paymentId || !orderId) {
          throw new Error('Parámetros de pago inválidos');
        }
        
        // Recuperar datos de orden pendiente
        const pendingOrderData = localStorage.getItem('pendingOrderData');
        if (!pendingOrderData) {
          throw new Error('No hay información de orden pendiente');
        }
        
        // Verificar si esta orden ya fue procesada anteriormente
        const processedOrderKey = `processed_order_${orderId}`;
        if (localStorage.getItem(processedOrderKey)) {
          console.log('Orden ya procesada anteriormente, redirigiendo...');
          navigate('/checkout/thankyou');
          return;
        }
        
        const orderData = JSON.parse(pendingOrderData);
        
        if (status === 'success') {
          // Verificar pago con el servicio simulado
          const verificationResult = await verifyPayment(paymentId, orderId);
          
          if (!verificationResult.verified) {
            throw new Error(verificationResult.error || 'Error al verificar el pago');
          }
          
          // En un escenario real, el backend habría creado la orden al recibir la confirmación de Mercado Pago
          // Aquí simulamos la creación de la orden después de verificar el pago
          const response = await createOrder(orderData);
          
          console.log('PaymentResultPage - Orden creada exitosamente');
          
          // Marcar esta orden como procesada para evitar duplicados futuros
          localStorage.setItem(`processed_order_${orderId}`, 'true');
          localStorage.setItem(`processed_order_${orderId}_timestamp`, Date.now().toString());
          
          // MEJOR PRÁCTICA: Validación defensiva del ID de orden
          let finalOrderId: number;
          
          if (response.id && typeof response.id === 'number') {
            // Caso ideal: el backend devuelve el ID correcto
            finalOrderId = response.id;
            console.log('PaymentResultPage - Usando ID del backend:', finalOrderId);
          } else {
            // Fallback: usar el ID de la URL (ambiente de desarrollo/testing)
            finalOrderId = parseInt(orderId);
            console.warn('PaymentResultPage - Backend no devolvió ID válido, usando ID de URL:', finalOrderId);
            
            // En producción, podrías querer loggear este problema
            if (import.meta.env.PROD) {
              console.error('PRODUCTION WARNING: Backend no devolvió order ID válido');
            }
          }
          
          setOrderComplete(finalOrderId);
          clearCart();
          localStorage.removeItem('pendingOrderData');
          localStorage.removeItem('tempOrderId');
          
          // Mostrar mensaje de éxito
          showToast.success('¡Pago completado!', 'Tu orden ha sido procesada con éxito');
          
          // Esperar un momento para que el estado se actualice antes de navegar
          console.log('PaymentResultPage - Navegando a /checkout/thankyou en 200ms...');
          setTimeout(() => {
            navigate('/checkout/thankyou');
          }, 200);
        } else if (status === 'pending') {
          // Manejar pago pendiente
          showToast.warning('Pago pendiente', 'Tu pago está siendo procesado. Te notificaremos cuando se confirme.');
          navigate('/checkout/payment', { state: { paymentPending: true } });
        } else {
          // Manejar pago fallido
          throw new Error('El pago no pudo ser procesado');
        }
      } catch (error) {
        console.error('Error al procesar resultado de pago:', error);
        setError(error instanceof Error ? error.message : 'Error al procesar el pago');
        showToast.error('Error en el pago', 'No se pudo completar la transacción. Por favor intenta nuevamente.');
        navigate('/checkout/payment');
      } finally {
        setIsVerifying(false);
      }
    };
    
    processPaymentResult();
  }, [status, paymentId, orderId]); // Solo dependencias esenciales de los parámetros URL
  
  // Mostrar un indicador de carga mientras se verifica
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <SimpleLoader message="Procesando tu pago..." />
          <p className="text-gray-500 text-center mt-4">Por favor, no cierres esta ventana.</p>
        </div>
      </div>
    );
  }
  
  // Este componente no renderiza nada más porque redirige a otra página
  return null;
}
