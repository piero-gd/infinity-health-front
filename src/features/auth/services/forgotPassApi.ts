interface ApiError extends Error {
  response?: {
    status: number;
    data: any;
  };
}

export interface ForgotPasswordResponse {
  message: string;
  status: number;
  email?: string;
}

const API_URL = 'https://api.infinityhealth.fit/api/users/password-reset/';

export const forgotPassApi = async (email: string): Promise<ForgotPasswordResponse> => {
  if (!email) {
    throw new Error('El correo electrónico es requerido');
  }
  
  // Validación básica de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Por favor ingresa un correo electrónico válido');
  }
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const responseData = await response.json();

    if (!response.ok) {
      let errorMessage = 'Error al procesar la solicitud de restablecimiento de contraseña';
      
      if (response.status === 400) {
        if (responseData.email) {
          errorMessage = Array.isArray(responseData.email) 
            ? responseData.email[0]
            : 'El correo electrónico proporcionado no es válido';
        } else if (responseData.detail) {
          errorMessage = responseData.detail;
        }
      } else if (response.status === 404) {
        errorMessage = 'No se encontró una cuenta con este correo electrónico';
      } else if (response.status >= 500) {
        errorMessage = 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.';
      }
      
      const error: ApiError = new Error(errorMessage);
      error.response = {
        status: response.status,
        data: responseData
      };
      throw error;
    }

    return {
      message: responseData.message || 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña',
      status: response.status,
      email: email
    };
  } catch (error) {
    if (error instanceof Error) {
      // Si ya es un error de la API, lo re-lanzamos
      if ('response' in error) throw error;
      
      // Manejo de errores de red
      if (error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar al servidor. Verifica tu conexión a internet.');
      }
    }
    
    // Para cualquier otro error inesperado
    throw new Error('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
  }
};