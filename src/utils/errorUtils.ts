/**
 * Utilitario para manejar errores de API de forma consistente
 */

import { handleApiError } from "../services/errorInterceptor";

/**
 * Función auxiliar para manejar errores de API en servicios específicos
 * Útil para usarse en los bloques catch de los servicios
 * 
 * @param error El error capturado
 * @param defaultMessage Mensaje por defecto si no se puede determinar el error
 */
export function handleServiceError(error: unknown, defaultMessage: string = "Error en la petición"): never {
  console.error('[Service Error]:', error);
  
  // Si es un error conocido, intentamos manejar la expiración de token
  if (error instanceof Error) {
    handleApiError(error);
  }
  
  // Re-lanzamos el error para que pueda ser manejado más arriba
  if (error instanceof Error) {
    throw error;
  } else {
    throw new Error(defaultMessage);
  }
}
