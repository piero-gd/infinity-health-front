import type { LoginCredentials, AuthResponse } from "../types";

export const authApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const url = 'https://api.infinityhealth.fit/api/token/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || 
        data.message || 
        `Error: ${response.status} ${response.statusText}`
      );
    }

    // Ensure the response includes the username
    const authResponse: AuthResponse = {
      ...data,
      username: data.username || credentials.username
    };

    return authResponse;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error;
  }
};