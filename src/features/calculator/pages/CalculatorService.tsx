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
    <div className="max-w-md mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Calculadora de Macros</h1>
      <CalculatorForm onCalcular={manejarCalculo} />
      {resultado ? (
        <>
          <CalculatorResult resultado={resultado} />
          <CalculatorRecomendations nombre={resultado.nombre} objetivo={resultado.objetivo} />
        </>
      ) : null}
    </div>
  );
}
