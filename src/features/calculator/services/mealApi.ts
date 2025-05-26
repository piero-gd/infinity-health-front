import type { CalculatorResults, Diet } from "../types";

export const calculateDiet = async (data: CalculatorResults): Promise<Diet> => {
  try {
    const response = await fetch('https://infinityhealthapi.onrender.com/api/calcMacros/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en calculateDiet:', error);
    throw error;
  }
};