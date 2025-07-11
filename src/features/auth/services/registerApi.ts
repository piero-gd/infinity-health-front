import type { RegisterCredentials, RegisterResponse } from "../types";

export interface RegisterError extends Error {
    email?: string[];
    username?: string[];
}

export const registerApi = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    const url = 'https://api.infinityhealth.fit/api/users/register/';
    
    console.log('Sending registration request to:', url);
    console.log('Request payload:', JSON.stringify(credentials, null, 2));
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        console.log('Response status:', response.status, response.statusText);
        const data = await response.json();
        console.log('Response data:', JSON.stringify(data, null, 2));

        if (!response.ok) {
            const error: RegisterError = new Error(
                data.detail || 
                data.message || 
                `Error: ${response.status} ${response.statusText}`
            );
            
            // Handle specific error cases
            if (response.status === 400) {
                console.error('Validation errors:', data);
                
                if (typeof data === 'object' && data !== null) {
                    // Manejar errores de validación del backend
                    if (Array.isArray(data.email)) {
                        error.email = data.email[0];
                        error.message = 'Error de validación en el correo';
                    }
                    if (Array.isArray(data.username)) {
                        error.username = data.username[0];
                        error.message = 'Error de validación en el nombre de usuario';
                    }
                    if (Array.isArray(data.password)) {
                        error.message = 'Error de validación en la contraseña';
                    }
                    
                    // Si no hay un mensaje de error específico, usar el mensaje general
                    if (!error.message && data.detail) {
                        error.message = data.detail;
                    }
                } else if (typeof data === 'string') {
                    error.message = data;
                }
            }
            
            throw error;
        }

        // Ensure the response includes the email
        const registerResponse: RegisterResponse = {
            ...data,
            email: data.email || credentials.email
        };

        return registerResponse;
    } catch (error) {
        console.error('Register failed:', error);
        throw error;
    }
}

