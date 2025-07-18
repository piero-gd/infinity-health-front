export function validateEnv() {
  const requiredVars = ['VITE_API_URL', 'VITE_WHATSAPP_PHONE_NUMBER', 'VITE_API_BASE_URL'];
  requiredVars.forEach((key) => {
    if (!import.meta.env[key]) {
      throw new Error(`La variable de entorno ${key} no está configurada.`);
    }
  });
}