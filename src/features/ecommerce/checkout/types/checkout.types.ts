import type { ShippingAddress } from '../../shared/types';

/**
 * Datos de pago del cliente
 */
export interface PaymentData {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    email: string;
}

/**
 * Estado del checkout
 */
export interface CheckoutState {
    shippingAddress: ShippingAddress;
    paymentData: PaymentData;
    referralCode: string;
    currentStep: number; // 1: Cart, 2: Shipping, 3: Payment, 4: Confirmation
    isLoading: boolean;
    error: string | null;
    orderComplete: boolean;
    orderId: number | null;
}

/**
 * Acciones del store de checkout
 */
export interface CheckoutActions {
    setShippingAddress: (address: Partial<ShippingAddress>) => void;
    setPaymentData: (payment: Partial<PaymentData>) => void;
    setReferralCode: (code: string) => void;
    setCurrentStep: (step: number) => void;
    resetCheckout: () => void;
    setOrderComplete: (orderId: number) => void;
    setError: (error: string | null) => void;
    setLoading: (isLoading: boolean) => void;
}

/**
 * Store completo de checkout
 */
export type CheckoutStore = CheckoutState & CheckoutActions;
