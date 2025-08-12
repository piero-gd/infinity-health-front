/**
 * Order-related types and interfaces
 * Consolidated from checkout services and types
 */

// Order item for API requests
export interface OrderItem {
    product: number;
    quantity: number;
    specification?: number;
}

// Shipping address information
export interface ShippingAddress {
    address: string | null;
    city: string | null;
    state: string | null;
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
    method_shipping?: 'envio_puerta' | 'recojo_oficina' | 'recojo_shalom';
    
    // Frontend-only fields for UI state
    shalomDepartment?: string;
    shalomAgency?: string;
    capitalBranch?: string;
}

// Order data for API requests
export interface OrderData {
    items: OrderItem[];
    shipping_address?: ShippingAddress;
    referral_code?: string;
}

// Order response from API
export interface OrderResponse {
    order_uuid: string;
    status?: string;
    total?: string;
    created_at?: string;
}

// Payment-related types
export interface PaymentPreferenceResponse {
    success: boolean;
    paymentUrl?: string;
    error?: string;
}

export interface PaymentVerificationResponse {
    verified: boolean;
    order?: {
        order_uuid: string;
        total: number;
        status: string;
        created_at: string;
    };
    error?: string;
}
