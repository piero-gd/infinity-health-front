import { post } from '../../../services/api';

interface ResetPasswordResponse {
  message: string;
  status: number;
}

interface ApiError extends Error {
  response?: {
    status: number;
    data: any;
  };
}

// Definimos el endpoint relativo para resetear la contraseña
const PASSWORD_RESET_ENDPOINT = 'users/password-reset-confirm';

interface ResetPasswordParams {
  password: string;
  uid: string;
  token: string;
}

export const resetPassword = async (data: ResetPasswordParams): Promise<ResetPasswordResponse> => {
  try {
    // Usamos el servicio API centralizado para hacer la petición
    // Construimos el endpoint con los parámetros uid y token
    const endpoint = `${PASSWORD_RESET_ENDPOINT}/${data.uid}/${data.token}/`;
    
    // Usamos el método post del servicio API centralizado
    const responseData = await post<any>(endpoint, {
      password: data.password,
      uid: data.uid,
      token: data.token
    });
    
    // La gestión básica de errores HTTP ya la hace el servicio API centralizado
    // Solo necesitamos manejar errores específicos de negocio
    
    return {
      message: responseData.message || 'Contraseña actualizada correctamente',
      status: 200 // El servicio API ya maneja los códigos de error HTTP
    };
  } catch (error: any) {
    // Capturamos el error que viene del servicio API centralizado
    // y lo adaptamos a nuestro formato específico
    let errorMessage = 'Error al restablecer la contraseña';
    let status = 500;
    
    // Verificamos si es un error con más detalles (probablemente de la API)
    if (error?.message) {
      const errorBody = error.message;
      
      // Intentamos extraer información adicional
      if (errorBody.includes('400')) {
        status = 400;
        
        if (errorBody.includes('password')) {
          errorMessage = 'La contraseña no cumple con los requisitos';
        } else if (errorBody.includes('token')) {
          errorMessage = 'El enlace de restablecimiento no es válido o ha expirado';
        } else if (errorBody.includes('detail')) {
          // Intentamos extraer el detalle
          const detailMatch = errorBody.match(/detail[^-]+(.*)/);
          if (detailMatch && detailMatch[1]) {
            errorMessage = detailMatch[1].trim();
          }
        }
      } else if (errorBody.includes('404')) {
        status = 404;
        errorMessage = 'El enlace de restablecimiento no es válido o ha expirado';
      }
    }
    
    // Creamos un error con el formato esperado por el resto de la aplicación
    const apiError: ApiError = new Error(errorMessage);
    apiError.response = {
      status,
      data: error.response?.data || {}
    };
    throw apiError;
  }
};