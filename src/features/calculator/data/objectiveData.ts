import React from 'react';

// Tipos para los datos del objetivo
export interface ObjectiveData {
  title: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  tipBg: string;
  tipBorder: string;
  tipText: string;
}

// Función para obtener los datos del objetivo
export function getObjectiveData(objetivo: string): ObjectiveData | null {
  if (!objetivo) return null;

  // Datos según el objetivo
  switch(objetivo) {
    case 'Perder Grasa':
      return {
        title: 'Perder Grasa',
        icon: React.createElement('svg', { 
          className: 'w-5 h-5', 
          fill: 'none', 
          stroke: 'currentColor', 
          viewBox: '0 0 24 24' 
        }, 
          React.createElement('path', { 
            strokeLinecap: 'round', 
            strokeLinejoin: 'round', 
            strokeWidth: 2, 
            d: 'M19 14l-7 7m0 0l-7-7m7 7V3' 
          })
        ),
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        gradient: 'from-orange-500 to-orange-600',
        tipBg: 'bg-orange-50',
        tipBorder: 'border-orange-100',
        tipText: 'text-orange-700'
      };
    
    case 'Ganar Músculo':
      return {
        title: 'Ganar Músculo',
        icon: React.createElement('svg', { 
          className: 'w-5 h-5', 
          fill: 'none', 
          stroke: 'currentColor', 
          viewBox: '0 0 24 24' 
        },
          React.createElement('path', { 
            strokeLinecap: 'round', 
            strokeLinejoin: 'round', 
            strokeWidth: 2, 
            d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' 
          })
        ),
        color: 'bg-green-100 text-green-800 border-green-200',
        gradient: 'from-green-500 to-green-600',
        tipBg: 'bg-green-50',
        tipBorder: 'border-green-100',
        tipText: 'text-green-700'
      };
    
    case 'Mantener Peso':
      return {
        title: 'Mantener Peso',
        icon: React.createElement('svg', { 
          className: 'w-5 h-5', 
          fill: 'none', 
          stroke: 'currentColor', 
          viewBox: '0 0 24 24' 
        },
          React.createElement('path', { 
            strokeLinecap: 'round', 
            strokeLinejoin: 'round', 
            strokeWidth: 2, 
            d: 'M5 13l4 4L19 7' 
          })
        ),
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        gradient: 'from-yellow-500 to-yellow-600',
        tipBg: 'bg-yellow-50',
        tipBorder: 'border-yellow-100',
        tipText: 'text-yellow-700'
      };
    
    default:
      return {
        title: 'Sin objetivo',
        icon: null,
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        gradient: 'from-gray-500 to-gray-600',
        tipBg: 'bg-gray-50',
        tipBorder: 'border-gray-100',
        tipText: 'text-gray-700'
      };
  }
}
