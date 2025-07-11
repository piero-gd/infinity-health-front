import type { Exercise } from "../types/exercise";

const API_URL = "https://api.infinityhealth.fit/api/fit-bibliotec/exercises";

export async function fetchExercises(): Promise<Exercise[]> {
  const token = localStorage.getItem('accessToken');
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  });


  if (!res.ok) throw new Error("Error al obtener los ejercicios");
  const data = await res.json();
  console.log("[exercisesApi] fetchExercises data:", data);
  return data;
}