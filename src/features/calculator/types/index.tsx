export interface CalculatorData {
  nombre: string;
  sexo: string;
  edad: number;
  peso: number;
  altura: number;
  actividad: string;
  objetivo: string;
}

export interface CalculatorResults {
  calorias: number;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  nombre: string;
  objetivo: string;
}

export interface Diet { 
  status: string;
  content: {
    name: string;
    calories: number;
    items: {
      food: string;
      quantity: string;
      calories: number;
    }[];
  }[];
}
