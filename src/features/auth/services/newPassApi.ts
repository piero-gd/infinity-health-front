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

const API_URL = 'https://api.infinityhealth.fit/api/users/password-reset-confirm/';

export const resetPassword = async (data: { password: string; token: string }): Promise<ResetPasswordResponse> => {
  try {
    const tokenTemporal = 'MTM/ct1f2a-e4eb98e0f8d01062e6ba737b358fa932/';
    const response = await fetch(`${API_URL}${tokenTemporal}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
        token: data.token
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      let errorMessage = 'Error al restablecer la contraseña';
      
      if (response.status === 400) {
        if (responseData.password) {
          errorMessage = Array.isArray(responseData.password) 
            ? responseData.password[0] 
            : 'La contraseña no cumple con los requisitos';
        } else if (responseData.token) {
          errorMessage = 'El enlace de restablecimiento no es válido o ha expirado';
        } else if (responseData.detail) {
          errorMessage = responseData.detail;
        }
      } else if (response.status === 404) {
        errorMessage = 'El enlace de restablecimiento no es válido o ha expirado';
      }
      
      const error: ApiError = new Error(errorMessage);
      error.response = {
        status: response.status,
        data: responseData
      };
      throw error;
    }

    return {
      message: responseData.message || 'Contraseña actualizada correctamente',
      status: response.status
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error desconocido al intentar restablecer la contraseña');
  }
};