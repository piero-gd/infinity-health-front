import { useState } from 'react';
import { showToast } from '../../../utils/toastConfig';
import { forgotPassApi } from '../services/forgotPassApi';

export const useForgotPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (email: string): Promise<boolean> => {
    const loadingId = showToast.loading('Procesando solicitud', 'Por favor espera...');
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await forgotPassApi(email);
      showToast.dismiss(loadingId);
      
      // Mostrar mensaje de éxito
      showToast.success(
        'Correo enviado', 
        response.message || 'Hemos enviado un enlace de restablecimiento a tu correo electrónico.'
      );
      
      setEmailSentTo(email);
      setSuccess(true);
      return true;
      
    } catch (error) {
      showToast.dismiss(loadingId);
      
      let errorMessage = 'No se pudo completar la solicitud. Por favor, inténtalo de nuevo.';
      if (error instanceof Error) {
        errorMessage = error.message;
        // El mensaje de error ya está formateado en el servicio
        showToast.error('Error', error.message);
      } else {
        showToast.error('Error', errorMessage);
      }
      
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setEmailSentTo(null);
    setError(null);
    setSuccess(false);
  };

  return {
    resetPassword,
    isLoading,
    emailSentTo,
    error,
    success,
    reset: resetState,
  };
};