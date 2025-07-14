import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../services/registerApi';
import type { RegisterCredentials, RegisterResponse } from '../types';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerApi(credentials);
      
      // Guardar datos en localStorage si es necesario
      if (response.username) {
        localStorage.setItem('username', response.username);
      }

      if (response.email) {
        localStorage.setItem('email', response.email);
      }
      
      navigate('/login');
      return response;
    } catch (error) {
      console.error('Register failed:', error);
      
      let errorMessage = 'Error al registrar la cuenta';
      
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = error.message as string;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};