import { useState } from 'react';
import type { CalculatorData } from '../types/index';

interface CalculatorFormProps {
    onCalcular: (formData: CalculatorData) => void;
  }

export function useCalculator({ onCalcular }: CalculatorFormProps) {
   const [formData, setFormData] = useState<CalculatorData>({
    nombre: 'Marco',
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

  return {
    formData,
    handleSubmit,
    handleChange
  };
}

