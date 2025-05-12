import { useEffect, useState, useCallback } from 'react';
import { getRoutines } from '../services/routinesApi';
import type { Routine } from '../types/index';

export const useRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoutineIndex, setSelectedRoutineIndex] = useState(0);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    getRoutines()
      .then(setRoutines)
      .catch(() => setError('Error al cargar las rutinas'));
  }, []);

  const currentRoutine = routines[selectedRoutineIndex];
  const currentExercise = currentRoutine?.ejercicios[selectedExerciseIndex];

  const nextExercise = useCallback(() => {
    const nextIndex = selectedExerciseIndex + 1;
    if (currentRoutine && nextIndex < currentRoutine.ejercicios.length) {
      setSelectedExerciseIndex(nextIndex);
    } else {
      // fin de la rutina: podrías resetear o navegar fuera
      setSelectedExerciseIndex(0);
    }
  }, [selectedExerciseIndex, currentRoutine]);

  const handleVideoEnd = () => {
    setIsResting(true);
  };

  const handleRestComplete = () => {
    setIsResting(false);
    nextExercise();
  };

  return {
    routines,
    error,
    currentRoutine,
    currentExercise,
    selectedRoutineIndex,
    selectedExerciseIndex,
    setSelectedRoutineIndex,
    setSelectedExerciseIndex,
    isResting,
    handleVideoEnd,
    handleRestComplete,
  };
};
