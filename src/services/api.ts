/**
 * Servicio API centralizado para todas las llamadas HTTP
 * Esta capa de abstracción maneja automáticamente las diferencias entre dev y producción
 */

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
    
    // Importamos el interceptor de errores aquí para evitar problemas de importación circular
    import('./errorInterceptor').then(module => {
      // Solo procesamos el error si es de tipo Error
      if (error instanceof Error) {
        module.handleApiError(error);
      }
    }).catch(importError => {
      console.error('[API] Error al cargar el interceptor:', importError);
    });
    
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
