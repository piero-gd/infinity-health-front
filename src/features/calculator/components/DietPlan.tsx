import React from 'react';
import { mockDiets } from '../data/mockDiets';

interface DietPlanProps {
  onBack: () => void;
}

const DietPlan: React.FC<DietPlanProps> = ({ onBack }) => {
  // Usamos la primera dieta del mock para el ejemplo
  const diet = mockDiets[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Tu Plan de Alimentación</h2>
          <button 
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Volver a recomendaciones"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-4">
          <div className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
            {diet.total_calories} kcal
          </div>
          <div className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
            P: {diet.macros.proteins_g}g
          </div>
          <div className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
            C: {diet.macros.carbs_g}g
          </div>
          <div className="bg-white bg-opacity-70 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
            G: {diet.macros.fats_g}g
          </div>
        </div>
      </div>

      {/* Comidas */}
      <div className="p-5 space-y-4">
        {diet.meals.map((meal, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">{meal.name}</h3>
              <span className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
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
