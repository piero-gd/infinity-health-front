import type { CalculatorResults } from '../types/index';
import { FaAppleAlt } from 'react-icons/fa';
import { getMacrosData } from '../data/macrosData';

interface CalculatorResultProps {
  resultado: CalculatorResults | null;
}

export default function CalculatorResult({ resultado }: CalculatorResultProps) {
  if (!resultado) return null;
  const metrics = getMacrosData(resultado);

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] p-5 text-white">
        <div className="flex justify-between items-start">
          <div className="bg-white/20 p-2 rounded-lg">
            <FaAppleAlt className="h-6 w-6" />
          </div>
          <div className="xl:ml-0 ml-4">
            <h2 className="text-xl md:text-2xl font-bold">Resultados Macros</h2>
            <p className="text-blue-100 text-sm mt-1">Observa tus objetivos diarios</p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 lg:grid-cols-1 gap-4">
          {metrics.map((metric) => (
            <div 
              key={metric.id}
              className={`${metric.bg} ${metric.text} p-4 rounded-xl`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${metric.text}`}>
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
        <div className="mt-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Estos valores son una estimación. Para un plan personalizado, consulta con un nutricionista certificado.
          </p>
        </div>
      </div>
    </div>
  );
}
