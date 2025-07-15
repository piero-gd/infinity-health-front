import type { LoginCredentials, AuthResponse } from "../types";

const API_URL = 'https://api.infinityhealth.fit/api/token/';

export const authApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const url = API_URL;
  
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
      if (response.status === 401) {
        // Unauthorized errors
        if (data.detail?.includes('not found')) {
          throw new Error('email not found');
        } else if (data.detail?.includes('invalid password')) {
          throw new Error('invalid password');
        } else if (data.detail?.includes('inactive')) {
          throw new Error('inactive account');
        } else if (data.detail?.includes('attempts')) {
          throw new Error('too many attempts');
        } else {
          throw new Error('invalid credentials');
        }
      }
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