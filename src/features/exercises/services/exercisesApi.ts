import type { Exercise } from "../types/exercise";
import { get } from "../../../services/api";
import { getAuthHeaders } from "../../../services/authService";

export async function fetchExercises(): Promise<Exercise[]> {
  try {
    const data = await get<Exercise[]>('fit-bibliotec/exercises', {
      headers: getAuthHeaders(),
    });
    
    console.log("[exercisesApi] fetchExercises data:", data);
    return data;
  } catch (error) {
    console.error("[exercisesApi] Error fetching exercises:", error);
    throw new Error("Error al obtener los ejercicios");
  }
}