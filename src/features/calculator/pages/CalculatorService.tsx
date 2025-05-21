import { useState } from 'react';
import CalculatorForm from '../components/CalculatorForm';
import CalculatorRecomendations from '../components/CalculatorRecomendations';
import CalculatorResult from '../components/CalculatorResult';
import CalculatorInfo from '../components/CalculatorInfo';
import calcularMacros from '../utils/calcularemacros';
import type { CalculatorData, CalculatorResults} from '../types/index';

export default function CalculatorPage() {
  const [resultado, setResultado] = useState<CalculatorResults | null>(null);

  const manejarCalculo = (datos: CalculatorData) => {
    const calculo = calcularMacros(datos);
    setResultado(calculo);
  };

  return (
    <div className="mx-auto py-6 px-4 w-full max-w-7xl min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Columna izquierda - Formulario */}
        <div className="lg:col-span-6 xl:col-span-6.5 2xl:col-span-3.5">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden h-full">
            <CalculatorForm onCalcular={manejarCalculo} />
          </div>
        </div>
        
        {/* Columna derecha - Contenido informativo o resultados */}
        <div className="lg:col-span-4 xl:col-span-3.5 2xl:col-span-6.5">
          {resultado ? (
            <div className="space-y-4 md:space-y-6">
              {/* Container con fondo azul para los resultados */}
              <div className="bg-blue-600 rounded-2xl shadow-sm overflow-hidden">
                <CalculatorResult resultado={resultado} />
              </div>
              
              {/* Container para las recomendaciones */}
              <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                <CalculatorRecomendations nombre={resultado.nombre} objetivo={resultado.objetivo} />
              </div>
            </div>
          ) : (
            <CalculatorInfo />
          )}
        </div>
      </div>
    </div>
  );
}
