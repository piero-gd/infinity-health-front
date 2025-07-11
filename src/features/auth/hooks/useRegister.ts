import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerApi, type RegisterError } from '../services/registerApi';
import type { RegisterCredentials, RegisterResponse } from '../types';

export interface RegisterHookReturn {
  register: (credentials: RegisterCredentials) => Promise<RegisterResponse>;
  isLoading: boolean;
  error: string | null;
  fieldErrors: {
    email?: string;
    username?: string;
  };
}

export const useRegister = (): RegisterHookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; username?: string }>({});
  const navigate = useNavigate();

  const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await registerApi(credentials);
   
      // Guardar el username en localStorage
      if (response.username) {
        localStorage.setItem('username', response.username);
      }

      // Guardar el email en localStorage
      if (response.email) {
        localStorage.setItem('email', response.email);
      }
      
      // Redirigir al login después de registro exitoso
      navigate('/login');
      return response;
    } catch (error) {
      console.error('Register failed:', error);
      
      if (error instanceof Error) {
        const registerError = error as RegisterError;
        
        // Manejar errores de validación de campos
        const newFieldErrors: { email?: string; username?: string; password?: string } = {};
        let errorMessage = 'Error al registrar la cuenta';
        
        // Extraer errores específicos de campos
        if (registerError.email) {
          newFieldErrors.email = Array.isArray(registerError.email) 
            ? registerError.email[0] 
            : String(registerError.email);
          
          if (!errorMessage.includes('correo')) {
            errorMessage = 'Error en el correo electrónico';
          }
        }
        
        if (registerError.username) {
          newFieldErrors.username = Array.isArray(registerError.username) 
            ? registerError.username[0] 
            : String(registerError.username);
            
          if (!errorMessage.includes('usuario')) {
            errorMessage = 'Error en el nombre de usuario';
          }
        }
        
        // Manejar otros errores comunes
        if (registerError.message) {
          errorMessage = registerError.message;
          
          // Mapear mensajes comunes a mensajes más amigables
          if (errorMessage.toLowerCase().includes('password')) {
            errorMessage = 'La contraseña no cumple con los requisitos';
          } else if (errorMessage.toLowerCase().includes('email')) {
            errorMessage = 'El correo electrónico no es válido';
          } else if (errorMessage.toLowerCase().includes('username')) {
            errorMessage = 'El nombre de usuario no es válido';
          }
        }
        
        // Actualizar estados de error
        if (Object.keys(newFieldErrors).length > 0) {
          setFieldErrors(newFieldErrors);
        }
        
        setError(errorMessage);
      } else {
        setError('Error desconocido al registrar la cuenta');
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error, fieldErrors };
};