// src/features/routines/services/routinesApi.ts
import type { Routine, Exercise } from '../types';

// Modelo intermedio según la respuesta del servidor
interface APIExercise {
  id: number;
  titulo: string;
  descripcion: string;
  video_url: string | null;
  rutina: number;
  foto: string | null;
}

// Si más adelante hay un endpoint para metadata de rutina, ajusta esta interfaz.
interface APIRoutine {
  id: number;
  titulo: string;
  descripcion: string;
  fotos: string | null;
  ejercicios: APIExercise[];
}

/**
 * Fetch de rutinas con grouping de ejercicios.
 */
export const getRoutines = async (): Promise<Routine[]> => {
  const url = '/api/fit/rutinas/';  // Usa proxy de Vite, apunta al backend real
  console.log('[routinesApi] Fetching routines from', url);

  let response: Response;
  try {
    response = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
  } catch (networkError) {
    console.error('[routinesApi] Network error:', networkError);
    throw new Error('Network error al conectar con la API de rutinas');
  }

  console.log('[routinesApi] HTTP status:', response.status);
  if (!response.ok) {
    const text = await response.text().catch(() => '<no body>');
    console.error('[routinesApi] API respondió con error:', text);
    throw new Error(`API de rutinas respondió con status ${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    console.error('[routinesApi] content-type no es JSON:', contentType);
    throw new Error('Respuesta inesperada (no JSON) de la API de rutinas');
  }

  let data: APIRoutine[];
  try {
    data = await response.json();
    console.log('[routinesApi] Parsed JSON:', data);
  } catch (parseError) {
    console.error('[routinesApi] Error parseando JSON:', parseError);
    throw new Error('La API de rutinas devolvió JSON mal formado');
  }

  // Transformamos payload en nuestro tipo interno Routine
  const routines: Routine[] = data.map((r) => ({
    id: r.id,
    titulo: r.titulo,
    descripcion: r.descripcion,
    fotos: r.fotos ?? '',
    ejercicios: r.ejercicios.map((e): Exercise => ({
      id: e.id,
      titulo: e.titulo,
      descripcion: e.descripcion,
      video: e.video_url ?? '',
      foto: e.foto ?? '',
      rutina: e.rutina,
    })),
  }));

  console.log('[routinesApi] routines transformadas:', routines);
  return routines;
};