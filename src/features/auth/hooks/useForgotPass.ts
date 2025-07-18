import { useState } from 'react';
import { showToast } from '../../../utils/toastConfig';
import { forgotPassApi } from '../services/forgotPassApi';

export const useForgotPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState<string | null>(null);

  const resetPassword = async (email: string): Promise<boolean> => {
    const loadingId = showToast.loading('Procesando solicitud', 'Por favor espera...');
    setIsLoading(true);
    
    try {
      const response = await forgotPassApi(email);
      showToast.dismiss(loadingId);
      
      // Mostrar mensaje de éxito
      showToast.success(
        'Correo enviado', 
        response.message || 'Hemos enviado un enlace de restablecimiento a tu correo electrónico.'
      );
      
      setEmailSentTo(email);
      return true;
      
    } catch (error) {
      showToast.dismiss(loadingId);
      
      if (error instanceof Error) {
        // El mensaje de error ya está formateado en el servicio
        showToast.error('Error', error.message);
      } else {
        showToast.error('Error', 'No se pudo completar la solicitud. Por favor, inténtalo de nuevo.');
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setEmailSentTo(null);
  };

  return {
    resetPassword,
    isLoading,
    emailSentTo,
    reset: resetState,
  };
};