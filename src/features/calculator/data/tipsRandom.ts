export type Objetivo = 'Perder grasa' | 'Ganar músculo' | 'Mantener peso';

export const randomTips: Record<Objetivo, string[]> = {
  'Perder grasa': [
    'Asegúrate de consumir suficiente proteína para mantener la masa muscular mientras pierdes grasa.',
    'Incluye intervalos de cardio de alta intensidad (HIIT) para acelerar la pérdida de grasa.',
    'No te saltes las comidas, esto puede ralentizar tu metabolismo.',
    'Añade más fibra a tu dieta para mantenerte saciado.',
    'Mantén un registro de tus comidas para controlar mejor tus calorías.',
    'Bebe al menos 2 litros de agua al día para mantener tu metabolismo activo.',
    'Evita las bebidas azucaradas y opta por agua o té verde.',
    'Asegúrate de dormir al menos 7-8 horas cada noche.',
    'Incluye entrenamientos de fuerza para mantener y construir músculo.',
    'No reduzcas demasiado las calorías de golpe, hazlo gradualmente.'
  ],
  'Ganar músculo': [
    'Asegúrate de consumir al menos 1.6g de proteína por kilogramo de peso corporal.',
    'Incluye carbohidratos complejos en tu dieta para recuperación muscular.',
    'Prioriza los entrenamientos de fuerza con pesas libres.',
    'Duerme bien, el músculo se construye durante el sueño.',
    'Come más calorías de las que quemas para ganar músculo.',
    'Incluye alimentos ricos en grasas saludables en tu dieta.',
    'Toma un día de descanso semanal para permitir la recuperación.',
    'Mantén un registro de tus progresos en el gimnasio.',
    'Asegúrate de calentar antes de cada entrenamiento.',
    'Incluye diferentes tipos de entrenamiento para evitar el estancamiento.'
  ],
  'Mantener peso': [
    'Mantén un registro de tus comidas y actividades físicas.',
    'Incluye una variedad de alimentos en tu dieta.',
    'Mantén una rutina de ejercicio regular.',
    'Evita las comidas procesadas y opta por opciones naturales.',
    'Mantén un horario regular de comidas.',
    'Incluye al menos 30 minutos de actividad física diaria.',
    'Asegúrate de mantener un equilibrio calórico.',
    'Bebe suficiente agua durante el día.',
    'Mantén un estilo de vida activo en general.',
    'Planifica tus comidas con anticipación para evitar decisiones impulsivas.'
  ]
};

export const getRandomTip = (objetivo: Objetivo): string => {
  const tips = randomTips[objetivo];
  if (!tips || tips.length === 0) return '';
  return tips[Math.floor(Math.random() * tips.length)];
};