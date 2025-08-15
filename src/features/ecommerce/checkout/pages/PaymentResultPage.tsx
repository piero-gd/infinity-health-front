import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { useCartStore } from '../../cart/stores/useCartStore';
import { verifyMercadoPagoPayment, getOrderInfo } from '../services/mercadoPagoService';
import { showToast } from '../../../../utils/toastConfig';
import SimpleLoader from '../../../../components/SimpleLoader';

/**
 * Página que maneja el retorno del pago (usando UUID)
 * Se encarga de verificar el estado del pago y actualizar la orden
 * Soporta tanto la ruta legacy como la nueva ruta /payments/mp/{order_uuid}/success
 */
export default function PaymentResultPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(search);
  
  // Obtener orderUuid desde la URL params o query params (compatibilidad)
  const orderUuidFromParams = params.order_uuid;
  const orderUuidFromQuery = queryParams.get('order_uuid') || queryParams.get('order_id') || '';
  const orderUuid = orderUuidFromParams || orderUuidFromQuery;
  
  // Determinar el status desde la URL o query params
  const pathStatus = window.location.pathname.includes('/success') ? 'success' 
                  : window.location.pathname.includes('/failure') ? 'failure'
                  : window.location.pathname.includes('/pending') ? 'pending'
                  : null;
  const status = queryParams.get('status') || pathStatus || '';
  const paymentId = queryParams.get('payment_id') || '';
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
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
          
          // Obtener información completa de la orden desde el backend
          try {
            const orderData = await getOrderInfo(orderUuid);
            setOrderInfo(orderData);
            console.log('PaymentResultPage - Información de orden obtenida:', orderData);
          } catch (error) {
            console.error('PaymentResultPage - Error al obtener información de la orden:', error);
            // Continuar con el flujo aunque falle la obtención de información
          }
          
          // Verificar el pago con el backend (si tienes paymentId)
          if (paymentId) {
            const verificationResult = await verifyMercadoPagoPayment(paymentId, orderUuid);
            
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
          
          // Si llegamos desde la nueva ruta /payments/mp/{order_uuid}/success, 
          // mostrar información aquí en lugar de redirigir
          if (orderUuidFromParams) {
            setPaymentSuccess(true);
            setIsVerifying(false);
          } else {
            // Ruta legacy: redirigir a thank you
            setIsVerifying(false);
            navigate('/checkout/thank-you');
          }
          
        } else if (status === 'failure' || status === 'error') {
          // Pago fallido
          console.log('PaymentResultPage - Pago falló o fue cancelado');
          setError('El pago no se pudo completar');
          showToast.error('Pago fallido', 'El pago no se pudo completar. Puedes intentarlo nuevamente.');
          setIsVerifying(false);
          
          // Redirección manual removida para debugging
          
        } else {
          // Estado desconocido
          console.error('PaymentResultPage - Estado de pago desconocido:', status);
          setError('Estado de pago desconocido');
          showToast.error('Error', 'Estado de pago no reconocido');
          setIsVerifying(false);
          
          // Redirección manual removida para debugging
        }
        
      } catch (error) {
        console.error('PaymentResultPage - Error general:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido al procesar el resultado del pago';
        setError(errorMessage);
        showToast.error('Error', errorMessage);
        setIsVerifying(false);
        
        // Redirección manual removida para debugging
      }
    };

    processPaymentResult();

  }, [status, paymentId, orderUuid, navigate, setError, setOrderComplete, clearCart]);

  // Si el pago fue exitoso y tenemos información de la orden, mostrar detalles
  if (paymentSuccess && orderInfo) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Header de éxito */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                ¡Pago Exitoso!
              </h1>
              <p className="text-lg text-gray-600">
                Tu compra ha sido procesada correctamente
              </p>
            </div>

            {/* Información de la orden */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Detalles de tu orden
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">N° de Orden</p>
                  <p className="text-lg font-mono text-gray-900">{orderUuid}</p>
                </div>
                
                {orderInfo.total && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Pagado</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${typeof orderInfo.total === 'number' ? orderInfo.total.toFixed(2) : orderInfo.total}
                    </p>
                  </div>
                )}
                
                {orderInfo.created_at && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fecha de Compra</p>
                    <p className="text-lg text-gray-900">
                      {new Date(orderInfo.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
                
                {orderInfo.status && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Estado</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {orderInfo.status === 'paid' ? 'Pagado' : orderInfo.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Productos si están disponibles */}
              {orderInfo.items && orderInfo.items.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Productos</h3>
                  <div className="space-y-4">
                    {orderInfo.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">{item.name || item.title}</p>
                          {item.quantity && <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>}
                        </div>
                        {item.price && (
                          <p className="font-medium text-gray-900">${item.price}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/catalog')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Continuar Comprando
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error en el procesamiento
          </h2>
          <p className="text-gray-600 mb-4">
            Hubo un problema al procesar tu pago. Revisa los detalles a continuación.
          </p>
        </div>

        {/* Información de debug */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Información de Debug:</h3>
          <div className="space-y-2 text-sm">
            <div><strong>URL Actual:</strong> {window.location.href}</div>
            <div><strong>Status:</strong> {status || 'N/A'}</div>
            <div><strong>Order UUID:</strong> {orderUuid || 'N/A'}</div>
            <div><strong>Payment ID:</strong> {paymentId || 'N/A'}</div>
            <div><strong>UUID desde Params:</strong> {orderUuidFromParams || 'N/A'}</div>
            <div><strong>UUID desde Query:</strong> {orderUuidFromQuery || 'N/A'}</div>
            <div><strong>Error del Store:</strong> {useCheckoutStore.getState().error || 'N/A'}</div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/cart')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Volver al carrito
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Recargar página
          </button>
          <button
            onClick={() => {
              console.log('=== DEBUG INFO ===');
              console.log('Status:', status);
              console.log('Order UUID:', orderUuid);
              console.log('Payment ID:', paymentId);
              console.log('URL:', window.location.href);
              console.log('Checkout Store State:', useCheckoutStore.getState());
            }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Log Debug Info
          </button>
        </div>
      </div>
    </div>
  );
}
