import type { CalculatorResults } from '../types/index';
import { FiActivity, FiDroplet, FiZap, FiPieChart } from 'react-icons/fi';

interface CalculatorResultProps {
  resultado: CalculatorResults | null;
}

export default function CalculatorResult({ resultado }: CalculatorResultProps) {
  if (!resultado) return null;

  const metrics = [
    {
      id: 'calorias',
      label: 'Calorías',
      value: resultado.calorias,
      unit: 'kcal',
      icon: <FiZap className="w-5 h-5" />,
      color: 'from-yellow-400 to-yellow-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-700'
    },
    {
      id: 'proteinas',
      label: 'Proteínas',
      value: resultado.proteinas,
      unit: 'g',
      icon: <FiActivity className="w-5 h-5" />,
      color: 'from-blue-400 to-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-700'
    },
    {
      id: 'grasas',
      label: 'Grasas',
      value: resultado.grasas,
      unit: 'g',
      icon: <FiDroplet className="w-5 h-5" />,
      color: 'from-red-400 to-red-500',
      bg: 'bg-red-50',
      text: 'text-red-700'
    },
    {
      id: 'carbohidratos',
      label: 'Carbohidratos',
      value: resultado.carbohidratos,
      unit: 'g',
      icon: <FiPieChart className="w-5 h-5" />,
      color: 'from-green-400 to-green-500',
      bg: 'bg-green-50',
      text: 'text-green-700'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-accent)] p-5 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Tu Plan de Nutrición</h2>
            <p className="text-blue-100 text-sm mt-1">Basado en tus datos y objetivos</p>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              className={`${metric.bg} ${metric.text} p-4 rounded-xl border border-opacity-30 border-gray-200`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${metric.bg.replace('50', '100')} ${metric.text}`}>
                    {metric.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-80">{metric.label}</div>
                    <div className="text-2xl font-bold">
                      {metric.value} <span className="text-sm font-normal opacity-80">{metric.unit}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-30">
                  {metric.id === 'calorias' ? 'Diarias' : 'Por día'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota al pie */}
        <div className="mt-6 bg-blue-50 p-3 rounded-lg border border-[var(--color-primary)]">
          <p className="text-xs text-[var(--color-primary)] text-center">
            Estos valores son una estimación. Para un plan personalizado, consulta con un nutricionista certificado.
          </p>
        </div>
      </div>
    </div>
  );
};