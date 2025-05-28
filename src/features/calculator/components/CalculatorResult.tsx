import type { CalculatorResults } from '../types/index';
import { FaAppleAlt } from 'react-icons/fa';
import { useMacrosData } from '../hooks/useMacrosData';

interface CalculatorResultProps {
  resultado: CalculatorResults | null;
}

export default function CalculatorResult({ resultado }: CalculatorResultProps) {
  if (!resultado) return null;

  console.log(resultado);

  // Usamos el hook para obtener los datos de macros
  const metrics = useMacrosData(resultado);

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
        <div className="mt-6 bg-blue-50 p-3 rounded-lg border border-[var(--color-primary)]">
          <p className="text-sm text-[var(--color-primary)] text-center">
            Estos valores son una estimación. Para un plan personalizado, consulta con un nutricionista certificado.
          </p>
        </div>
      </div>
    </div>
  );
}
