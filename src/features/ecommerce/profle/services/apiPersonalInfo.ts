const API_BASE_URL = 'https://api.infinityhealth.fit';
import type { dataProfileResponse } from "../type";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const fetchProfile = async (): Promise<dataProfileResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/profile/`, {
      method: 'PUT',
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

