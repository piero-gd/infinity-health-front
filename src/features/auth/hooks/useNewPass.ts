import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../services/newPassApi';

interface UseNewPassReturn {
  resetPassword: (data: { password: string; token: string }) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  resetError: () => void;
}

export const useNewPass = (): UseNewPassReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleResetPassword = async (data: { password: string; token: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await resetPassword({
        password: data.password,
        token: data.token
      });
      
      toast.success(response.message);
      navigate('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar la contraseña';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return {
    resetPassword: handleResetPassword,
    isLoading,
    error,
    resetError,
  };
};
