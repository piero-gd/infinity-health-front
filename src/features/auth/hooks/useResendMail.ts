import { useState } from 'react';
import { resendMailConfirmation } from '../services/resendMailConfirmation';

export const useResendMail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const resendConfirmation = async () => {
    const email = localStorage.getItem('email');
    
    if (!email) {
      setError('No se encontró el correo electrónico. Por favor, intente registrarse nuevamente.');
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await resendMailConfirmation(email);
      setIsSuccess(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al reenviar el correo de confirmación';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resendConfirmation,
    isLoading,
    error,
    isSuccess,
  };
};
