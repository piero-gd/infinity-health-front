import type { CalculatorResults, Diet } from "../types";
import { post } from "../../../services/api";
import { getAuthHeaders } from "../../../services/authService";

export const calculateDiet = async (data: CalculatorResults): Promise<Diet> => {
  try {
    const response = await post<Diet>('calcMacros/', data, {
      headers: getAuthHeaders()
    });

    console.log("[mealApi] calculateDiet response:", response);
    return response;
  } catch (error) {
    console.error('Error en calculateDiet:', error);
    throw error;
  }
};