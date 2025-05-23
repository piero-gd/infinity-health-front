import type { CalculatorResults } from '../types/index';
import { FiActivity, FiDroplet, FiZap, FiPieChart } from 'react-icons/fi';
import { FaAppleAlt } from 'react-icons/fa';

interface CalculatorResultProps {
  resultado: CalculatorResults | null;
}

export default function CalculatorResult({ resultado }: CalculatorResultProps) {
  if (!resultado) return null;

  console.log(resultado);

  const metrics = [
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

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-accent)] p-5 text-white">
        <div className="flex justify-between items-start">
          <div className="bg-white/20 p-2 rounded-lg">
            <FaAppleAlt className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Resultados Macros</h2>
            <p className="text-blue-100 text-sm mt-1">Observa tus objetivos diarios</p>
          </div>
          
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              className={`${metric.bg} ${metric.text} p-4 rounded-xl `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl  ${metric.text}`}>
                    {metric.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-80">{metric.label}</div>
                    <div className="text-2xl font-bold">
                      {metric.value} <span className="text-sm font-normal opacity-80">{metric.unit}</span>
                    </div>
                  </div>
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