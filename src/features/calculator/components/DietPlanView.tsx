import React, { useEffect, useState, useCallback } from 'react';
import { calculateDiet } from '../services/mealApi';
import { TbBookDownload } from "react-icons/tb";
import { IoChatbubbles } from "react-icons/io5";
import type { CalculatorResults, Diet } from '../types';
import { downloadPDF } from '../utils/downloadPDF';

interface DietPlanProps {
  onBack: () => void;
  resultado: CalculatorResults;
}

const DietPlan: React.FC<DietPlanProps> = ({ 
  onBack, 
  resultado
}) => {
  //const dietPlanRef = useRef<HTMLDivElement>(null);
  const [diet, setDiet] = useState<Diet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  //crear   pdf
  const handleDownload = useCallback(() => {
    // Usar el nombre del usuario para el archivo
    const fileName = `Plan_Nutricional_${resultado.nombre}`;
    const element = document.getElementById('diet-plan-content');
    if (element) {
      downloadPDF(element, fileName);
    } else {
      console.error('No se pudo encontrar el contenido del plan');
      alert('No se pudo generar el PDF. Por favor, inténtalo de nuevo.');
    }
  }, [resultado.nombre]);

  useEffect(() => {
    // Bandera para evitar actualizar estado si el componente se desmonta
    let isMounted = true;
    // Controlador para cancelar la petición si es necesario
    const controller = new AbortController();

    const fetchDietData = async () => {
      try {
        // 1. Preparamos los datos para la API
        const requestData = {
          calorias: Number(resultado.calorias),
          carbohidratos: Number(resultado.carbohidratos),
          grasas: Number(resultado.grasas),
          nombre: String(resultado.nombre || ''),
          objetivo: String(resultado.objetivo || ''),
          proteinas: Number(resultado.proteinas)
        };
        
        // 2. Mostramos los datos que se enviarán
        console.log('Solicitando dieta con:', requestData);
        
        // 3. Hacemos la petición a la API
        const result = await calculateDiet(requestData as CalculatorResults);
        
        // 4. Si el componente sigue montado, actualizamos el estado
        if (isMounted) {
          setDiet(result);
          setError(null);
        }
        
      } catch (err) {
        // 5. Manejamos errores solo si el componente sigue montado
        if (isMounted) {
          console.error('Error al obtener la dieta:', err);
          setError('Error al cargar el plan de alimentación');
        }
      } finally {
        // 6. Desactivamos el estado de carga
        if (isMounted) setIsLoading(false);
      }
    };

    // Ejecutamos la función de carga
    fetchDietData();

    // Función de limpieza que se ejecuta al desmontar el componente
    return () => {
      isMounted = false;  // Evita actualizaciones de estado
      controller.abort(); // Cancela la petición en curso
    };
  }, [resultado]); // Se ejecuta cuando cambia 'resultado'

  // handleDownload está definido arriba con useCallback

  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
        <div className="flex justify-center">
          {/* Spinner de pierex */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--color-primary)] mb-4"></div>
        </div>
        <p className="mt-4 text-gray-600">Cargando tu plan de alimentación...</p>
      </div>
    );
  }

  // Estado de error
  if (error || !diet) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-700">{error || 'No se pudo cargar el plan de dieta'}</p>
        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Reintentar'}
          </button>
          <button 
            onClick={onBack}
            
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    );

   
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-accent)] p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Plan Nutricional para {resultado.nombre}</h2>
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 bg-gray-50 rounded-full px-4 py-2"
            aria-label="Volver a recomendaciones"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-4">
          <div className="bg-yellow-100 bg-opacity-30 px-3 py-1 rounded-full text-sm font-bold text-yellow-800">
            {resultado.calorias} kcal
          </div>
          <div className="bg-blue-50 bg-opacity-30 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
            P: {resultado.proteinas}g
          </div>
          <div className="bg-green-50 bg-opacity-30 px-3 py-1 rounded-full text-sm font-medium text-green-800">
            C: {resultado.carbohidratos}g
          </div>
          <div className="bg-red-50 bg-opacity-30 px-3 py-1 rounded-full text-sm font-medium text-red-800">
            G: {resultado.grasas}g
          </div>
          
        </div>

        <div className="mt-2 flex justify-left gap-2">
        <button 
            onClick={handleDownload}
            id="download-pdf"
            className="bg-red-100 flex items-center justify-center bg-opacity-30 shadow-sm px-5 py-2 rounded-full border border-red-500 text-sm font-bold text-red-800 hover:bg-red-500 hover:text-white transition-colors"
            aria-label="Descargar plan"
          >
            <TbBookDownload />
           <span className="ml-2">Descargar PDF</span>
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-100 flex items-center  justify-center bg-opacity-30 shadow-sm px-5 py-2 rounded-full border border-green-500 text-sm font-bold text-green-800 hover:bg-green-500 hover:text-white transition-colors"
            aria-label="Consulta Nutricional"
          >
            <IoChatbubbles />
           <span className="ml-2 flex"> Consulta Nutricional</span>
          </button>
        </div>
       
      </div>

      {/* Comidas */}
      <div id="diet-plan-content"  className="p-5 space-y-4">
        {diet?.content?.map((meal, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">{meal.name}</h3>
              <span className="text-sm font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                {meal.calories} kcal
              </span>
            </div>
            <ul className="space-y-2">
              {meal.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex justify-between text-sm">
                  <span className="text-gray-700 mt-2">{item.food}</span>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">{item.quantity}</span>
                    <span className="text-gray-400 text-sm">({item.calories} kcal)</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-gray-100 bg-gray-50">
        <p className="text-sm text-gray-600 text-center">
        Este es un plan referencial, para una atención especializada te recomendamos consultar con tu nutricionista/o médico  de cabecera.
        </p>
      </div>
    </div>
  );
};

export default DietPlan;