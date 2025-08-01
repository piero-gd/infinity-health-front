import { post } from '../../../../services/api';
import type { CartProduct } from '../../shared/types/product.model';

export interface OrderItem {
    product: number;
    quantity: number;
    specification?: number;
}

export interface ShippingAddress {
    address: string;
    city: string;              // Para Lima: ciudad de entrega
    state: string;             // Para Lima: departamento/región
    phone: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    documentType?: string;
    documentNumber?: string;
    companyName?: string;
    ruc?: string;
    invoiceType?: 'boleta' | 'factura';
    deliveryOption?: 'lima' | 'shalom' | 'capital';
    
    // Campos específicos para Agencia Shalom
    shalomDepartment?: string; // Departamento para agencia Shalom
    shalomAgency?: string;     // Agencia específica Shalom
    
    // Campo específico para Capital Infinity
    capitalBranch?: string;    // Sede de Capital Infinity
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
        const response = await post<OrderResponse>('orders/', orderData);
        return response;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}
