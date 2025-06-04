import { useState, useEffect, useRef } from 'react';
import type { Diet, CalculatorResults } from '../types';
import { calculateDiet } from '../services/mealApi';

interface UseDietProps {
  resultado: CalculatorResults;
}

export const useDiet = ({ resultado }: UseDietProps) => {
  const [diet, setDiet] = useState<Diet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Si ya se hizo la consulta o no hay resultado, no hacer nada
    if (hasFetched.current || !resultado) return;

    // Marcar que ya se hizo la consulta
    hasFetched.current = true;
    
    setIsLoading(true);
    setError(null);

    const fetchDiet = async () => {
      try {
        const result = await calculateDiet(resultado);
        setDiet(result);
      } catch (err) {
        console.error('Error al obtener la dieta:', err);
        setError('No se pudo cargar el plan de alimentación');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiet();
  }, [resultado]); // Solo se ejecuta cuando resultado cambia

  const handleDownload = async () => {
    try {
    const element = document.getElementById('diet-plan-content');
    if (!element) {
      throw new Error('No se encontró el contenido del plan');
    }

    const {downloadPDF} = await import('../utils/downloadPDF');
  downloadPDF(element, `Plan Nutricional para ${resultado.nombre}`);
  } catch (err) {
    console.error('Error al generar el PDF:', err);
    setError('Error al generar el PDF, intente de nuevo');
  }
};

  return { diet, error, isLoading, handleDownload };
};

export default useDiet;