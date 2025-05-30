import React from 'react';
import { FiActivity, FiDroplet, FiZap, FiPieChart } from 'react-icons/fi';
import type { CalculatorResults } from '../types/index';
import type { ReactNode } from 'react';

export interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: ReactNode;
  color: string;
  bg: string;
  text: string;
}

// Función para obtener y formatear los datos de macros
export function getMacrosData(resultado: CalculatorResults | null): Metric[] {
  if (!resultado) return [];

  // Create icon components with proper typing
  const CaloriasIcon: React.FC = () => React.createElement(FiZap, { className: "w-8 h-8" });
  const ProteinasIcon: React.FC = () => React.createElement(FiActivity, { className: "w-8 h-8" });
  const GrasasIcon: React.FC = () => React.createElement(FiDroplet, { className: "w-8 h-8" });
  const CarbohidratosIcon: React.FC = () => React.createElement(FiPieChart, { className: "w-8 h-8" });

  return [
    {
      id: 'calorias',
      label: 'Calorías',
      value: resultado.calorias,
      unit: 'kcal',
      icon: React.createElement(CaloriasIcon),
      color: 'from-yellow-400 to-yellow-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700'
    },
    {
      id: 'proteinas',
      label: 'Proteínas',
      value: resultado.proteinas,
      unit: 'g',
      icon: React.createElement(ProteinasIcon),
      color: 'from-blue-400 to-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-700'
    },
    {
      id: 'grasas',
      label: 'Grasas',
      value: resultado.grasas,
      unit: 'g',
      icon: React.createElement(GrasasIcon),
      color: 'from-red-400 to-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700'
    },
    {
      id: 'carbohidratos',
      label: 'Carbohidratos',
      value: resultado.carbohidratos,
      unit: 'g',
      icon: React.createElement(CarbohidratosIcon),
      color: 'from-green-400 to-green-500',
      bg: 'bg-green-50',
      text: 'text-green-700'
    }
  ];
}
