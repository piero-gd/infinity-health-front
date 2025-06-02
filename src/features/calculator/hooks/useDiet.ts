import { useState, useEffect } from 'react';
import type { Diet, CalculatorResults } from '../types';
import { calculateDiet } from '../services/mealApi';

interface UseDietProps {
  resultado: CalculatorResults;
}

export const useDiet = ({ resultado }: UseDietProps) => {
  const [diet, setDiet] = useState<Diet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cargar datos solo una vez al montar el componente
  useEffect(() => {
    const fetchDiet = async () => {
      if (!resultado?.calorias) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await calculateDiet({
          calorias: Number(resultado.calorias),
          proteinas: Number(resultado.proteinas),
          carbohidratos: Number(resultado.carbohidratos),
          grasas: Number(resultado.grasas),
          nombre: String(resultado.nombre),
          objetivo: String(resultado.objetivo)
        });
        
        setDiet(result);
        console.log("Dieta cargada:", result);
      } catch (err) {
        console.error('Error al obtener la dieta:', err);
        setError('No se pudo cargar el plan de alimentación');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiet();
  }, []); // Array vacío para que solo se ejecute una vez

  // Función para descargar el PDF
  const handleDownload = () => {
    const element = document.getElementById('diet-plan-content');
    if (!element) {
      console.error('No se encontró el contenido del plan');
      return;
    }
    
    import('../utils/downloadPDF').then(({ downloadPDF }) => {
      try {
        downloadPDF(element, `Plan_Nutricional_${resultado.nombre || 'usuario'}`);
      } catch (err) {
        console.error('Error al generar el PDF:', err);
        alert('Error al generar el PDF');
      }
    });
  };

  return { 
    diet, 
    error, 
    isLoading, 
    handleDownload 
  };
};

export default useDiet;