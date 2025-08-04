import type { ShippingAddress } from './orderService';

export interface OrderItem {
  product: number;
  quantity: number;
  specification?: number;
}

export interface OrderData {
  items: OrderItem[];
  shipping_address?: ShippingAddress;
  referral_code?: string;
}

/**
 * Simula la creación de una preferencia de pago en Mercado Pago
 * En un entorno real, esto haría una petición al backend para obtener
 * la URL de pago de Mercado Pago
 */
export async function createPaymentPreference(orderData: OrderData): Promise<{
  success: boolean;
  paymentUrl?: string;
  error?: string;
}> {
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
 * Simula la verificación del estado de un pago
 * En un entorno real, esto verificaría con el backend si el pago fue confirmado
 */
export async function verifyPayment(paymentId: string, orderId: string): Promise<{
  verified: boolean;
  order?: {
    id: number;
    total: number;
    status: string;
    created_at: string;
  };
  error?: string;
}> {
  // Simular latencia de red
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // En un escenario real, verificaríamos con el backend
    // const response = await fetch(`/api/payments/verify?payment_id=${paymentId}&order_id=${orderId}`);
    // const data = await response.json();
    
    console.log('Verificando pago (simulación):', { paymentId, orderId });
    
    // Simular verificación exitosa
    return {
      verified: true,
      order: {
        id: parseInt(orderId),
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
