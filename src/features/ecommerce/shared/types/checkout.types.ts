/**
 * Checkout-related types and interfaces
 * Consolidated and standardized to English
 */

import type { ShippingAddress } from './order.types';

// Payment data for forms
export interface PaymentData {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
    email: string;
}

// Billing details (standardized to English)
export interface BillingDetails {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    invoiceType: string;
    documentType: string;
    documentNumber: string;
    ruc: string;
    companyName: string;
    deliveryDocumentType: string;
}

// Legacy type for backward compatibility (consider deprecating)
export interface PaymentInfoType {
    nombre: string;
    apellidos: string;
    telefono: string;
    correo: string;
    tipoComprobante: string;
    tipoDocumento: string;
    numeroDocumento: string;
    ruc: string;
    razonSocial: string;
    tipoDocumentoEntrega: string;
}

// Dropdown state management
export interface DropdownState {
    invoiceType: boolean;
    documentType: boolean;
    deliveryDocumentType: boolean;
}

// Legacy dropdown type (consider deprecating)
export interface DropdownType {
    tipoComprobante: boolean;
    tipoDocumento: boolean;
    tipoDocumentoEntrega: boolean;
}

// Checkout state
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

// Checkout actions
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

// Complete checkout store type
export type CheckoutStore = CheckoutState & CheckoutActions;

// Delivery calculation types
export interface PlacesCalculation {
    option: string;
    place: string;
    days: string;
    description: string;
}

export interface DetailedPlace {
    option: PlacesCalculation[];
    detailedplace: string[];
    address: string;
    locals: string;
}

export interface OptionPlaceFeatures {
    option: PlacesCalculation[];
    detailedplace: DetailedPlace[];
    departament: string;
    province: string;
    district: string;
    address: string;
    apartment: string;
    reference: string;
}
