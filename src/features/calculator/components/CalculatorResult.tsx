import type { CalculatorResults } from '../types/index';

interface CalculatorResultProps {
  resultado: CalculatorResults | null;
}

export default function CalculatorResult({ resultado }: CalculatorResultProps) {

  if (!resultado) return null;

  return (
    <div className="p-4 bg-green-100 rounded">
      <h2 className="text-xl font-bold">Resultados</h2>
      <p><strong>Calorias:</strong> {resultado.calorias} cal</p>
      <p><strong>Proteínas:</strong> {resultado.proteinas} g</p>
      <p><strong>Grasas:</strong> {resultado.grasas} g</p>
      <p><strong>Carbohidratos:</strong> {resultado.carbohidratos} g</p>
    </div>
  );
};