import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { chatWhatsApp } from '../utils/chatWhatsApp';
import type { CalculatorResults } from '../types';
import { useDiet } from '../hooks/useDiet';

interface DietPlanProps {
  resultado: CalculatorResults;
}

const DietPlan: React.FC<DietPlanProps> = ({ 
  resultado
}) => {
  const { diet, error, isLoading, handleDownload } = useDiet({ resultado });

  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-[var(--color-primary-dark)] overflow-hidden p-8 text-center">
        <div className="flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--color-primary)] mb-4"></div>
        </div>
        <p className="mt-4 text-gray-600">Cargando tu plan de alimentación...</p>
        <p className="mt-2 text-xs text-gray-600">Esto puede tomar unos momentos</p>
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
            className="px-1 py-1 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-accent)] transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Reintentar'}
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
      <div className="bg-white p-3">
      <div className="mt-2 flex justify-left gap-2">
        <button 
            onClick={handleDownload}
            id="download-pdf"
            className="bg-white flex items-center justify-center bg-opacity-30 shadow-sm px-5 py-2 rounded-full text-sm font-bold text-red-800 hover:bg-red-500 hover:text-white transition-colors"
            aria-label="Descargar plan"
          >
           <BsDownload />
           <span className="ml-2">Descargar PDF</span>
          </button>
          <button 
            onClick={() => chatWhatsApp()}
            className="bg-white flex items-center  justify-center bg-opacity-30 shadow-sm px-5 py-2 rounded-full  text-sm font-bold text-green-800 hover:bg-green-500 hover:text-white transition-colors"
            aria-label="Consulta Nutricional"
          >
            <FaWhatsapp />
           <span className="ml-2 flex"> Consulta Asesoría Nutricional</span>
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