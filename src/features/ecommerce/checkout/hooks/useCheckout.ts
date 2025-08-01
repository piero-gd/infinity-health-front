import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../cart/stores/useCartStore';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { createOrder, mapCartItemsToOrderItems } from '../services/orderService';
import { showToast } from '../../../../utils/toastConfig';

/**
 * Hook que maneja la lógica de finalización de la compra
 */
export const useCheckout = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Acceder al store del carrito
    const { 
        items, 
        clearCart 
    } = useCartStore();
    
    // Acceder al store de checkout
    const { 
        shippingAddress, 
        referralCode, 
        setOrderComplete,
        setError,
        setCurrentStep 
    } = useCheckoutStore();

    /**
     * Navega a la página de envío desde el carrito
     */
    const proceedToShipping = () => {
        if (items.length === 0) {
            showToast.error('Carrito vacío', 'Tu carrito está vacío. Agrega productos antes de continuar.');
            return;
        }
        
        setCurrentStep(2);
        navigate('/checkout/shipping');
    };

    /**
     * Navega a la página de pago desde la página de envío
     */
    const proceedToPayment = () => {
        console.log('Estado actual de shippingAddress:', shippingAddress);
        
        // Validar datos de facturación
        const { 
            firstName, 
            lastName, 
            email, 
            phone, 
            deliveryOption, 
            invoiceType, 
            documentType, 
            documentNumber, 
            ruc, 
            companyName 
        } = shippingAddress;
        
        // Validar datos personales (requeridos en todos los casos)
        if (!firstName || firstName.trim() === '') {
            showToast.error('Información incompleta', 'Por favor ingresa tu nombre');
            return;
        }
        
        if (!lastName || lastName.trim() === '') {
            showToast.error('Información incompleta', 'Por favor ingresa tus apellidos');
            return;
        }
        
        if (!email || email.trim() === '') {
            showToast.error('Información incompleta', 'Por favor ingresa tu correo electrónico');
            return;
        }
        
        if (!phone || phone.trim() === '') {
            showToast.error('Información incompleta', 'Por favor ingresa tu número telefónico');
            return;
        }
        
        // Validar tipo de comprobante
        if (!invoiceType) {
            showToast.error('Información incompleta', 'Por favor selecciona un tipo de comprobante (Boleta o Factura)');
            return;
        }
        
        // Validar campos específicos según el tipo de comprobante
        if (invoiceType === 'boleta' && (!documentType || !documentNumber)) {
            showToast.error('Información incompleta', 'Por favor completa tu tipo y número de documento');
            return;
        }
        
        if (invoiceType === 'factura') {
            if (!ruc || ruc.trim() === '') {
                showToast.error('Información incompleta', 'Por favor ingresa el número de RUC');
                return;
            }
            
            if (!companyName || companyName.trim() === '') {
                showToast.error('Información incompleta', 'Por favor ingresa la razón social');
                return;
            }
        }
        
        // Validar método de entrega
        if (!deliveryOption) {
            showToast.error('Información incompleta', 'Por favor selecciona un método de entrega');
            return;
        }
        
        // Validar campos específicos para el método de entrega Lima
        if (deliveryOption === 'lima') {
            const { address, city, state } = shippingAddress;
            
            if (!address || address.trim() === '') {
                showToast.error('Información incompleta', 'Por favor ingresa la dirección de entrega');
                return;
            }
            
            if (!city || city.trim() === '') {
                showToast.error('Información incompleta', 'Por favor ingresa la ciudad de entrega');
                return;
            }
            
            if (!state || state.trim() === '') {
                showToast.error('Información incompleta', 'Por favor ingresa la región/departamento de entrega');
                return;
            }
        }
        
        // Validar campos específicos para el método de entrega Shalom
        if (deliveryOption === 'shalom') {
            const { shalomDepartment, shalomAgency } = shippingAddress;
            
            if (!shalomDepartment || shalomDepartment.trim() === '') {
                showToast.error('Información incompleta', 'Por favor selecciona un departamento para la agencia Shalom');
                return;
            }
            
            if (!shalomAgency || shalomAgency.trim() === '') {
                showToast.error('Información incompleta', 'Por favor selecciona una agencia Shalom específica');
                return;
            }
        }
        
        // Validar campos específicos para el método de entrega Capital Infinity
        if (deliveryOption === 'capital') {
            const { capitalBranch } = shippingAddress;
            
            if (!capitalBranch || capitalBranch.trim() === '') {
                showToast.error('Información incompleta', 'Por favor selecciona una sede de Capital Infinity');
                return;
            }
        }
        
        // Si todas las validaciones pasan, proceder al siguiente paso
        setCurrentStep(3);
        navigate('/checkout/payment');
    };

    /**
     * Completa la orden y la envía al backend
     */
    const completeOrder = async () => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        setError(null);
        
        try {
            // Mapear items del carrito al formato esperado por la API
            const orderItems = mapCartItemsToOrderItems(items);
            
            // Preparar datos de la orden
            const orderData = {
                items: orderItems,
                shipping_address: shippingAddress,
                ...(referralCode && { referral_code: referralCode })
            };
            
            // Simulación de procesamiento de pago (normalmente sería un llamado a un servicio de pago)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Crear la orden en el backend
            const response = await createOrder(orderData);
            
            // Actualizar estado y navegar a confirmación
            setOrderComplete(response.id);
            clearCart();
            showToast.success('¡Orden completada!', 'Tu orden ha sido procesada con éxito');
            navigate('/checkout/confirmation');
            
        } catch (error) {
            console.error('Error al procesar la orden:', error);
            setError(error instanceof Error ? error.message : 'Ocurrió un error al procesar tu orden.');
            showToast.error('Error en el proceso', 'No se pudo procesar tu orden. Por favor intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        proceedToShipping,
        proceedToPayment,
        completeOrder,
        isSubmitting
    };
};
