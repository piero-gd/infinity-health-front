import { FaRuler, FaWeight, FaAppleAlt, FaRunning, FaListAlt } from 'react-icons/fa';

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
      {/* Dieta - Llamado a la acción */}
      <div className="group cursor-pointer transition-all duration-300 mb-6">
        <div className="relative bg-gradient-to-r from-[var(--color-white)] to-[var(--color-primary-surface)] border border-blue-100 rounded-2xl p-6 overflow-hidden shadow-sm hover:shadow-md transition-all">
     
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-[var(--color-primary-light)] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-[var(--color-primary-light)] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="border border-[var(--color-primary)] bg-blue-50 p-2.5 rounded-lg mr-4 ">
                <FaListAlt className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <h3 className="font-semibold text-gray-800">¡Crea tu dieta personalizada!</h3>
            </div>
            
            <p className="text-gray-600 mb-6 text-sm">
              Descubre un plan de alimentación diseñado específicamente para tus necesidades y objetivos nutricionales.
            </p>
            
            <div className="space-y-3 mb-6">
              {['Desayuno balanceado', 'Almuerzo saludable', 'Snacks nutritivos', 'Cena ligera'].map((meal, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] mr-3"></div>
                  <span className="text-sm text-gray-700">{meal}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 border border-[var(--color-primary-light)] rounded-lg p-3 mb-3">
              <p className="text-sm text-[var(--color-primary)] text-center">
                <span className="font-semibold">Primero calcula tus macros</span> para generar tu plan personalizado
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Información de tips */}
      <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-5 md:p-6">
      <h3 className="font-semibold text-gray-800 mb-4 md:mb-6">Consejos para un mejor seguimiento</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:grid-cols-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 bg-blue-50/50 p-3 rounded-lg">
            <div className="flex-shrink-0 mt-0.5">
              {tip.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-md md:text-base">{tip.title}</p>
              <p className="text-gray-600 text-sm md:text-sm">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Derivar a sección de Productos Saludables */}
    <div className="mt-4">
      <div className="space-y-4">
        <div className="group cursor-pointer transition-all duration-300">
          <div className="relative bg-white border border-blue-100 rounded-2xl p-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-[var(--color-primary-light)] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-[var(--color-primary-light)] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="bg-blue-50 p-2.5 rounded-xl mr-4 border border-[var(--color-primary)] transition-colors">
                  <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Productos Saludables</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Descubre nuestra selección de alimentos orgánicos y suplementos nutricionales de la más alta calidad.
              </p>
              <a 
                href="/catalog" 
                className="inline-flex items-center text-[var(--color-primary)] px-5 py-2.5 text-sm font-medium rounded-full border-1 border-[var(--color-primary-accent)] hover:bg-gradient-to-br hover:from-[var(--color-dark)] hover:to-[var(--color-primary-light)] shadow-md"
              >
                Ver catálogo
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Derivar a Planes de Ejercicio */}
        <div className="group cursor-pointer transition-all duration-300">
          <div className="relative bg-white border border-blue-100 rounded-2xl p-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-[var(--color-primary-light)] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-[var(--color-primary-light)] rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="bg-blue-50 p-2.5 rounded-xl mr-4 border border-[var(--color-primary)] transition-colors">
                  <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Planes de Ejercicio</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Rutinas personalizadas según tus objetivos y nivel de condición física. Ejercicios para hacer en casa o gimnasio.
              </p>
              <a 
                href="/exercises" 
                className="inline-flex items-center text-sm font-medium px-5 py-2.5 text-white bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] rounded-full hover:bg-gradient-to-t hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] transition-colors duration-300 shadow-md"
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
