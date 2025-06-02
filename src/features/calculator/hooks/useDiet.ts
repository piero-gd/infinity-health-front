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

  const handleDownload = () => {
    const element = document.getElementById('diet-plan-content');
    if (!element) {
      console.error('No se encontró el contenido del plan');
      return;
    }

    import('../utils/downloadPDF').then(({ downloadPDF }) => {
      try {
        downloadPDF(element, `Plan_Nutricional_${resultado.nombre}`);
      } catch (err) {
        console.error('Error al generar el PDF:', err);
        alert('Error al generar el PDF');
      }
    });
  };

  return { diet, error, isLoading, handleDownload };
};

export default useDiet;