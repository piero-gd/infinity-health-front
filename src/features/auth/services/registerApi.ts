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
        const error = new Error(
            data.detail || 
            data.message || 
            `Error: ${response.status} ${response.statusText}`
        );
        
        // Añadir información de validación si está disponible
        if (response.status === 400 && typeof data === 'object' && data !== null) {
            // Agregar mensajes de validación específicos si existen
            const validationErrors = [];
            
            if (Array.isArray(data.email)) validationErrors.push(data.email[0]);
            if (Array.isArray(data.username)) validationErrors.push(data.username[0]);
            if (Array.isArray(data.password)) validationErrors.push('Error en la contraseña');
            
            if (validationErrors.length > 0) {
                error.message = validationErrors.join('. ');
            }
        }
        
        throw error;
    }

    // Asegurar que la respuesta incluya el email
    return {
        ...data,
        email: data.email || credentials.email
    };
}

