import { create } from 'zustand';
import type { CheckoutStore } from '../../shared/types';

/**
 * Store para manejar el estado del checkout
 * Almacena información de envío, pago y control de flujo
 */
export const useCheckoutStore = create<CheckoutStore>((set) => ({
    // Estado inicial
    shippingAddress: {
        address: '',
        city: '',
        state: '',
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        documentType: '',
        documentNumber: '',
        companyName: '',
        ruc: '',
        invoiceType: undefined,
        deliveryOption: undefined,
        method_shipping: undefined,
        shalomDepartment: '',
        shalomAgency: '',
        capitalBranch: ''
    },
    paymentData: {
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        email: ''
    },
    referralCode: '',
    currentStep: 1, // 1: Cart, 2: Shipping, 3: Payment, 4: Confirmation
    isLoading: false,
    error: null,
    orderComplete: false,
    orderId: null,

    // Acciones
    setShippingAddress: (address) => set((state) => ({
        shippingAddress: { ...state.shippingAddress, ...address }
    })),

    setPaymentData: (payment) => set((state) => ({
        paymentData: { ...state.paymentData, ...payment }
    })),

    setReferralCode: (code) => set({ referralCode: code }),

    setCurrentStep: (step) => set({ currentStep: step }),

    resetCheckout: () => set({
        shippingAddress: {
            address: '',
            city: '',
            state: '',
            phone: '',
            firstName: '',
            lastName: '',
            email: '',
            documentType: '',
            documentNumber: '',
            companyName: '',
            ruc: '',
            invoiceType: undefined,
            deliveryOption: undefined,
            method_shipping: undefined,
            shalomDepartment: '',
            shalomAgency: '',
            capitalBranch: ''
        },
        paymentData: {
            cardNumber: '',
            cardHolder: '',
            expiryDate: '',
            cvv: '',
            email: ''
        },
        referralCode: '',
        currentStep: 1,
        isLoading: false,
        error: null,
        orderComplete: false,
        orderId: null
    }),

    setOrderComplete: (orderId) => set({ 
        orderComplete: true, 
        orderId,
        currentStep: 4 // Avanzar automáticamente al paso de confirmación
    }),

    setError: (error) => set({ error }),

    setLoading: (isLoading) => set({ isLoading })
}));
