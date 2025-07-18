import { useAuthStore } from '../features/auth/stores/useAuthStore';

/**
 * Función para obtener el token de autenticación desde Zustand
 */
export const getAuthToken = (): string | null => {
  const token = useAuthStore.getState().accessToken;
  console.log('[Auth Service] Token solicitado:', token ? '✓ Token disponible' : '✗ Sin token');
  return token;
};

/**
 * Comprueba si el usuario está autenticado
 */
export const isAuthenticated = (): boolean => {
  const authStatus = useAuthStore.getState().isAuthenticated;
  console.log('[Auth Service] Verificación de autenticación:', 
    authStatus ? '✓ Usuario autenticado' : '✗ Usuario no autenticado');
  return authStatus;
};

/**
 * Hook personalizado para obtener headers con autorización
 * Útil para servicios que necesitan usar el token en llamadas API
 */
export const getAuthHeaders = (): { Authorization?: string } => {
  const token = getAuthToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
  console.log('[Auth Service] Headers generados:', {
    headers: Object.keys(headers).length ? '✓ Con autorización' : '✗ Sin autorización',
    timestamp: new Date().toISOString()
  });
  
  return headers;
};
