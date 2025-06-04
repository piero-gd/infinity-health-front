export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateForm = (data: {
  sexo: string;
  actividad: string;
  objetivo: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.sexo) {
    errors.sexo = 'Por favor selecciona tu género';
  }

  if (!data.actividad) {
    errors.actividad = 'Por favor selecciona tu nivel de actividad';
  }

  if (!data.objetivo) {
    errors.objetivo = 'Por favor selecciona tu objetivo';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};