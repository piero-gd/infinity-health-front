import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { showToast } from '../utils/toastConfig';

/**
 * Interceptor de errores global
 * Captura errores específicos como expiración de token y maneja la redirección
 * 
 * @param error El error capturado
 */
export function handleApiError(error: Error): void {
  // Verificar si es un error de token expirado
  if (error.message.startsWith('TOKEN_EXPIRED:')) {
    console.error('[Error Interceptor] Token expirado detectado');
    
    // Obtener la función logout del store
    const logout = useAuthStore.getState().logout;
    
    // Cerrar sesión (elimina el token y estado de autenticación)
    logout();
    
    // Mostrar mensaje al usuario
    showToast.error(
      'Sesión expirada', 
      'Tu sesión ha expirado. Por favor inicia sesión nuevamente.'
    );
    
    // No hacemos redirección directa aquí
    // Al llamar a logout(), el estado de autenticación cambia a false
    // y ProtectedRoute se encargará automáticamente de la redirección
  }
}
