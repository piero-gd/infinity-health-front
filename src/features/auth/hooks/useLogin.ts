import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import type { LoginCredentials, AuthResponse } from '../types';
import { toast } from '../../../utils/toastConfig';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Iniciando sesión...', 'Por favor espera...');

    try {
      const response = await authApi(credentials);
      
      // Save data to localStorage
      localStorage.setItem('accessToken', response.access);
      if (response.refresh) {
        localStorage.setItem('refreshToken', response.refresh);
      }
      
      // Save username to localStorage
      if (response.username) {
        localStorage.setItem('username', response.username);
      }
      
      // Show success message and redirect
      toast.dismiss(toastId);
      toast.success('¡Bienvenido!', 'Sesión iniciada correctamente');
      navigate('/calculator');
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de autenticación';
      toast.dismiss(toastId);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, username };
};

export default useLogin;
