export const chatWhatsApp = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER;
    const message = "Hola, me gustaría consultar mi plan nutricional.";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
}

