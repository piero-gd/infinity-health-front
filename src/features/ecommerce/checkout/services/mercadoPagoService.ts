import type { PaymentPreferenceResponse, PaymentVerificationResponse } from '../../shared/types';
import { post, get } from '../../../../services/api';

/**
 * Procesa el pago con tarjeta de crédito/débito usando MercadoPago
 * Envía el UUID de la orden al backend que maneja la integración con MP
 * 
 * @param orderUuid - UUID de la orden previamente creada
 * @param paymentMethod - Método de pago (default: 'card')
 * @returns Promise con la URL de MercadoPago para completar el pago
 */
export async function processMercadoPagoPayment(orderUuid: string, paymentMethod: string = 'card'): Promise<PaymentPreferenceResponse> {
    try {
        console.log('=== PROCESSING PAYMENT ===');
        console.log('Order UUID:', orderUuid);
        console.log('Payment Method:', paymentMethod);
        
        const paymentData = {
            order_uuid: orderUuid,
            payment_method: paymentMethod,
            // URLs de retorno para MercadoPago
            success_url: `${window.location.origin}/payments/mp/${orderUuid}/success`,
            failure_url: `${window.location.origin}/payments/mp/${orderUuid}/failure`,
            pending_url: `${window.location.origin}/payments/mp/${orderUuid}/pending`
        };
        
        // Hacer POST al endpoint de MercadoPago
        const response = await post<{ init_point: string; id: string }>('payments/mp/', paymentData);
        
        console.log('Payment response:', response);
        
        if (response.init_point && response.id) {
            return {
                success: true,
                paymentUrl: response.init_point
            };
        } else {
            throw new Error('Invalid payment response from backend - missing init_point or id');
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
 * Obtiene la información completa de una orden desde el backend
 * 
 * @param orderUuid - UUID de la orden
 * @returns Promise con la información de la orden
 */
export async function getOrderInfo(orderUuid: string): Promise<any> {
    try {
        console.log('=== GETTING ORDER INFO ===');
        console.log('Order UUID:', orderUuid);
        
        const response = await get(`payments/mp/${orderUuid}/`);
        
        console.log('Order info response:', response);
        
        return response;
        
    } catch (error) {
        console.error('Error getting order info:', error);
        throw new Error(error instanceof Error ? error.message : 'Error al obtener información de la orden');
    }
}

/**
 * Verifica el estado de un pago procesado con MercadoPago usando UUID
 * En un entorno real, esto verificaría con el backend si el pago fue confirmado
 */
export async function verifyMercadoPagoPayment(paymentId: string, orderUuid: string): Promise<PaymentVerificationResponse> {
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
