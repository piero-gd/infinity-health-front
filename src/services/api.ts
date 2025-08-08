/**
 * Servicio API centralizado para todas las llamadas HTTP
 * Esta capa de abstracción maneja automáticamente las diferencias entre dev y producción
 */
import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { showToast } from '../utils/toastConfig';

// Variable para rastrear si ya se está manejando un error de token expirado
let isHandlingTokenExpired = false;

/**
 * Función para manejar el caso específico de un token expirado
 * Se asegura que solo se ejecute una vez incluso si hay múltiples errores simultáneos
 */
function handleTokenExpired(): void {
  // Evitamos múltiples ejecuciones simultáneas
  if (isHandlingTokenExpired) return;
  
  try {
    isHandlingTokenExpired = true;
    console.log('[API] Manejando token expirado');
    
    // Obtenemos y ejecutamos la función de logout del store
    const logout = useAuthStore.getState().logout;
    logout();
    
    // Mostramos un mensaje al usuario
    showToast.error(
      'Sesión expirada',
      'Tu sesión ha expirado. Por favor inicia sesión nuevamente.'
    );
    
    console.log('[API] Sesión cerrada por token expirado');
  } catch (e) {
    console.error('[API] Error al manejar token expirado:', e);
  } finally {
    // Después de un tiempo prudente, permitimos manejar otro error si ocurre
    setTimeout(() => {
      isHandlingTokenExpired = false;
    }, 2000);
  }
}

// Obtener la URL base desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Opciones por defecto para fetch
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Función para realizar peticiones a la API
 * 
 * @param endpoint Endpoint relativo de la API (sin /api)
 * @param options Opciones para fetch
 * @returns Promise con la respuesta
 */
export const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  // Construye la URL basada en la configuración de entorno
  // Asegúrate que el endpoint no comience con /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Construye la URL completa
  let url = '';
  
  // Si estamos en desarrollo (usando proxy)
  if (API_BASE_URL === '/api') {
    url = `${API_BASE_URL}/${normalizedEndpoint}`;
  } else {
    // Si estamos en producción, asegúrate de incluir /api/ en la ruta
    url = `${API_BASE_URL}/api/${normalizedEndpoint}`;
  }
  
  console.log(`[API] Sending request to: ${url}`);
  console.log(`[API] Environment API_BASE_URL: ${API_BASE_URL}`);

  // Combina las opciones predeterminadas con las proporcionadas
  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  console.log(`[API] Request options:`, {
    method: fetchOptions.method || 'GET',
    headers: fetchOptions.headers
  });

  try {
    // Realiza la petición
    const response = await fetch(url, fetchOptions);
    
    console.log(`[API] Response status: ${response.status} ${response.statusText}`);
    
    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
      // Intentar obtener más detalles del error
      let errorDetails = '';
      try {
        const errorBody = await response.text();
        errorDetails = errorBody;
      } catch (e) {
        errorDetails = 'No additional error details available';
      }
      
      console.error(`[API] Error details: ${errorDetails}`);
      
      // Si el error es 401 (Unauthorized), probablemente el token expiró
      if (response.status === 401) {
        console.error('[API] Error 401: Token expirado o no autorizado');
        // Esta señal será capturada por un interceptor que crearemos
        throw new Error(`TOKEN_EXPIRED:${response.status}: ${response.statusText} - ${errorDetails}`);
      }
      
      throw new Error(`API error ${response.status}: ${response.statusText} - ${errorDetails}`);
    }

    // Verificar si la respuesta tiene contenido
    const contentType = response.headers.get('content-type') || '';
    
    // Si el tipo de contenido indica JSON
    if (contentType.includes('application/json')) {
      try {
        const jsonData = await response.json();
        console.log(`[API] Successful JSON response received`);
        console.log(`[API] Response data:`, jsonData);
        console.log(`[API] Response data type:`, typeof jsonData);
        console.log(`[API] Response keys:`, Object.keys(jsonData || {}));
        return jsonData as T;
      } catch (error) {
        console.error('[API] Failed to parse JSON response:', error);
        throw new Error('Invalid JSON response from API');
      }
    } else {
      // Para otros tipos de contenido
      console.log(`[API] Non-JSON response received (${contentType})`);
      const textResponse = await response.text();
      
      // Intentar parsear como JSON de todos modos (a veces el tipo de contenido está mal configurado)
      try {
        const jsonData = JSON.parse(textResponse);
        console.log('[API] Successfully parsed text as JSON');
        return jsonData as T;
      } catch {
        console.log('[API] Response is not JSON, returning as is');
        return textResponse as unknown as T;
      }
    }
  } catch (error) {
    console.error(`[API] Request failed:`, error);
    
    // Manejamos el error de token expirado directamente aquí
    // sin depender de importaciones dinámicas o módulos externos
    if (error instanceof Error && error.message.startsWith('TOKEN_EXPIRED:')) {
      console.error('[API] Token expirado detectado');
      
      // Llamamos a la función especializada que se encarga del manejo de errores de token
      handleTokenExpired();
    }
    
    // Siempre propagamos el error original
    throw error;
  }
};

// Helpers para métodos HTTP comunes
export const get = <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, { ...options, method: 'GET' });
};

export const post = <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const put = <T>(endpoint: string, data: any, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const del = <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  return apiRequest<T>(endpoint, { ...options, method: 'DELETE' });
};
