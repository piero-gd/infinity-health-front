import { useState } from 'react';
import type { CalculatorData } from '../types/index';

interface CalculatorFormProps {
  onCalcular: (formData: CalculatorData) => void;
}

const CalculatorForm = ({ onCalcular }: CalculatorFormProps) => {
  const [formData, setFormData] = useState<CalculatorData>({
    nombre: 'Jemima',
    sexo: '',
    edad: 25,
    peso: 70,
    altura: 170,
    actividad: '',
    objetivo: 'Perder grasa'
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCalcular(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CalculatorData) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="p-6 space-y-8 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Calculadora de Macros</h1>
          <p className="text-gray-500 text-sm mt-2">Obtén tu plan de nutrición personalizado en solo 2 minutos</p>
        </div>

        {/* Sección de información personal */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          
          
          <div className="space-y-4">
            <h1 className="flex items-center justify-start mb-2 text-gray-700 text-xl transition-all duration-200">
              <span className="mr-1 text-xl">¡Hola</span>
              <span className="font-bold text-[var(--color-primary)] text-xl">{formData.nombre}{'!'}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">Prueba nuestra calculadora de macros</p>
            

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Género</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => handleChange({ target: { name: 'sexo', value: 'Hombre' } } as any)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                    formData.sexo === 'Hombre' 
                      ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-accent)] text-white text-xl font-black shadow-lg' 
                      : 'bg-white border-2 border-[var(--color-primary-light)] text-[var(--color-primary)] hover:border-[var(--color-primary-light-200)]'
                  }`}
                >
                  <img 
                    src={formData.sexo === 'Hombre' ? '/img/icons/mansel.svg' : '/img/icons/man.svg'} 
                    className={`h-20 w-20 transition-transform ${formData.sexo === 'Hombre' ? 'scale-110' : ''}`}
                    alt="Hombre"
                  />
                  <span className={`${formData.sexo === 'Hombre' ? 'font-black' : 'font-medium'}`}>Hombre</span>
                </button>
                
                <button 
                  type="button"
                  onClick={() => handleChange({ target: { name: 'sexo', value: 'Mujer' } } as any)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                    formData.sexo === 'Mujer' 
                      ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white text-xl font-black shadow-lg' 
                      : 'bg-white border-2 border-pink-100 text-pink-600 hover:border-pink-400'
                  }`}
                >
                  <img 
                    src={formData.sexo === 'Mujer' ? '/img/icons/femsel.svg' : '/img/icons/fem.svg'} 
                    className={`h-20 w-20 transition-transform ${formData.sexo === 'Mujer' ? 'scale-110' : ''}`}
                    alt="Mujer"
                  />
                  <span className={`${formData.sexo === 'Mujer' ? 'font-black' : 'font-medium'}`}>Mujer</span>
                </button>
              </div>

              {/*PRUEBA DE EDAD*/}
              <div className="mb-3 mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Edad: <span className="text-[var(--color-primary)] font-bold">{formData.edad || 25} años</span></label>
            <div className="relative h-12 w-full">
              <div className="absolute top-6 h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-accent)] rounded-full" 
                  style={{ width: `${((formData.edad || 25) - 18) / 47 * 100}%` }}
                />
              </div>
              <input
                type="range"
                name="edad"
                min="18"
                max="65"
                value={formData.edad || 25}
                onChange={handleChange}
                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute top-0 flex items-center justify-center w-10 h-10 transform -translate-x-1/2 transition-all"
                style={{ left: `${((formData.edad || 25) - 18) / 47 * 100}%` }}
              >
                <div className="bg-white border-2 border-[var(--color-primary)] rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-[var(--color-primary)]">{formData.edad || 25}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-8 px-1">
              <span>18 años</span>
              <span>65 años</span>
            </div>
            </div>

            {/*PRUEBA DE PESO*/}

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border border-[var(--color-primary-light)] shadow-sm mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    name="peso"
                    min="30"
                    max="200"
                    step="0.1"
                    onChange={handleChange} 
                    value={formData.peso || ''} 
                    className="w-full px-4 py-3 border border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="70.5"
                    required
                  />
                  <div className="absolute right-3 top-3 text-gray-400">kg</div>
                </div>
                <div className="mt-3">
                  <input
                    type="range"
                    name="peso"
                    min="30"
                    max="200"
                    step="0.1"
                    value={formData.peso || 70.5}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                  <span>30 kg</span>
                  <span>200 kg</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[var(--color-primary-light)] shadow-sm mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    name="altura"
                    min="120"
                    max="250"
                    onChange={handleChange} 
                    value={formData.altura || ''} 
                    className="w-full px-4 py-3 border border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="170"
                    required
                  />
                  <div className="absolute right-3 top-3 text-gray-400">cm</div>
                </div>
                <div className="mt-3">
                  <input
                    type="range"
                    name="altura"
                    min="120"
                    max="250"
                    value={formData.altura || 170}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                  <span>120 cm</span>
                  <span>250 cm</span>
                </div>
              </div>
            
            
          </div>
              {/*espacio libre para agregar info en el cubo*/}
            </div>
          </div>
        </div>
      
        
        {/* Nivel de actividad - Versión lista en móvil, solo títulos en desktop */}
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-800">Nivel de Actividad Física</h3>
            <p className="text-xs text-gray-500 mt-1">Selecciona el que mejor describa tu rutina semanal</p>
          </div>
          
          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-5 sm:gap-2">
            {[
              { 
                nivel: 'Sedentario', 
                icon: '🪑',
                descripcion: 'Sin ejercicio',
                detalle: 'Trabajo de oficina sin actividad física',
                factor: 1.2
              },
              { 
                nivel: 'Ligero', 
                icon: '🚶',
                descripcion: '1-2 días a la semana',
                detalle: 'Caminatas o actividades ligeras',
                factor: 1.375
              },
              { 
                nivel: 'Moderado', 
                icon: '🏃',
                descripcion: '3-5 días a la semana',
                detalle: 'Ejercicio moderado 30-60 min/día',
                factor: 1.55
              },
              { 
                nivel: 'Activo', 
                icon: '💪',
                descripcion: '6-7 días a la semana',
                detalle: 'Entrenamiento intenso o trabajo físico',
                factor: 1.725
              },
              { 
                nivel: 'Muy Activo', 
                icon: '🔥',
                descripcion: '2 veces al día',
                detalle: 'Atletas o trabajos muy físicos',
                factor: 1.9
              }
            ].map((item) => {
              const isSelected = formData.actividad === item.nivel;
              return (
                <label 
                  key={item.nivel}
                  className={`relative block p-4 sm:p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'border-[var(--color-primary-accent)] bg-gradient-to-br from-[var(--color-dark)] to-[var(--color-primary-light)] shadow-md' 
                      : 'border-gray-100 hover:border-[var(--color-primary-accent)] hover:bg-gray-50'
                  }`}
                  title={`${item.descripcion} - ${item.detalle}`}
                >
                  <input
                    type="radio"
                    name="actividad"
                    value={item.nivel}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {/* Versión móvil - Completa */}
                  <div className="sm:hidden flex items-start ">
                    <span className="text-2xl mr-3 mt-0.5">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className={`font-xs text-md ${
                          isSelected ? 'font-bold text-[var(--color-primary)] text-lg' : 'text-gray-800'
                        }`}>
                          {item.nivel}
                        </span>
                        {isSelected && (
                          <div className="ml-2 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-gray-600">{item.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.detalle}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Versión desktop - Solo título */}
                  <div className="hidden sm:flex flex-col items-center justify-center h-full">
                    
                    {isSelected && (
                      <div className="mt-1 w-4 h-4 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <span className={`font-xs text-center ${
                      isSelected ? 'text-md font-bold text-[var(--color-primary)]' : 'text-gray-800 font-medium'
                    }`}>
                      {item.nivel}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

          {/* Objetivos */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">¿Cuál es tu objetivo principal?</h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
              <button 
                type="button"
                onClick={() => handleChange({ target: { name: 'objetivo', value: 'Perder grasa' } } as any)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                  formData.objetivo === 'Perder grasa' 
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg transform -translate-y-1' 
                    : 'bg-white border-2 border-orange-100 text-orange-600 hover:border-orange-200'
                }`}
              >
                <img 
                  src="/img/menos.png" 
                  className={`h-8 w-8 mb-2 transition-transform ${formData.objetivo === 'Perder grasa' ? 'scale-110' : ''}`} 
                  alt="Perder grasa"
                />
                <span className="text-sm font-medium">Perder grasa</span>
              </button>
              
              <button 
                type="button"
                onClick={() => handleChange({ target: { name: 'objetivo', value: 'Ganar músculo' } } as any)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                  formData.objetivo === 'Ganar músculo'
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg transform -translate-y-1'
                    : 'bg-white border-2 border-green-100 text-green-600 hover:border-green-200'
                }`}
              >
                <img 
                  src="/img/mas.png" 
                  className={`h-8 w-8 mb-2 transition-transform ${formData.objetivo === 'Ganar músculo' ? 'scale-110' : ''}`}
                  alt="Ganar músculo"
                />
                <span className="text-sm font-medium">Ganar músculo</span>
              </button>
              
              <button 
                type="button"
                onClick={() => handleChange({ target: { name: 'objetivo', value: 'Mantener' } } as any)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                  formData.objetivo === 'Mantener'
                    ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg transform -translate-y-1'
                    : 'bg-white border-2 border-yellow-100 text-yellow-600 hover:border-yellow-200'
                }`}
              >
                <img 
                  src="/img/igual.png" 
                  alt="Mantener peso"
                  className={`h-8 w-8 mb-2 transition-transform ${formData.objetivo === 'Mantener' ? 'scale-110' : ''}`}
                />
                <span className="text-sm font-medium">Mantener peso</span>
              </button>
            </div>
        </div>

        {/* Botón de envío */}
        <div className="mt-8 sticky bottom-0 bg-white pt-4 -mx-6 px-6 border-t border-gray-100">
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-accent)] hover:from-[var(--color-primary-accent)] hover:to-[var(--color-primary)] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-50"
          >
            Calcular mis macros ahora
            <span className="ml-2">→</span>
          </button>
          <p className="text-xs text-center text-gray-500 mt-3">Tus datos están seguros y no serán compartidos</p>
        </div>
      </div>
    </form>
  );
};

export default CalculatorForm;
