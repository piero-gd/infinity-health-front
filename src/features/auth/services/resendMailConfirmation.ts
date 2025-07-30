const API_URL = 'https://api.infinityhealth.fit/api/users/resend-confirmation-by-email/';

export const resendMailConfirmation = async (email: string) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Error al reenviar el correo de confirmación');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
