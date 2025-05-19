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
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-4 p-4 max-w-md mx-auto">
      <label className="flex flex-col">
        <span>Nombre:</span>
        <input 
          type="text" 
          name="nombre" 
          onChange={handleChange} 
          value={formData.nombre} 
          className="hover:border-[var(--color-primary-accent)] transition-colors px-3 py-1 rounded-full border border-transparent hover:border-[var(--color-primary-accent)]"
          placeholder="Tu nombre"
        />
      </label>
      <label className="flex flex-col">
        <span>Sexo:</span>
        <select 
          name="sexo" 
          onChange={handleChange} 
          value={formData.sexo} 
          className="hover:border-[var(--color-primary-accent)] transition-colors px-3 py-1 rounded-full border border-transparent hover:border-[var(--color-primary-accent)]"
          required
        >
          <option value="" disabled hidden>Selecciona una opción</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
      </label>
      <label className="flex flex-col">
        <span>Edad:</span>
        <input 
          type="number" 
          name="edad" 
          onChange={handleChange} 
          value={formData.edad} 
          className="hover:border-[var(--color-primary-accent)] transition-colors px-3 py-1 rounded-full border border-transparent hover:border-[var(--color-primary-accent)]"
          placeholder="Tu edad"
          required
        />
      </label>
      <label className="flex flex-col">
        <span>Peso (kg):</span>
        <input 
          type="number" 
          name="peso" 
          onChange={handleChange} 
          value={formData.peso} 
          className="hover:border-[var(--color-primary-accent)] transition-colors px-3 py-1 rounded-full border border-transparent hover:border-[var(--color-primary-accent)]"
          placeholder="Tu peso en kg"
          required
        />
      </label>
      <label className="flex flex-col">
        <span>Altura (cm):</span>
        <input 
          type="number" 
          name="altura" 
          onChange={handleChange} 
          value={formData.altura} 
          className="hover:border-[var(--color-primary-accent)] transition-colors px-3 py-1 rounded-full border border-transparent hover:border-[var(--color-primary-accent)]"
          placeholder="Tu altura en cm"
          required
        />
      </label>
      <label className="flex flex-col">
        <span>Nivel de actividad:</span>
        <select 
          name="actividad" 
          onChange={handleChange} 
          value={formData.actividad} 
          className="hover:border-[var(--color-primary-accent)] transition-colors px-3 py-1 rounded-full border border-transparent hover:border-[var(--color-primary-accent)]"
          required
        >
          <option value="" disabled hidden>Selecciona una opción</option>
          <option value="Sedentario">Sedentario</option>
          <option value="Ligero">Ligero</option>
          <option value="Moderado">Moderado</option>
          <option value="Activo">Activo</option>
          <option value="Muy Activo">Muy Activo</option>
        </select>
      </label>
      <label className="flex flex-col">
        <span>Objetivo:</span>
        <select 
          name="objetivo" 
          onChange={handleChange} 
          value={formData.objetivo} 
          className="hover:border-[var(--color-primary-accent)] transition-colors px-3 py-1 rounded-full border border-transparent hover:border-[var(--color-primary-accent)]"
          required
        >
          <option value="" disabled hidden>Selecciona una opción</option>
          <option value="Perder grasa">Perder grasa</option>
          <option value="Ganar músculo">Ganar músculo</option>
        </select>
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Calcular</button>
    </form>
  );
}
