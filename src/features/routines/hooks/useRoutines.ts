// src/features/routines/hooks/useRoutines.ts

import { useEffect, useState } from 'react';
import { getRoutines } from '../services/routinesApi';
import type { Routine } from '../types/index';

export const useRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(0);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRoutines();
        setRoutines(data);
      } catch (err) {
        setError('Error al cargar las rutinas');
      }
    };
    fetchData();
  }, []);

  const currentRoutine = routines[selectedRoutineIndex];
  const currentExercise = currentRoutine?.ejercicios[selectedExerciseIndex];

  return {
    routines,
    error,
    currentRoutine,
    currentExercise,
    selectedRoutineIndex,
    selectedExerciseIndex,
    setSelectedRoutineIndex,
    setSelectedExerciseIndex,
  };
};
