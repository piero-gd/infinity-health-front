import { useState } from 'react';
import { validateForm } from '../utils/validations';

export const useValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: {
    sexo: string;
    actividad: string;
    objetivo: string;
  }): boolean => {
    const result = validateForm(data);
    setErrors(result.errors);
    return result.isValid;
  };

  return {
    errors,
    validate,
  };
};
