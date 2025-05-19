import type { CalculatorData } from '../types/index';

interface CalculatorRecomendationsProps {
  nombre: string;
  objetivo: string;
}

export default function CalculatorRecomendations({ objetivo, nombre }: CalculatorRecomendationsProps) {
  if (!objetivo) return null;

  const mensajes: Record<string, string> = {
    'Perder grasa': `${nombre}: Asegúrate de tener un déficit calórico y haz cardio.`,
    'Ganar músculo': `${nombre}: Consume más calorías y entrena con fuerza.`,
  };

  return (
    <div className="p-4 bg-yellow-100 rounded mt-4">
      <p><strong>Consejo:</strong> {mensajes[objetivo]}</p>
    </div>
  );
}
