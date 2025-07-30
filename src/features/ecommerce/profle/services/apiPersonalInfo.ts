const API_BASE_URL = 'https://api.infinityhealth.fit';
import type { PersonalInfoPayload } from "../type";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const updatePersonalInfo = async (payload: PersonalInfoPayload): Promise<PersonalInfoPayload> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/profile/`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to update personal info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating personal info:', error);
    throw error;
  }
};

