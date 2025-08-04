import { post } from '../../../../services/api';
import type { CartProduct } from '../../shared/types/product.model';

export interface OrderItem {
    product: number;
    quantity: number;
    specification?: number;
}

export interface ShippingAddress {
    address: string | null;    // Dirección para entrega a domicilio, puede ser null para recojo
    city: string | null;       // Ciudad para entrega a domicilio o sede de recojo 
    state: string | null;      // Departamento/región para entrega a domicilio
    phone: string;             // Teléfono siempre es requerido
    firstName?: string;
    lastName?: string;
    email?: string;
    documentType?: string;
    documentNumber?: string;
    companyName?: string;
    ruc?: string;
    invoiceType?: 'boleta' | 'factura';
    deliveryOption?: 'lima' | 'shalom' | 'capital';
    method_shipping?: 'envio_puerta' | 'recojo_oficina' | 'recojo_shalom';
    
    // Campos específicos para Agencia Shalom - solo usados internamente en el frontend
    shalomDepartment?: string;
    shalomAgency?: string;
    
    // Campo específico para Capital Infinity - solo usado internamente en el frontend
    capitalBranch?: string;
}

export interface OrderData {
    items: OrderItem[];
    shipping_address?: ShippingAddress;
    referral_code?: string;
}

export interface OrderResponse {
    id: number;
    status: string;
    total: string;
    created_at: string;
    items: OrderItem[];
    shipping_address?: ShippingAddress;
}

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
