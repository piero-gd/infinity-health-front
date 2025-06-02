export interface ExerciseProgressPayload {
  exerciseId: number | string;
  repetitions: string;
  weight: string;
  comment?: string;
  date: string;
}

export async function sendExerciseProgress(payload: ExerciseProgressPayload) {
  const response = await fetch('/api/exercise-progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Error al guardar el progreso');
  }

  return response.json();
}