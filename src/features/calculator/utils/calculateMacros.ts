import type { CalculatorData, CalculatorResults } from '../types/index';

export default function calculateMacros(datos: CalculatorData): CalculatorResults {
  const { edad, sexo, peso, altura, actividad, objetivo, nombre } = datos;
  
  // Calcular TMB (Tasa Metabólica Basal)
  const tmb = sexo === 'Hombre'
    ? 10 * peso + 6.25 * altura - 5 * edad + 5
    : 10 * peso + 6.25 * altura - 5 * edad - 161;

  let multiplicadorActividad = 1.2; // Valor por defecto
  switch (actividad) {
    case 'Sedentario':
      multiplicadorActividad = 1.2;
      break;
    case 'Ligero':
      multiplicadorActividad = 1.375;
      break;
    case 'Moderado':
      multiplicadorActividad = 1.55;
      break;
    case 'Activo':
      multiplicadorActividad = 1.725;
      break;
    case 'Muy Activo':
      multiplicadorActividad = 1.9;
      break;
  }

  let calorias = tmb * multiplicadorActividad;

  if (objetivo === 'Perder Grasa') calorias -= 500;
  if (objetivo === 'Ganar Músculo') calorias += 500;
  if (objetivo === 'Mantener Peso') calorias += 0;

  const proteinas = peso * 2; // 2g de proteína por kg de peso
  const grasas = peso * 1; // 1g de grasa por kg de peso
  const caloriasProteinas = proteinas * 4;
  const caloriasGrasas = grasas * 9;
  const caloriasCarbs = calorias - caloriasProteinas - caloriasGrasas;
  const carbohidratos = caloriasCarbs / 4;

  return {
    calorias: Math.round(calorias),
    proteinas: Math.round(proteinas),
    grasas: Math.round(grasas),
    carbohidratos: Math.round(carbohidratos),
    nombre,
    objetivo
  };
}
