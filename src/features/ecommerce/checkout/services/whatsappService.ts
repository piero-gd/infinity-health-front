/**
 * Servicio para manejar pagos por WhatsApp
 */

/**
 * Genera el mensaje de WhatsApp con la información de la orden
 */
export const generateWhatsAppMessage = (orderUuid: string, total: number): string => {
  return `Hola! 👋 Realicé una compra en Infinity Health

🏷️ N° Pedido: ${orderUuid}
💰 Total: $${total.toFixed(2)}

Confirmo mi compra y solicito información para el pago.

¡Gracias!`;
};

/**
 * Obtiene el número de WhatsApp desde las variables de entorno
 */
export const getWhatsAppNumber = (): string => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER;
  
  if (!whatsappNumber) {
    throw new Error('Número de WhatsApp no configurado en variables de entorno (VITE_WHATSAPP_PHONE_NUMBER)');
  }
  
  return whatsappNumber;
};

/**
 * Abre WhatsApp con el mensaje prellenado
 * Funciona tanto en móvil (app) como en desktop (WhatsApp Web)
 */
export const openWhatsAppWithMessage = (orderUuid: string, total: number): void => {
  try {
    const whatsappNumber = getWhatsAppNumber();
    const message = generateWhatsAppMessage(orderUuid, total);
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crear URL de WhatsApp
    // Para móviles usa wa.me, para desktop puede usar web.whatsapp.com
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[+\s-]/g, '')}?text=${encodedMessage}`;
    
    console.log('Opening WhatsApp with URL:', whatsappUrl);
    console.log('Message:', message);
    
    // Abrir en nueva ventana/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    throw error;
  }
};

/**
 * Valida que todos los requisitos para WhatsApp estén cumplidos
 */
export const validateWhatsAppRequirements = (orderUuid: string | null): string | null => {
  if (!orderUuid) {
    return 'No se encontró el identificador de la orden';
  }
  
  try {
    getWhatsAppNumber();
  } catch (error) {
    return 'Número de WhatsApp no configurado';
  }
  
  return null; // Todo está bien
};
