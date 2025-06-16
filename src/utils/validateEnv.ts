export function validateEnv() {
  const requiredVars = ['VITE_API_ROOT', 'VITE_WHATSAPP_PHONE_NUMBER', 'VITE_PROXY_TARGET'];
  requiredVars.forEach((key) => {
    if (!import.meta.env[key]) {
      throw new Error(`La variable de entorno ${key} no está configurada.`);
    }
  });
}