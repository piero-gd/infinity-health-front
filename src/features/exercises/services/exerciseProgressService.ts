export interface ExerciseProgressPayload {
  exerciseId: number | string;
  repetitions: string;
  weight: string;
  comment?: string;
  date: string;
}

import { post } from '../../../services/api';

export async function sendExerciseProgress(payload: ExerciseProgressPayload) {
  const token = localStorage.getItem('accessToken');
  
  // Transform payload to match API expectations (data already sanitized at form level)
  const apiPayload = {
    reply: parseInt(payload.repetitions) || 0,  // repetitions -> reply (as integer)
    weight: parseFloat(payload.weight) || 0,    // weight -> weight (as float)
    exercise: payload.exerciseId,               // exerciseId -> exercise
    ...(payload.comment && { comment: payload.comment.trim() }), // include comment if provided
    ...(payload.date && { date: payload.date }) // include date if provided
  };
  
  try {
    console.log('Original payload:', payload);
    console.log('Sanitized & Transformed API payload:', apiPayload);
    return await post<any>('fit-bibliotec/exercise-progress/', apiPayload, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  } catch (error) {
    console.error('Error al guardar el progreso:', error);
    throw new Error('Error al guardar el progreso');
  }}