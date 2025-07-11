export interface ForgotPasswordResponse {
  message: string;
  status: number;
}

export const forgotPassApi = async (email: string): Promise<ForgotPasswordResponse> => {
  const url = 'https://api.infinityhealth.fit/api/users/password-reset/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || 
        data.email?.[0] || // Handle field-specific errors
        `Error: ${response.status} ${response.statusText}`
      );
    }

    return {
      message: data.message || 'Correo de restablecimiento enviado.',
      status: response.status
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};