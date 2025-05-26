import { useState, useCallback } from 'react';
import type { Diet } from '../types';
import { calculateDiet } from '../services/mealApi';
import type { CalculatorResults } from '../types/index';

interface UseDietReturn {
  diet: Diet | null;
  error: string | null;
  loading: boolean;
  fetchDiet: (data: CalculatorResults) => Promise<void>;
}

export const useDiet = (): UseDietReturn => {
  const [diet, setDiet] = useState<Diet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDiet = useCallback(async (data: CalculatorResults): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      console.log('Iniciando fetchDiet con datos:', data);
      
      const result = await calculateDiet(data);
      console.log('Respuesta de la API:', result);
      
      setDiet(result);
    } catch (error) {
      console.error('Error en fetchDiet:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error al calcular la dieta';
      setError(errorMessage);
      setDiet(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    diet,
    error,
    loading,
    fetchDiet
  };
};

export default useDiet;