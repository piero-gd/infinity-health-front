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

// Hook para obtener y formatear los datos de macros
export function useMacrosData(resultado: CalculatorResults | null): Metric[] {
  if (!resultado) return [];

  return [
    {
      id: 'calorias',
      label: 'Calorías',
      value: resultado.calorias,
      unit: 'kcal',
      icon: <FiZap className="w-8 h-8" />,
      color: 'from-yellow-400 to-yellow-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700'
    },
    {
      id: 'proteinas',
      label: 'Proteínas',
      value: resultado.proteinas,
      unit: 'g',
      icon: <FiActivity className="w-8 h-8" />,
      color: 'from-blue-400 to-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-700'
    },
    {
      id: 'grasas',
      label: 'Grasas',
      value: resultado.grasas,
      unit: 'g',
      icon: <FiDroplet className="w-8 h-8" />,
      color: 'from-red-400 to-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700'
    },
    {
      id: 'carbohidratos',
      label: 'Carbohidratos',
      value: resultado.carbohidratos,
      unit: 'g',
      icon: <FiPieChart className="w-8 h-8" />,
      color: 'from-green-400 to-green-500',
      bg: 'bg-green-50',
      text: 'text-green-700'
    }
  ];
}
