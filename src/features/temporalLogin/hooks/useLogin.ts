import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import type { LoginCredentials, AuthResponse } from '../types';
import { useAuthStore } from '../../auth/stores/useAuthStore';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Usamos el store de Zustand para la autenticación
  const { login: setAuthState, username } = useAuthStore();

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi(credentials);
      console.log('Login response:', response);
      
      // Guardamos los datos en Zustand en lugar de localStorage
      setAuthState({
        access: response.access,
        refresh: response.refresh,
        username: response.username
      });
      
      // Redirigir a la calculadora
      navigate('/calculator');
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error de autenticación';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, username };
};

export default useLogin;
