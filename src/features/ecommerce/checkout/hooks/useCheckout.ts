import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../cart/stores/useCartStore';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { mapCartItemsToOrderItems, createOrder } from '../services/orderService';
import { processMercadoPagoPayment } from '../services/mercadoPagoService';
import { openWhatsAppWithMessage, validateWhatsAppRequirements } from '../services/whatsappService';
import { showToast } from '../../../../utils/toastConfig';

/**
 * Hook que maneja la lógica de finalización de la compra
 */
export const useCheckout = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Acceder al store del carrito
    const { 
        items
    } = useCartStore();
    
    // Acceder al store de checkout
    const { 
        shippingAddress, 
        referralCode,
        orderUuid,
        setError,
        setCurrentStep,
        setOrderUuid
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
        // Scroll al inicio de la página
        window.scrollTo(0, 0);
    };

    /**
     * Navega a la página de pago desde la página de envío
     * Ahora crea la orden en el backend y obtiene el UUID
     */
    const proceedToPayment = async () => {
        if (isSubmitting) return;
        
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
        
        // Si todas las validaciones pasan, crear la orden en el backend
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
            
            // Asegurarse de que el método de envío está establecido correctamente
            if (orderData.shipping_address) {
                const { deliveryOption } = orderData.shipping_address;
                // Establecer method_shipping si no está definido
                if (!orderData.shipping_address.method_shipping) {
                    switch (deliveryOption) {
                        case 'lima':
                            orderData.shipping_address.method_shipping = 'envio_puerta';
                            break;
                        case 'capital':
                            orderData.shipping_address.method_shipping = 'recojo_oficina';
                            break;
                        case 'shalom':
                            orderData.shipping_address.method_shipping = 'recojo_shalom';
                            break;
                        default:
                            // Por defecto, usamos envío a puerta
                            orderData.shipping_address.method_shipping = 'envio_puerta';
                    }
                }
            }
            
            console.log('Creando orden en backend:', orderData);
            
            // Crear orden en el backend
            const orderResponse = await createOrder(orderData);
            
            if (!orderResponse.order_uuid) {
                throw new Error('Backend no retornó el UUID de la orden');
            }
            
            // Guardar UUID en el store
            setOrderUuid(orderResponse.order_uuid);
            
            console.log('Orden creada exitosamente. UUID:', orderResponse.order_uuid);
            
            // Proceder al siguiente paso
            setCurrentStep(3);
            navigate('/checkout/payment');
            // Scroll al inicio de la página
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error al crear la orden:', error);
            setError(error instanceof Error ? error.message : 'Ocurrió un error al crear la orden.');
            showToast.error('Error', 'No se pudo crear la orden. Por favor intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Procesa el pago con tarjeta de crédito/débito usando MercadoPago
     * Utiliza el UUID de la orden previamente creada
     */
    const processCardPayment = async () => {
        if (isSubmitting) return;
        
        // Verificar que tenemos el UUID de la orden
        if (!orderUuid) {
            showToast.error('Error', 'No se encontró el identificador de la orden. Por favor regresa al paso anterior.');
            navigate('/checkout/shipping');
            return;
        }
        
        setIsSubmitting(true);
        setError(null);
        
        try {
            console.log('Procesando pago para orden UUID:', orderUuid);
            
            // Procesar el pago con MercadoPago usando el UUID de la orden
            const paymentResponse = await processMercadoPagoPayment(orderUuid, 'card');
            
            if (!paymentResponse.success) {
                throw new Error(paymentResponse.error || 'Error al procesar el pago');
            }
            
            console.log('Pago procesado exitosamente. Redirigiendo a:', paymentResponse.paymentUrl);
            
            // Redirigir a la URL de pago (o página de éxito/error)
            window.location.href = paymentResponse.paymentUrl as string;
            
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            setError(error instanceof Error ? error.message : 'Ocurrió un error al procesar el pago.');
            showToast.error('Error en el pago', 'No se pudo procesar el pago. Por favor intenta nuevamente.');
            setIsSubmitting(false);
        }
    };

    /**
     * Procesa el pago por WhatsApp
     * Abre WhatsApp con un mensaje prellenado que incluye el UUID de la orden
     */
    const processWhatsAppPayment = () => {
        // Validar que tenemos el UUID de la orden
        const validationError = validateWhatsAppRequirements(orderUuid);
        if (validationError) {
            showToast.error('Error', validationError);
            return;
        }

        try {
            // Calcular total del carrito
            const { subtotal, shipping, discount } = useCartStore.getState();
            const total = subtotal + shipping - discount;

            // Abrir WhatsApp con el mensaje
            openWhatsAppWithMessage(orderUuid!, total);

            // Mostrar mensaje informativo
            showToast.info(
                'WhatsApp abierto',
                'Se abrió WhatsApp con tu información de pedido. Envía el mensaje para continuar con el pago.'
            );

            // Opcional: Navegar a una página de "pago pendiente" o mantener en la actual
            // navigate('/checkout/pending-payment');

        } catch (error) {
            console.error('Error al procesar pago por WhatsApp:', error);
            showToast.error('Error', 'No se pudo abrir WhatsApp. Verifica tu configuración.');
        }
    };

    return {
        proceedToShipping,
        proceedToPayment,
        processCardPayment,
        processWhatsAppPayment,
        isSubmitting
    };
};
