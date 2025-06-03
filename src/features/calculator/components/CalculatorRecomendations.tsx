import { getRandomTip, type Objetivo } from '../data/tipsRandom';
import { FaAppleAlt } from 'react-icons/fa';
import { getObjectiveData } from '../data/objectiveData';

interface CalculatorRecomendationsProps {
  nombre: string;
  objetivo: string;
  onGenerateDiet: () => void;
}

export default function CalculatorRecomendations({ objetivo, nombre, onGenerateDiet }: CalculatorRecomendationsProps) {
   const objectiveData = getObjectiveData(objetivo);
   const tip = getRandomTip(objetivo as Objetivo);
   
   if (!objetivo || !objectiveData) return null;
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
    
      <div className={`absolute right-0 top-0 flex items-center px-3 py-1 ${objectiveData.color} border-b border-l rounded-bl-lg z-10`}>
        {objectiveData.icon}
        <span className="ml-1 text-sm font-medium">{objectiveData.title}</span>
      </div>

      <div className="p-6 pt-10">
        <div className="flex items-start">
          <div className={`flex-shrink-0 mr-4 p-2 rounded-full ${objectiveData.tipBg} ${objectiveData.tipBorder} border`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${objectiveData.tipText}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              ¡Excelente, {nombre}!
            </h3>
            <div className={`${objectiveData.tipText} text-sm leading-relaxed`}>
              <p className="mb-3">{tip}</p>
              
              <div className={`mt-4 p-3 rounded-lg bg-opacity-20  ${objectiveData.tipBg} ${objectiveData.tipBorder} border`}>
                <h4 className="font-semibold text-gray-800 mb-1">Consejo del día</h4>
                <p className="text-sm text-gray-700">
                  {objetivo === 'Perder Grasa' && 'Recuerda mantener un déficit calórico moderado para una pérdida de grasa sostenible.'}
                  {objetivo === 'Ganar Músculo' && 'Asegúrate de consumir suficientes proteínas y descansar adecuadamente para el crecimiento muscular.'}
                  {objetivo === 'Mantener Peso' && 'Mantén un equilibrio entre tu ingesta calórica y tu gasto energético diario.'}
                </p>
              </div> 
              <button
                onClick={onGenerateDiet}
                className="mt-4 w-full flex items-center justify-center px-5 py-4 text-sm text-[var(--color-primary)] font-semibold border-2 border-[var(--color-btn-gradient-border)] rounded-full hover:bg-gradient-to-br hover:from-[var(--color-dark)] hover:to-[var(--color-primary-light)] shadow-md"
              >
                <FaAppleAlt className="w-5 h-5 mr-2" />
                Generar Plan de Alimentación
              </button>
              
              <p className="mt-3 text-sm text-gray-500">
                Para un plan personalizado, consulta con un profesional de la salud.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`h-1.5 bg-gradient-to-r ${objectiveData.gradient}`}></div>
    </div>
  );
}
