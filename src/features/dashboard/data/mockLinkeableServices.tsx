import type { Service } from '../types';
import {
  CalculatorIcon,
  HeartIcon,
  ShoppingBagIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

export const mockLinkableServices: Service[] = [
  {
    id: 1,
    title: 'Calculadora de Macros',
    description: 'Calcula tus macronutrientes diarios personalizados',
    icon: CalculatorIcon,
    bgColor: 'bg-blue-500',
    textColor: 'text-blue-500',
    color: 'from-blue-500 to-blue-600',
    link: '/calculator',
  },
  {
    id: 2,
    title: 'Rutinas de Ejercicios',
    description: 'Explora y personaliza rutinas de entrenamiento',
    icon: HeartIcon,
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    color: 'from-red-500 to-pink-600',
    link: '/exercises',
  },
  {
    id: 3,
    title: 'Tienda E-commerce',
    description: 'Suplementos y productos para tu entrenamiento',
    icon: ShoppingBagIcon,
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    color: 'from-green-500 to-emerald-600',
    link: '/ecommerce',
  },
  {
    id: 4,
    title: 'Progreso y Avances',
    description: 'Visualiza tu progreso y logros alcanzados',
    icon: TrophyIcon,
    bgColor: 'bg-purple-500',
    textColor: 'text-purple-500',
    color: 'from-purple-500 to-indigo-600',
    link: '/progreso',
  },
];