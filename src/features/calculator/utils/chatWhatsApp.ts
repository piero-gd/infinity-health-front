export const chatWhatsApp = () => {
    const phoneNumber = "+56956256256";
    const message = "Hola, me gustaría consultar mi plan nutricional";
    const dieta = ""
    const encodedMessage = encodeURIComponent(message + dieta);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
}
