/**
 * Servicio para manejar pagos por WhatsApp
 * Implementa mejores prácticas para emojis en URLs de WhatsApp
 */

/**
 * Genera el mensaje de WhatsApp con la información de la orden
 * Usa texto plano sin emojis para máxima compatibilidad
 */
export const generateWhatsAppMessage = (orderUuid: string, total: number): string => {
  return `Hola! Estoy realizando una compra en Infinity Health y solicito información para proceder al pago.

N° Pedido: ${orderUuid}
Total: ${total.toFixed(2)}`;
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
 * Codifica el mensaje para URL de WhatsApp
 * Maneja correctamente los emojis Unicode
 */
const encodeWhatsAppMessage = (message: string): string => {
  // Usar encodeURIComponent que maneja correctamente Unicode y emojis
  return encodeURIComponent(message)
    // Algunos caracteres adicionales que pueden causar problemas
    .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
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
    const encodedMessage = encodeWhatsAppMessage(message);
    
    // Limpiar el número de teléfono (remover espacios, guiones, etc.)
    const cleanPhoneNumber = whatsappNumber.replace(/[+\s-()]/g, '');
    
    // Crear URL de WhatsApp
    // wa.me es la forma oficial y más compatible
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    
    console.log('WhatsApp Service - Información del mensaje:');
    console.log('- Número:', cleanPhoneNumber);
    console.log('- Mensaje original:', message);
    console.log('- URL completa:', whatsappUrl);
    
    // Abrir en nueva ventana/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
  } catch (error) {
    console.error('Error abriendo WhatsApp:', error);
    throw error;
  }
};

/**
 * Función de prueba para verificar el mensaje de WhatsApp
 */
export const testWhatsAppMessage = (): void => {
  const testOrderUuid = 'test-12345';
  const testTotal = 99.99;
  
  console.log('Probando mensaje de WhatsApp...');
  openWhatsAppWithMessage(testOrderUuid, testTotal);
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
