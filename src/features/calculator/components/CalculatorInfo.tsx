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
    <>
      {/* Sección de Dieta Ideal - Llamado a la acción */}
      <div className="group cursor-pointer transition-all duration-300 mb-6">
        <div className="relative bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-100 rounded-2xl p-6 overflow-hidden shadow-sm hover:shadow-md transition-all">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-yellow-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-2.5 rounded-lg mr-4 group-hover:bg-yellow-200 transition-colors">
                <FaAppleAlt className="w-5 h-5 text-yellow-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">¡Crea tu dieta personalizada!</h2>
            </div>
            
            <p className="text-gray-600 mb-6 text-sm">
              Descubre un plan de alimentación diseñado específicamente para tus necesidades y objetivos nutricionales.
            </p>
            
            <div className="space-y-3 mb-6">
              {['Desayuno balanceado', 'Almuerzo saludable', 'Snacks nutritivos', 'Cena ligera'].map((meal, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mr-3"></div>
                  <span className="text-sm text-gray-700">{meal}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-3">
              <p className="text-xs text-yellow-800 text-center">
                <span className="font-semibold">Primero calcula tus macros</span> para generar tu plan personalizado
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
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
      {/* <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-[var(--color-primary)] text-sm md:text-base mb-1.5">¿Cómo usar esta calculadora?</h3>
        <p className="text-xs md:text-sm text-[var(--color-primary)]">
          Completa el formulario con tus datos personales y objetivos para obtener un plan de 
          nutrición personalizado. Los resultados te ayudarán a entender mejor tus necesidades 
          calóricas y de macronutrientes diarias.
        </p>
      </div>*/}
    </div>
    
    {/* Sección de Productos Saludables */}
    <div className="mt-8">
      <div className="space-y-4">
        <div className="group cursor-pointer transition-all duration-300">
          <div className="relative bg-white border border-gray-100 rounded-2xl p-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-50 rounded-full opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="bg-blue-50 p-2.5 rounded-xl mr-4 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Productos Saludables</h3>
              </div>
              <p className="text-gray-600 mb-4 text-xs">
                Descubre nuestra selección de alimentos orgánicos y suplementos nutricionales de la más alta calidad.
              </p>
              <a 
                href="/productos-saludables" 
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-blue-900 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors duration-300"
              >
                Ver catálogo
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Planes de Ejercicio */}
        <div className="group cursor-pointer transition-all duration-300">
          <div className="relative bg-white border border-gray-100 rounded-2xl p-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-green-50 rounded-full opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="bg-green-50 p-2.5 rounded-xl mr-4 group-hover:bg-green-100 transition-colors">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Planes de Ejercicio</h3>
              </div>
              <p className="text-gray-600 mb-4 text-xs">
                Rutinas personalizadas según tus objetivos y nivel de condición física. Ejercicios para hacer en casa o gimnasio.
              </p>
              <a 
                href="/planes-ejercicio" 
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-green-900 bg-green-100 rounded-full hover:bg-green-200 transition-colors duration-300"
              >
                Explorar rutinas
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
