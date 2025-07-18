import type { RegisterCredentials, RegisterResponse } from "../types";

const API_URL = 'https://api.infinityhealth.fit/api/users/register/';

export const registerApi = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
        // Manejar errores de validación específicos
        if (response.status === 400 && typeof data === 'object' && data !== null) {
            const validationErrors: string[] = [];
            
            // Manejar errores de email
            if (data.email) {
                if (Array.isArray(data.email)) {
                    validationErrors.push(`El correo electrónico ${data.email[0].toLowerCase()}`);
                } else if (typeof data.email === 'string') {
                    validationErrors.push(`El correo electrónico ${data.email.toLowerCase()}`);
                }
            }
            
            // Manejar errores de username
            if (data.username) {
                if (Array.isArray(data.username)) {
                    validationErrors.push(`El nombre de usuario ${data.username[0].toLowerCase()}`);
                } else if (typeof data.username === 'string') {
                    validationErrors.push(`El nombre de usuario ${data.username.toLowerCase()}`);
                }
            }
            
            // Manejar errores de contraseña
            if (data.password) {
                if (Array.isArray(data.password)) {
                    validationErrors.push(`Error en la contraseña: ${data.password[0]}`);
                } else if (typeof data.password === 'string') {
                    validationErrors.push(`Error en la contraseña: ${data.password}`);
                }
            }
            
            if (validationErrors.length > 0) {
                throw new Error(validationErrors.join('\n'));
            }
        }
        
        // Manejar otros errores
        const errorMessage = data.detail || data.message || `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    // Asegurar que la respuesta incluya el email
    return {
        ...data,
        email: data.email || credentials.email
    };
}
