import { useState } from 'react';
import type { CalculatorData } from '../types/index';

interface CalculatorFormProps {
  onCalcular: (formData: CalculatorData) => void;
}

const CalculatorForm = ({ onCalcular }: CalculatorFormProps) => {
  const [formData, setFormData] = useState<CalculatorData>({
    nombre: '',
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tu nombre completo</label>
              <input 
                type="text" 
                name="nombre" 
                onChange={handleChange} 
                value={formData.nombre} 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-transparent"
                placeholder="Ej: María González"
                required
              />
            </div>

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
                  style={{ width: `${((formData.edad || 25) - 18) / 32 * 100}%` }}
                />
              </div>
              <input
                type="range"
                name="edad"
                min="18"
                max="50"
                value={formData.edad || 25}
                onChange={handleChange}
                className="absolute w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute top-0 flex items-center justify-center w-10 h-10 transform -translate-x-1/2 transition-all"
                style={{ left: `${((formData.edad || 25) - 18) / 32 * 100}%` }}
              >
                <div className="bg-white border-2 border-[var(--color-primary)] rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                  <span className="text-sm font-bold text-[var(--color-primary)]">{formData.edad || 25}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-8 px-1">
              <span>18 años</span>
              <span>50 años</span>
            </div>
            </div>

            {/*PRUEBA DE PESO*/}

            <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl border border-[var(--color-primary)] shadow-sm">
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
                  className="w-full px-4 py-3 border border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-transparent"
                  placeholder="70.5"
                  required
                />
                <div className="absolute right-3 top-3 text-gray-400">kg</div>
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  name="peso"
                  min="30"
                  max="200"
                  step="0.5"
                  value={formData.peso || 70}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-[var(--color-primary)] shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="altura"
                  min="120"
                  max="250"
                  onChange={handleChange} 
                  value={formData.altura || ''} 
                  className="w-full px-4 py-3 border border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-transparent"
                  placeholder="170"
                  required
                />
                <div className="absolute right-3 top-3 text-gray-400">cm</div>
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  name="altura"
                  min="120"
                  max="250"
                  value={formData.altura || 170}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
              {/*espacio libre para agregar info en el cubo*/}
            </div>
          </div>
        </div>
      
        
        {/* Nivel de actividad */}
        <div className="mt-6 bg-white p-4 rounded-md border border-gray-100 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-3">Nivel de Actividad Física</label>
          <div className="flex flex-wrap justify-center gap-3">
            {['Sedentario', 'Ligero', 'Moderado', 'Activo', 'Muy Activo'].map((nivel) => (
              <label key={nivel} className={`flex flex-col items-center justify-center rounded-md py-3 px-6 bg-gray-50 border-2 border-[var(--color-primary-light)] transition-all duration-200 ${formData.actividad === nivel ? 'text-[var(--color-primary)] font-semibold bg-[var(--color-primary-light)]' : 'hover:bg-gray-150 border-[var(--color-primary)] text-[var(--color-primary-accent)]'}`}>
                <input
                  type="radio"
                  name="actividad"
                  value={nivel}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className="text-sm font-bold capitalize">{nivel}</span>
                <span className="text-xs text-gray-500 ">{{
                  'Sedentario': 'No hago ejercicio',
                  'Ligero': 'Camino sin frecuencia',
                  'Moderado': 'Hago ejercicio 1-2 veces',
                  'Activo': 'Hago ejercicio 3-4 veces',
                  'Muy Activo': 'Hago ejercicio diario',
                }[nivel]}</span>
              </label>
            ))}
          </div>
        </div>

          {/* Objetivos */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">¿Cuál es tu objetivo principal?</h3>
            <div className="grid grid-cols-3 gap-3">
              <button 
                type="button"
                onClick={() => handleChange({ target: { name: 'objetivo', value: 'Perder grasa' } } as any)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                  formData.objetivo === 'Perder grasa' 
                    ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg transform -translate-y-1' 
                    : 'bg-white border-2 border-red-100 text-red-600 hover:border-red-200'
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
        <div className="mt-8 sticky bottom-0 bg-white pt-4 pb-6 -mx-6 px-6 border-t border-gray-100">
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
