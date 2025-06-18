import { IoMdFitness } from "react-icons/io";
import { LuApple } from "react-icons/lu";

export default function ClickeableServices() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 max-w-5xl mx-auto">
      {/* Primera tarjeta - Academia Nutricional */}
      <div className="lg:h-full">
        <div className="bg-white p-4 rounded-2xl border-1 border-gray-100 shadow-sm">
          <h4 className="block text-xs md:block md:text-lg font-semibold px-2 md:px-0 mb-2 md:mb-0 md:font-medium text-gray-800">
            Tu entrenamiento de hoy 🔥
          </h4>
          <p className="hidden md:block text-sm text-gray-800 mb-3">
            Biblioteca de Ejercicios
          </p>

          <div className="relative bg-white rounded-2xl border-1 border-primary shadow-lg overflow-hidden">
            <div className="relative aspect-[3/4]">
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
                <button className="hidden md:flex items-center gap-2 p-3 px-6 py-1 text-black bg-white/45 backdrop-blur-md border-2 border-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <span className="text-sm font-medium">Ir a la biblioteca</span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl">
                    <IoMdFitness className="w-6 h-6 m-auto text-white mt-2" />
                  </div>
                </button>

                {/* Versión móvil - solo ícono */}
                <button className="md:hidden bottom-1 right-1 absolute w-12 h-12 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl hover:shadow-2xl transition-all transform hover:scale-110">
                  <IoMdFitness className="w-7 h-7 m-auto text-white mb-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda tarjeta - Academia Nutricional */}
      <div className="lg:h-full">
        <div className="bg-white p-4 rounded-2xl border-1 border-gray-100 shadow-sm">
          <h4 className="block md:block text-xs md:block md:text-lg font-semibold px-4 md:px-0 mb-2 md:mb-0 md:font-medium text-gray-800">
            Aprende Nutrición
          </h4>
          <p className="hidden md:block text-sm text-gray-800 mb-3">
            Con nuestra experta
          </p>

          <div className="relative bg-white rounded-2xl border-1 border-purple-500 shadow-lg overflow-hidden">
            <div className="relative aspect-[3/4]">
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
                <button className="hidden md:flex items-center gap-2 p-3 px-6 py-1 text-black bg-white/45 backdrop-blur-md border-2 border-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <span className="text-sm font-medium">Ir a la academia</span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl">
                    <LuApple className="w-6 h-6 m-auto text-white mt-2" />
                  </div>
                </button>

                {/* Versión móvil - solo ícono */}
                <button className="md:hidden bottom-1 right-1 absolute w-12 h-12 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl hover:shadow-2xl transition-all transform hover:scale-110">
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