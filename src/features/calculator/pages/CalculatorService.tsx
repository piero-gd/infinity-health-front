import { useState } from 'react';
import CalculatorForm from '../components/CalculatorForm';
import CalculatorRecomendations from '../components/CalculatorRecomendations';
import CalculatorResult from '../components/CalculatorResult';
import calcularMacros from '../utils/calcularemacros';
import type { CalculatorData, CalculatorResults} from '../types/index';

export default function CalculatorPage() {
  const [resultado, setResultado] = useState<CalculatorResults | null>(null);

  const manejarCalculo = (datos: CalculatorData) => {
    const calculo = calcularMacros(datos);
    setResultado(calculo);
  };

  return (
    <div className="mx-auto mt-6 md:mt-10 px-4 max-w-3xl">
      <div className="flex flex-col space-y-4 md:space-y-6">
        {/* Container con borde redondeado para el formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          <CalculatorForm onCalcular={manejarCalculo} />
        </div>
        
        {resultado && (
          <>
            {/* Container con fondo azul para los resultados */}
            <div className="bg-blue-600 rounded-2xl shadow-sm overflow-hidden">
              <CalculatorResult resultado={resultado} />
            </div>
            
            {/* Container para las recomendaciones */}
            <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
              <CalculatorRecomendations nombre={resultado.nombre} objetivo={resultado.objetivo} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
