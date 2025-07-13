interface ResetPasswordResponse {
  message: string;
  status: number;
}

export const resetPassword = async (data: { password: string; token: string }): Promise<ResetPasswordResponse> => {
  const response = await fetch(`https://api.infinityhealth.fit/api/users/password-reset-confirm/${data.token}`, {
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
    throw new Error(
      responseData.detail || 
      responseData.message || 
      'Error al restablecer la contraseña'
    );
  }

  return {
    message: responseData.message || 'Contraseña actualizada correctamente',
    status: response.status
  };
};