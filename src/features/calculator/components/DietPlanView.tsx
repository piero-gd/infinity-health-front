import React, { useCallback, useEffect } from 'react';
import useDiet from '../hooks/useDiet';
import type { CalculatorResults } from '../types';

interface DietPlanProps {
  onBack: () => void;
  resultado: CalculatorResults;
}

const DietPlan: React.FC<DietPlanProps> = ({ 
  onBack, 
  resultado
}) => {
  const { diet, error, loading, fetchDiet } = useDiet();

  const handleGetDiet = useCallback(async () => {
    console.log('Solicitando dieta con:', { resultado });
    const calculatorData = {
      calorias: Number(resultado.calorias),
      carbohidratos: Number(resultado.carbohidratos),
      grasas: Number(resultado.grasas),
      nombre: String(resultado.nombre || ''),
      objetivo: String(resultado.objetivo || ''),
      proteinas: Number(resultado.proteinas)
    };
    
   // console.log('Datos a enviar a la API:', JSON.stringify(calculatorData, null, 2));
    
    try {
      await fetchDiet(calculatorData as CalculatorResults);
    } catch (err) {
      console.error('Error al obtener la dieta:', err);
    }
  }, [resultado, fetchDiet]);

  // Llamar a handleGetDiet cuando el componente se monte o cambien las dependencias
  useEffect(() => {
    console.log('useEffect en DietPlan ejecutado');
    handleGetDiet();
  }, [handleGetDiet]);

  // Estado de carga
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
            onClick={handleGetDiet}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Reintentar'}
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
          <h2 className="text-xl font-bold text-white">Tu Plan de Alimentación</h2>
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
      </div>

      {/* Comidas */}
      <div className="p-5 space-y-4">
        {diet.content.map((meal, index) => (
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
                  <span className="text-gray-700">{item.food}</span>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">{item.quantity}</span>
                    <span className="text-gray-400 text-xs">({item.calories} kcal)</span>
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
          Este plan es una guía general. Ajusta las porciones según tus necesidades específicas.
        </p>
      </div>
    </div>
  );
};

export default DietPlan;