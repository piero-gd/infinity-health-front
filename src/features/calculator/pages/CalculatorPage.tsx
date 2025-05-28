import { useState, useRef } from 'react';
import CalculatorForm from '../components/CalculatorForm';
import CalculatorRecomendations from '../components/CalculatorRecomendations';
import CalculatorResult from '../components/CalculatorResult';
import CalculatorInfo from '../components/CalculatorInfo';
import DietPlanView from '../components/DietPlanView';
import type { CalculatorData, CalculatorResults } from '../types/index';
import calculateMacros from '../utils/calculateMacros';

export default function CalculatorPage() {
  const [resultado, setResultado] = useState<CalculatorResults | null>(null);
  const [showDietPlan, setShowDietPlan] = useState(false);
  const resultadosRef = useRef<HTMLDivElement>(null);

  const manejarCalculo = (datos: CalculatorData) => {
    const macrosresult=calculateMacros(datos);
    setResultado(macrosresult);
    console.log("resultado desde page",macrosresult);
    setShowDietPlan(false);
    
    // Hacer scroll suave a los resultados después de que el estado se actualice
    setTimeout(() => {
      resultadosRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };
  
  const handleGenerateDiet = () => {
    setShowDietPlan(true);
  };
  
  const handleBackToResults = () => {
    setShowDietPlan(false);
  };

  return (
    <div className="mx-auto py-6 px-4 w-full max-w-7xl min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Columna izquierda - Formulario */}
        <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-6">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden h-auto">
            <CalculatorForm onCalcular={manejarCalculo} />
          </div>
        </div>
        
        {/* Columna derecha - Contenido informativo, resultados o plan de alimentación */}
        <div ref={resultadosRef} className="lg:col-span-4 xl:col-span-4 2xl:col-span-4">
          {showDietPlan && resultado ? (
            <DietPlanView onBack={handleBackToResults} resultado={resultado}/>
          ) : resultado ? (
            <div className="space-y-4 md:space-y-6">
              {/* Container con fondo azul para los resultados */}
              <div className="bg-blue-600 rounded-2xl shadow-sm overflow-hidden">
                <CalculatorResult resultado={resultado} />
              </div>
              
              {/* Container para las recomendaciones */}
              <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                <CalculatorRecomendations 
                  nombre={resultado.nombre} 
                  objetivo={resultado.objetivo}
                  onGenerateDiet={handleGenerateDiet}
                />
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
