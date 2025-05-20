import { FaRuler, FaWeight, FaAppleAlt, FaRunning } from 'react-icons/fa';

const tips = [
  {
    icon: <FaRuler className="text-blue-500 text-2xl" />,
    title: "Mide tus porciones",
    description: "Usa tazas medidoras o una balanza de cocina para asegurar porciones precisas."
  },
  {
    icon: <FaWeight className="text-green-500 text-2xl" />,
    title: "Pésate regularmente",
    description: "Controla tu peso a la misma hora del día, preferiblemente por la mañana en ayunas."
  },
  {
    icon: <FaAppleAlt className="text-red-500 text-2xl" />,
    title: "Alimentación balanceada",
    description: "Incluye proteínas, carbohidratos y grasas saludables en cada comida principal."
  },
  {
    icon: <FaRunning className="text-purple-500 text-2xl" />,
    title: "Actividad física",
    description: "Combina ejercicio cardiovascular con entrenamiento de fuerza para mejores resultados."
  }
];

export default function CalculatorInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-5 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Consejos para un mejor seguimiento</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 bg-blue-50/50 p-3 rounded-lg">
            <div className="flex-shrink-0 mt-0.5">
              {tip.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm md:text-base">{tip.title}</h3>
              <p className="text-gray-600 text-xs md:text-sm">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-800 text-sm md:text-base mb-1.5">¿Cómo usar esta calculadora?</h3>
        <p className="text-xs md:text-sm text-blue-700">
          Completa el formulario con tus datos personales y objetivos para obtener un plan de 
          nutrición personalizado. Los resultados te ayudarán a entender mejor tus necesidades 
          calóricas y de macronutrientes diarias.
        </p>
      </div>

      {/* Sección de Servicios Adicionales */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Descubre más servicios para tu bienestar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card Productos Saludables */}
          <a 
            href="/productos-saludables" 
            className="group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600">Productos Saludables</h4>
                <p className="text-xs text-gray-500 mt-1">Descubre nuestra selección de alimentos y suplementos naturales</p>
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-blue-600 font-medium">
              Ver catálogo
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Card Planes de Ejercicio */}
          <a 
            href="/planes-ejercicio" 
            className="group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 p-3 rounded-lg group-hover:bg-green-100 transition-colors">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 group-hover:text-green-600">Planes de Ejercicio</h4>
                <p className="text-xs text-gray-500 mt-1">Rutinas personalizadas según tus objetivos y nivel de condición física</p>
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-green-600 font-medium">
              Explorar rutinas
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
