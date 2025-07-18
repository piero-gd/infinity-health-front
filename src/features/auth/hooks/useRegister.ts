import { registerApi } from '../services/registerApi';
import type { RegisterCredentials, RegisterResponse } from '../types';

export const useRegister = () => {
  const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    const response = await registerApi(credentials);
    
    // Guardar datos en localStorage
    if (response.username) {
      localStorage.setItem('username', response.username);
    }
    
    if (response.email) {
      localStorage.setItem('email', response.email);
    }
    
    return response;
  };

  return { register };
};