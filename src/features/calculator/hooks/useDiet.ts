import { useState, useCallback, useEffect, useRef } from 'react';
import type { Diet, DietWithMetadata, CalculatorResults } from '../types';
import { calculateDiet } from '../services/mealApi';

// Clave para almacenar en sessionStorage
const DIET_STORAGE_KEY = 'current_diet_data';

interface UseDietProps {
  resultado: CalculatorResults;
}

interface UseDietReturn {
  diet: Diet | null;
  error: string | null;
  isLoading: boolean;
  handleDownload: () => void;
}

export const useDiet = ({ resultado }: UseDietProps): UseDietReturn => {
  const [diet, setDiet] = useState<DietWithMetadata | null>(() => {
    // Intentar cargar la dieta desde sessionStorage al inicio
    try {
      const savedDiet = sessionStorage.getItem(DIET_STORAGE_KEY);
      return savedDiet ? JSON.parse(savedDiet) : null;
    } catch (error) {
      console.error('Error al cargar la dieta guardada:', error);
      return null;
    }
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!diet); // No cargar si ya tenemos datos
  const lastRequestId = useRef<string>('');

  const fetchDiet = useCallback(async () => {
    const currentRequestId = Math.random().toString(36).substring(2, 9);
    lastRequestId.current = currentRequestId;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const requestData = {
        calorias: Number(resultado.calorias),
        carbohidratos: Number(resultado.carbohidratos),
        grasas: Number(resultado.grasas),
        nombre: String(resultado.nombre || ''),
        objetivo: String(resultado.objetivo || ''),
        proteinas: Number(resultado.proteinas)
      };

      // Verificar si ya tenemos estos datos cargados
      const requestKey = JSON.stringify(requestData);
      const savedDiet = sessionStorage.getItem(DIET_STORAGE_KEY);
      
      if (savedDiet) {
        try {
          const parsedDiet = JSON.parse(savedDiet) as DietWithMetadata;
          const savedRequestKey = JSON.stringify({
            calorias: parsedDiet.metadata.calorias,
            carbohidratos: parsedDiet.metadata.carbohidratos,
            grasas: parsedDiet.metadata.grasas,
            nombre: parsedDiet.metadata.nombre,
            objetivo: parsedDiet.metadata.objetivo,
            proteinas: parsedDiet.metadata.proteinas
          });
          
          if (requestKey === savedRequestKey) {
            setDiet(parsedDiet);
            setIsLoading(false);
            return parsedDiet;
          }
        } catch (e) {
          console.error('Error al analizar la dieta guardada:', e);
          // Continuar con la solicitud de red si hay un error al analizar
        }
      }

      console.log('Solicitando dieta con:', requestData);
      const result = await calculateDiet(requestData);
      
      // Solo actualizar si esta es la solicitud más reciente
      if (lastRequestId.current === currentRequestId) {
        // Crear un objeto con los metadatos tipados correctamente
        const dietWithMetadata: DietWithMetadata = {
          ...result,
          metadata: requestData
        };
        
        sessionStorage.setItem(DIET_STORAGE_KEY, JSON.stringify(dietWithMetadata));
        setDiet(dietWithMetadata);
      }
      
      return result;
    } catch (error) {
      if (lastRequestId.current === currentRequestId) {
        console.error('Error al obtener la dieta:', error);
        setError('Error al cargar el plan de alimentación');
      }
      return null;
    } finally {
      if (lastRequestId.current === currentRequestId) {
        setIsLoading(false);
      }
    }
  }, [resultado]);

  useEffect(() => {
    // Solo hacer fetch si no tenemos datos o si los datos no coinciden con la solicitud actual
    const shouldFetch = !diet || 
      !diet.metadata ||
      diet.metadata.calorias !== Number(resultado.calorias) ||
      diet.metadata.proteinas !== Number(resultado.proteinas) ||
      diet.metadata.carbohidratos !== Number(resultado.carbohidratos) ||
      diet.metadata.grasas !== Number(resultado.grasas);

    if (shouldFetch) {
      fetchDiet();
    }
  }, [resultado, diet, fetchDiet]);

  const handleDownload = useCallback(() => {
    try {
      const fileName = `Plan_Nutricional_${resultado.nombre}`;
      const element = document.getElementById('diet-plan-content');
      
      if (!element) {
        throw new Error('No se pudo encontrar el contenido del plan');
      }

      // Clonar el elemento para no afectar al original
      const elementClone = element.cloneNode(true) as HTMLElement;
      
      // Asegurarse de que el clon sea visible para la generación del PDF
      elementClone.style.position = 'fixed';
      elementClone.style.left = '-9999px';
      elementClone.style.top = '0';
      elementClone.style.width = '100%';
      elementClone.style.maxWidth = '800px';
      elementClone.style.margin = '0 auto';
      document.body.appendChild(elementClone);
      
      import('../utils/downloadPDF').then(({ downloadPDF }) => {
        try {
          downloadPDF(elementClone, fileName);
        } catch (error) {
          console.error('Error al generar el PDF:', error);
          alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
        } finally {
          // Limpiar el clon después de la descarga
          if (document.body.contains(elementClone)) {
            document.body.removeChild(elementClone);
          }
        }
      });
    } catch (error) {
      console.error('Error al preparar la descarga:', error);
      alert('Error al preparar la descarga. Por favor, inténtalo de nuevo.');
    }
  }, [resultado.nombre]);

  return {
    diet,
    error,
    isLoading,
    handleDownload
  };
};

export default useDiet;