import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';
import type { LoginCredentials, AuthResponse } from '../types';
import { toast } from '../../../utils/toastConfig';
import { useAuthStore } from '../stores/useAuthStore';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Usar Zustand para la autenticación
  const { login: setAuthState, username } = useAuthStore();

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading('Iniciando sesión...', 'Por favor espera...');

    try {
      const response = await authApi(credentials);
      console.log('[Auth] Login success:', { 
        accessToken: response.access ? '✓ Token recibido' : '✗ Sin token', 
        userData: response.user_data 
      });
      
      // Guardar datos en Zustand en lugar de localStorage
      setAuthState({
        access: response.access,
        refresh: undefined, // Este API no devuelve refresh token
        username: response.user_data.username,
        user_data: response.user_data
      });
      
      // Registro para debugging en consola (F12)
      console.log('[Auth] Estado actualizado en Zustand:', { 
        isAuthenticated: true,
        username: response.user_data.username 
      });
      
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
