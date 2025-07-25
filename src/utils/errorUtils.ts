/**
 * Utilitario para manejar errores de API de forma consistente
 */

import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { showToast } from '../utils/toastConfig';

/**
 * Función auxiliar para manejar errores de API en servicios específicos
 * Útil para usarse en los bloques catch de los servicios
 * 
 * @param error El error capturado
 * @param defaultMessage Mensaje por defecto si no se puede determinar el error
 */
export function handleServiceError(error: unknown, defaultMessage: string = "Error en la petición"): never {
  console.error('[Service Error]:', error);
  
  // Si es un error conocido, verificamos si es un error de token expirado
  if (error instanceof Error && error.message.startsWith('TOKEN_EXPIRED:')) {
    console.log('[Service Error] Detectado error de token expirado');
    
    // Obtenemos y ejecutamos la función de logout del store
    const logout = useAuthStore.getState().logout;
    logout();
    
    // Mostramos un mensaje al usuario una sola vez
    showToast.error(
      'Sesión expirada',
      'Tu sesión ha expirado. Por favor inicia sesión nuevamente.'
    );
  }
  
  // Re-lanzamos el error para que pueda ser manejado más arriba
  if (error instanceof Error) {
    throw error;
  } else {
    throw new Error(defaultMessage);
  }
}
