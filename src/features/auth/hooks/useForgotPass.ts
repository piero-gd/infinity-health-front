import { useState } from 'react';
import { forgotPassApi } from '../services/forgotPassApi';

export const useForgotPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (email: string) => {
    if (!email.trim()) {
      setError('Por favor ingrese su correo electrónico');
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await forgotPassApi(email);
      setSuccess(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetPassword,
    isLoading,
    error,
    success,
    reset: () => {
      setError(null);
      setSuccess(false);
    }
  };
};