import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { useCartStore } from '../../cart/stores/useCartStore';
import { verifyPayment } from '../services/paymentService';
import { showToast } from '../../../../utils/toastConfig';
import { createOrder } from '../services/orderService';

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
  
  useEffect(() => {
    const processPaymentResult = async () => {
      try {
        // Validar parámetros recibidos
        if (!status || !paymentId || !orderId) {
          throw new Error('Parámetros de pago inválidos');
        }
        
        // Recuperar datos de orden pendiente
        const pendingOrderData = localStorage.getItem('pendingOrderData');
        if (!pendingOrderData) {
          throw new Error('No hay información de orden pendiente');
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
          
          // Actualizar estado
          setOrderComplete(response.id);
          clearCart();
          localStorage.removeItem('pendingOrderData');
          localStorage.removeItem('tempOrderId');
          
          // Mostrar mensaje de éxito
          showToast.success('¡Pago completado!', 'Tu orden ha sido procesada con éxito');
          
          // Redirigir a confirmación
          navigate('/checkout/confirmation');
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
  }, [status, paymentId, orderId, navigate, setOrderComplete, clearCart, setError]);
  
  // Mostrar un indicador de carga mientras se verifica
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mb-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="text-xl font-medium text-gray-700">Procesando tu pago...</h2>
          <p className="text-gray-500 mt-2">Por favor, no cierres esta ventana.</p>
        </div>
      </div>
    );
  }
  
  // Este componente no renderiza nada más porque redirige a otra página
  return null;
}
