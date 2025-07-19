import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../utils/toastConfig';
import { resetPassword } from '../services/newPassApi';

interface ResetPasswordParams {
  password: string;
  uid: string;
  token: string;
}

interface UseNewPassReturn {
  resetPassword: (data: ResetPasswordParams) => Promise<void>;
  isLoading: boolean;
  resetError: () => void;
}

export const useNewPass = (): UseNewPassReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (data: ResetPasswordParams) => {
    setIsLoading(true);
    const loadingId = showToast.loading('Actualizando contraseña', 'Por favor espera...');

    try {
      const response = await resetPassword({
        password: data.password,
        uid: data.uid,
        token: data.token
      });
      
      showToast.dismiss(loadingId);
      showToast.success('¡Contraseña actualizada!', response.message || 'Tu contraseña ha sido actualizada correctamente');
      navigate('/login');
    } catch (error) {
      showToast.dismiss(loadingId);
      
      if (error instanceof Error) {
        // El mensaje de error ya está formateado en el servicio
        showToast.error('Error al actualizar la contraseña', error.message);
      } else {
        showToast.error('Error inesperado', 'Ocurrió un error al intentar actualizar la contraseña');
      }
      
      // Re-lanzar el error para que pueda ser manejado por el componente si es necesario
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => {
    // No es necesario mantener el estado de error ya que usamos toasts
  };

  return {
    resetPassword: handleResetPassword,
    isLoading,
    resetError,
  };
};
