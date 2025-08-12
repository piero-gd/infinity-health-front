import type { OrderData, PaymentPreferenceResponse, PaymentVerificationResponse } from '../../shared/types';
import { post } from '../../../../services/api';

/**
 * Procesa el pago de una orden ya creada
 * Envía el UUID de la orden al backend para procesar el pago
 */
export async function processPayment(orderUuid: string, paymentMethod: string = 'card'): Promise<PaymentPreferenceResponse> {
    try {
        console.log('=== PROCESSING PAYMENT ===');
        console.log('Order UUID:', orderUuid);
        console.log('Payment Method:', paymentMethod);
        
        const paymentData = {
            order_uuid: orderUuid,
            payment_method: paymentMethod
        };
        
        // Hacer POST al endpoint de procesar pago
        const response = await post<{ redirect_url: string; success: boolean }>('payments/process/', paymentData);
        
        console.log('Payment response:', response);
        
        if (response.success && response.redirect_url) {
            return {
                success: true,
                paymentUrl: response.redirect_url
            };
        } else {
            throw new Error('Invalid payment response from backend');
        }
        
    } catch (error) {
        console.error('Error processing payment:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Error desconocido al procesar el pago'
        };
    }
}

/**
 * Simula la creación de una preferencia de pago en Mercado Pago
 * En un entorno real, esto haría una petición al backend para obtener
 * la URL de pago de Mercado Pago
 * 
 * @deprecated Use processPayment instead
 */
export async function createPaymentPreference(orderData: OrderData): Promise<PaymentPreferenceResponse> {
  // Simular latencia de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // En un entorno real, aquí haríamos un fetch a la API
    // const response = await fetch('/api/orders/', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${getAuthToken()}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(orderData)
    // });
    // const data = await response.json();
    
    console.log('Datos de orden enviados (simulación):', orderData);
    
    // Simular éxito la mayoría de las veces
    if (Math.random() > 0.2) {
      // URL simulada de Mercado Pago
      // En implementación real, el backend devolvería la URL de pago de Mercado Pago
      const simulatedOrderId = Date.now();
      const simulatedPaymentUrl = `/checkout/simulated-payment?order_id=${simulatedOrderId}`;
      
      // En un escenario real, podríamos guardar el ID de orden temporal devuelto por el backend
      localStorage.setItem('tempOrderId', simulatedOrderId.toString());
      
      return {
        success: true,
        paymentUrl: simulatedPaymentUrl
      };
    } else {
      // Simular error ocasional
      return {
        success: false,
        error: "Error al crear preferencia de pago"
      };
    }
  } catch (error) {
    console.error('Error en createPaymentPreference:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido"
    };
  }
}

/**
 * Simula la verificación del estado de un pago usando UUID
 * En un entorno real, esto verificaría con el backend si el pago fue confirmado
 */
export async function verifyPayment(paymentId: string, orderUuid: string): Promise<PaymentVerificationResponse> {
  // Simular latencia de red
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // En un escenario real, verificaríamos con el backend
    // const response = await fetch(`/api/payments/verify?payment_id=${paymentId}&order_uuid=${orderUuid}`);
    // const data = await response.json();
    
    console.log('Verificando pago (simulación):', { paymentId, orderUuid });
    
    // Simular verificación exitosa
    return {
      verified: true,
      order: {
        order_uuid: orderUuid,
        total: 149.99,
        status: 'paid',
        created_at: new Date().toISOString()
      }
    };
    
  } catch (error) {
    return {
      verified: false,
      error: error instanceof Error ? error.message : "Error al verificar el pago"
    };
  }
}
