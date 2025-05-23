import { useState, useEffect } from 'react';
import mealAPI from '../services/mealApi';

interface Diet {
  meals: {
    name: string;
    calories: number;
    items: {
      food: string;
      quantity: string;
      calories: number;
    }[];
  }[];
}

interface MacrosData {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  nombre?: string;
  objetivo?: string;
}

/**
 * Custom hook para obtener y manejar datos de dieta desde la API
 * @param macrosData Datos de macros para enviar a la API (opcional)
 * @returns Un array con [diet, setDiet, error, loading]
 */
export const useDiet = (macrosData?: MacrosData) => {
  const [diet, setDiet] = useState<Diet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDietData = async () => {
      if (!macrosData) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Llamada a la API para obtener datos de dieta
        const data = await mealAPI();
        console.log('Datos recibidos en useDiet:', data);
        
        // Procesamos los datos según la estructura que venga
        if (data) {
          // Si la API devuelve {status, content} con la estructura completa
          if (data.status === 'success' && data.content) {
            const adaptedData = {
              meals: data.content || []
            };
            setDiet(adaptedData);
          } 
          // Si la API devuelve un array
          else if (Array.isArray(data) && data.length > 0) {
            setDiet(data[0]);
          } 
          // Cualquier otra estructura
          else {
            console.error('Estructura de datos inesperada:', data);
            setError('El formato de los datos recibidos no es compatible');
          }
        } else {
          setError('No se encontraron planes de dieta disponibles');
        }
      } catch (err) {
        console.error('Error al cargar el plan de dieta:', err);
        setError('Error al cargar el plan de dieta. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchDietData();
  }, [macrosData]); // Se ejecutará cuando cambien los datos de macros

  // Función para actualizar la dieta manualmente si es necesario
  const fetchDiet = async (newMacrosData?: MacrosData) => {
    try {
      setLoading(true);
      setError(null);
      
      const dataToUse = newMacrosData || macrosData;
      if (!dataToUse) {
        setError('No hay datos para generar un plan de dieta');
        return;
      }
      
      const data = await mealAPI();
      
      if (data) {
        // Procesamiento similar al useEffect
        if (data.status === 'success' && data.content) {
          const adaptedData = {
            meals: data.content || []
          };
          setDiet(adaptedData);
        } else if (Array.isArray(data) && data.length > 0) {
          setDiet(data[0]);
        } else {
          setError('El formato de los datos recibidos no es compatible');
        }
      } else {
        setError('No se encontraron planes de dieta disponibles');
      }
    } catch (err) {
      console.error('Error al cargar el plan de dieta:', err);
      setError('Error al cargar el plan de dieta. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return [diet, fetchDiet, error, loading] as const;
};

export default useDiet;