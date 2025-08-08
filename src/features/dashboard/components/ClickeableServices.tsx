import { IoMdFitness } from "react-icons/io";
import { LuApple } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function ClickeableServices() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-3 max-w-4xl mx-auto">
      {/* Primera tarjeta - Academia Nutricional */}
      <div className="lg:h-full flex flex-col">
        <div className="bg-white p-3 rounded-2xl border-1 border-gray-100 shadow-sm flex-1">
          <h4 className="block text-sm md:block md:text-lg font-semibold px-2 md:px-0 mb-2 md:mb-0 md:font-medium text-gray-800">
            Tu entrenamiento
          </h4>
          <p className="hidden md:block text-xs text-gray-600 mb-2">
            Biblioteca de Ejercicios
          </p>

          <div className="relative bg-white rounded-2xl border-1 border-primary shadow-lg overflow-hidden">
            <div className="relative aspect-[4/5]">
              {/* Imagen de hombre */}
              <div className="absolute inset-0">
                <img
                  src="img/marco.png"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Contenido de texto - botón completo en desktop, solo ícono en móvil */}
              <div className="absolute inset-0 flex items-end justify-center pb-6 text-white">
                {/* Versión desktop - botón completo */}
                <button className="hidden md:flex items-center gap-2 p-3 px-6 py-1 text-black bg-white/45 backdrop-blur-md border-2 border-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onClick={() => navigate('/exercises')}>
                  <span className="text-sm font-medium">Ir a la biblioteca</span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl">
                    <IoMdFitness className="w-6 h-6 m-auto text-white mt-2" />
                  </div>
                </button>

                {/* Versión móvil - solo ícono */}
                <button className="md:hidden bottom-1 right-1 absolute w-12 h-12 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl hover:shadow-2xl transition-all transform hover:scale-110"
                onClick={() => navigate('/exercises')}>
                  <IoMdFitness className="w-7 h-7 m-auto text-white mb-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda tarjeta - Academia Nutricional */}
      <div className="h-full flex flex-col">
        <div className="bg-white p-3 rounded-2xl border-1 border-gray-100 shadow-sm flex-1">
          <h4 className="block md:block text-sm md:block md:text-lg font-semibold px-4 md:px-0 mb-2 md:mb-0 md:font-medium text-gray-800">
            Aprende Nutrición
          </h4>
          <p className="hidden md:block text-xs text-gray-600 mb-2">
            Con nuestra experta
          </p>

          <div className="relative bg-white rounded-2xl border-1 border-purple-500 shadow-lg overflow-hidden">
            <div className="relative aspect-[4/5]">
              {/* Imagen de mujer */}
              <div className="absolute inset-0">
                <img
                  src="img/cecilia.png"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Contenido de texto - botón completo en desktop, solo ícono en móvil */}
              <div className="absolute inset-0 flex items-end justify-center pb-6 text-white">
                {/* Versión desktop - botón completo */}
                <button className="hidden md:flex items-center gap-2 p-3 px-6 py-1 text-black bg-white/45 backdrop-blur-md border-2 border-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onClick={() => navigate('/academy')}>
                  <span className="text-sm font-medium">Ir a la academia</span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl">
                    <LuApple className="w-6 h-6 m-auto text-white mt-2" />
                  </div>
                </button>

                {/* Versión móvil - solo ícono */}
                <button className="md:hidden bottom-1 right-1 absolute w-12 h-12 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl hover:shadow-2xl transition-all transform hover:scale-110"
                onClick={() => navigate('/academy')}>
                  <LuApple className="w-7 h-7 m-auto text-white mb-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}