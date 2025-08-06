import { post } from '../../../../services/api';
import type { OrderItem, OrderData, OrderResponse } from '../../shared/types';
import type { CartProduct } from '../../cart/types';

/**
 * Transforma los productos del carrito al formato que espera la API
 */
export function mapCartItemsToOrderItems(items: CartProduct[]): OrderItem[] {
    return items.map(item => ({
        product: item.id,
        quantity: item.quantity,
        // Si el producto tiene especificaciones, usar la primera (se podría mejorar para seleccionar una específica)
        ...(item.specifications && item.specifications.length > 0 && {
            specification: item.specifications[0].id
        })
    }));
}

/**
 * Crea una nueva orden en el backend
 */
export async function createOrder(orderData: OrderData): Promise<OrderResponse> {
    try {
        // Formatear los datos de envío según el método de envío
        if (orderData.shipping_address) {
            const { deliveryOption } = orderData.shipping_address;
            let method_shipping: 'envio_puerta' | 'recojo_oficina' | 'recojo_shalom' = 'envio_puerta';
            
            // Establecer el método de envío según la opción seleccionada
            switch (deliveryOption) {
                case 'lima':
                    method_shipping = 'envio_puerta';
                    // Asegurar que los campos de dirección estén presentes para envío a puerta
                    orderData.shipping_address = {
                        ...orderData.shipping_address,
                        method_shipping
                    };
                    break;
                case 'capital':
                    method_shipping = 'recojo_oficina';
                    // Para recojo en oficina, establecer address y state en null
                    orderData.shipping_address = {
                        ...orderData.shipping_address,
                        method_shipping,
                        address: null,
                        state: null,
                        city: orderData.shipping_address.capitalBranch || null
                    };
                    break;
                case 'shalom':
                    method_shipping = 'recojo_shalom';
                    // Para recojo en Shalom, establecer address, city y state en null
                    orderData.shipping_address = {
                        ...orderData.shipping_address,
                        method_shipping,
                        address: null,
                        city: null,
                        state: null
                    };
                    break;
                default:
                    // Por defecto, usamos envío a puerta
                    orderData.shipping_address.method_shipping = 'envio_puerta';
            }
        }
        
        const response = await post<OrderResponse>('orders/', orderData);
        return response;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}
