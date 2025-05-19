import type { CalculatorResults } from '../types/index';

interface CalculatorResultProps {
  resultado: CalculatorResults | null;
}

export default function CalculatorResult({ resultado }: CalculatorResultProps) {

  if (!resultado) return null;


  return (
    <div className="p-6 bg-blue-600 text-white rounded-lg shadow-sm max-w-80% mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Resultados</h2>
        
        {/* Imagen de persona haciendo ejercicio */}
        <div className="flex-shrink-0">
          <image className="h-16 w-16" viewBox="0 0 24 24" >
            <source src="/img/ejercicio.png" />
          </image>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className="flex items-center">
          <span className="text-white/80 mr-2">Calorías:</span>
          <span className="flex items-center justify-center bg-white/20 rounded-full px-3 py-1 text-white font-bold">
            {resultado.calorias} kcal
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/80 mr-2">Proteínas:</span>
          <span className="flex items-center justify-center bg-white/20 rounded-full px-3 py-1 text-white font-bold">
            {resultado.proteinas} g
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/80 mr-2">Grasas:</span>
          <span className="flex items-center justify-center bg-white/20 rounded-full px-3 py-1 text-white font-bold">
            {resultado.grasas} g
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="text-white/80 mr-2">Carbohidratos:</span>
          <span className="flex items-center justify-center bg-white/20 rounded-full px-3 py-1 text-white font-bold">
            {resultado.carbohidratos} g
          </span>
        </div>
      </div>
    </div>
  );


};