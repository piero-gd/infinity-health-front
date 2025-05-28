import { getRandomTip } from '../data/tipsRandom';
import { FaAppleAlt } from 'react-icons/fa';

interface CalculatorRecomendationsProps {
  nombre: string;
  objetivo: string;
  onGenerateDiet: () => void;
}

const getObjectiveData = (objetivo: string) => {
  switch(objetivo) {
    case 'Perder grasa':
      return {
        title: 'Perder Grasa',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        ),
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        gradient: 'from-orange-500 to-orange-600',
        tipBg: 'bg-orange-50',
        tipBorder: 'border-orange-100',
        tipText: 'text-orange-700'
      };
    case 'Ganar músculo':
      return {
        title: 'Ganar Músculo',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ),
        color: 'bg-green-100 text-green-800 border-green-200',
        gradient: 'from-green-500 to-green-600',
        tipBg: 'bg-green-50',
        tipBorder: 'border-green-100',
        tipText: 'text-green-700'
      };
    case 'Mantener Peso':
      return {
        title: 'Mantener Peso',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        gradient: 'from-yellow-500 to-yellow-600',
        tipBg: 'bg-yellow-50',
        tipBorder: 'border-yellow-100',
        tipText: 'text-yellow-700'
      };
    default:
      return {
        title: 'Sin objetivo',
        icon: null,
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        gradient: 'from-gray-500 to-gray-600',
        tipBg: 'bg-gray-50',
        tipBorder: 'border-gray-100',
        tipText: 'text-gray-700'
      };
  }
};

export default function CalculatorRecomendations({ objetivo, nombre, onGenerateDiet }: CalculatorRecomendationsProps) {
  if (!objetivo) return null;

  const tip = getRandomTip(objetivo as 'Perder grasa' | 'Ganar músculo' | 'Mantener peso');
  const objectiveData = getObjectiveData(objetivo);

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
              
              <div className="mt-4 p-3 rounded-lg bg-opacity-20 bg-gradient-to-r from-[var(--color-background)] to-[var(--color-border)]">
                <h4 className="font-semibold text-gray-800 mb-1">Consejo del día</h4>
                <p className="text-sm text-gray-700">
                  {objetivo === 'Perder Grasa' && 'Recuerda mantener un déficit calórico moderado para una pérdida de grasa sostenible.'}
                  {objetivo === 'Ganar Musculo' && 'Asegúrate de consumir suficientes proteínas y descansar adecuadamente para el crecimiento muscular.'}
                  {objetivo === 'Mantener Peso' && 'Mantén un equilibrio entre tu ingesta calórica y tu gasto energético diario.'}
                </p>
              </div>
              
              <button
                onClick={onGenerateDiet}
                className="mt-4 w-full bg-gradient-to-r from-gray-600 to-gray-400 border border-gray-500 hover:from-gray-500 to-gray-600 text-white font-semibold py-6 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center hover:scale-110"
              >
                <FaAppleAlt className="w-5 h-5 mr-2" />
                Generar Plan de Alimentación
              </button>
              
              <p className="mt-3 text-xs text-gray-500">
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
