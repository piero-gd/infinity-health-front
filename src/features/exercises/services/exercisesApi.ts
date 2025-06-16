import type { Exercise } from "../types/exercise";

const API_URL = "https://infinityhealthapi.onrender.com/api/fit-bibliotec/exercises/";

export async function fetchExercises(): Promise<Exercise[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener los ejercicios");
  const data = await res.json();
  console.log("[exercisesApi] fetchExercises data:", data);
  return data;
}