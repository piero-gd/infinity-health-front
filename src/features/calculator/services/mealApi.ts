import type { CalculatorResults, Diet } from "../types";
import { post } from "../../../services/api";

export const calculateDiet = async (data: CalculatorResults): Promise<Diet> => {
  try {
<<<<<<< HEAD
    const token = localStorage.getItem('accessToken');
    
    const response = await post<Diet>('calcMacros/', data, {
=======
    const response = await fetch('https://api.infinityhealth.fit/api/calcMacros/', {
      method: 'POST',
>>>>>>> feature/login
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    console.log("[mealApi] calculateDiet response:", response);
    return response;
  } catch (error) {
    console.error('Error en calculateDiet:', error);
    throw error;
  }
};