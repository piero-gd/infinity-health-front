import { useState } from 'react';
import type { CalculatorData } from '../types/index';

interface CalculatorFormProps {
  onCalcular: (formData: CalculatorData) => void;
}

export default function CalculatorForm({ onCalcular }: CalculatorFormProps) {
  const [formData, setFormData] = useState<CalculatorData>({
    nombre: '',
    sexo: '',
    edad: 0,
    peso: 0,
    altura: 0,
    actividad: '',
    objetivo: 'Perder grasa'
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCalcular(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <input 
            type="text" 
            name="nombre" 
            onChange={handleChange} 
            value={formData.nombre} 
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 w-full"
            placeholder="Nombre"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">Calculadora <br/> de Macros</h2>
        </div>
      </div>
      
      {/* Selector de género */}
      <div className="flex justify-left space-x-3 my-3">
        <button 
          type="button"
          onClick={() => handleChange({ target: { name: 'sexo', value: 'Hombre' } } as any)}
          className={`flex flex-col items-center justify-center p-3 rounded-xl w-30 h-30 ${formData.sexo === 'Hombre' ? 'bg-[var(--color-primary)] text-white font-bold' : 'bg-[var(--color-primary-light)] text-[var(--color-text)]'}`}
        >
          <img src="/img/hombre.png" className="h-12 w-12">
          </img>
          <span className="text-sm mt-1">Hombre</span>
        </button>
        
        <button 
          type="button"
          onClick={() => handleChange({ target: { name: 'sexo', value: 'Mujer' } } as any)}
          className={`flex flex-col items-center justify-center p-3 rounded-xl w-30 h-30 ${formData.sexo === 'Mujer' ? 'bg-[var(--color-primary)] text-white font-bold' : 'bg-[var(--color-primary-light)] text-[var(--color-text)]'}`}
        >
         <img src="/img/mujer.png" className="h-12 w-12">
         </img>
          <span className="text-sm mt-1">Mujer</span>
        </button>
      </div>

      {/* Slider para edad */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Edad:</label>
        <div className="flex items-center">
          <input 
            type="range" 
            name="edad" 
            min="18" 
            max="80" 
            onChange={handleChange} 
            value={formData.edad || '30'} 
            className="w-full h-2 bg-[var(--color-primary-light)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
          />
        </div>
        <div className="text-center mt-1">
          <span className="text-sm font-medium">{formData.edad || '30'} años</span>
        </div>
      </div>
      
      {/* Peso y altura */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Peso</label>
          <div className="flex">
            <input 
              type="number" 
              name="peso" 
              onChange={handleChange} 
              value={formData.peso} 
              className="px-3 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:border-blue-500 w-full"
              placeholder="" 
              required
            />
            <div className="bg-gray-100 border border-l-0 border-gray-200 rounded-r-lg px-3 py-2 flex items-center">
              <span className="text-sm text-gray-500">kg</span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Altura</label>
          <div className="flex">
            <input 
              type="number" 
              name="altura" 
              onChange={handleChange} 
              value={formData.altura} 
              className="px-3 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:border-[var(--color-primary)] w-full"
              placeholder="" 
              required
            />
            <div className="relative group">
              <div className="bg-gray-100 border border-l-0 border-gray-200 rounded-r-lg px-3 py-2 flex items-center cursor-pointer">
                <span className="text-sm text-gray-500">cm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nivel de actividad */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">Nivel de Actividad</label>
        <select 
          name="actividad" 
          onChange={handleChange} 
          value={formData.actividad} 
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-primary)] bg-white"
          required
        >
          <option value="" disabled hidden>Selecciona</option>
          <option value="Sedentario">Sedentario</option>
          <option value="Ligero">Ligero</option>
          <option value="Moderado">Moderado</option>
          <option value="Activo">Activo</option>
          <option value="Muy Activo">Muy Activo</option>
        </select>
      </div>
      
      {/* Objetivo con iconos */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Objetivo</label>
        <div className="grid grid-cols-3 gap-2">
          <button 
            type="button"
            onClick={() => handleChange({ target: { name: 'objetivo', value: 'Perder grasa' } } as any)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl ${formData.objetivo === 'Perder grasa' ? 'bg-red-700 text-white' : 'bg-red-200 text-red-800'}`}
          >
            <img src="/img/menos.png" className="h-8 w-8" />
            
            <span className="text-xs mt-1">Perder grasa</span>
          </button>
          
          <button 
            type="button"
            onClick={() => handleChange({ target: { name: 'objetivo', value: 'Ganar músculo' } } as any)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl ${formData.objetivo === 'Ganar músculo' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-primary-light)] text-blue-800'}`}
          >
            <img src="/img/mas.png" className="h-8 w-8" />
            <span className="text-xs mt-1">Ganar músculo</span>
          </button>
          
          <button 
            type="button"
            onClick={() => handleChange({ target: { name: 'objetivo', value: 'Mantener peso' } } as any)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl ${formData.objetivo === 'Mantener peso' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-primary-light)] text-blue-800'}`}
          >
            <img src="/img/igual.png" className="h-8 w-8" />
            <span className="text-xs mt-1">Mantener peso</span>
          </button>
        </div>
      </div>
      
      {/* Botón calcular */}
      <button 
        type="submit" 
        className="mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm w-full"
      >
        Calcular
      </button>
    </form>
  );
}
