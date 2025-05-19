export interface Clase {
  titulo: string;
  descripcion: string;
  duracion: string;
  completado: boolean;
  video: string;
}

export interface Modulo {
  titulo: string;
  descripcion: string;
  clases: Clase[];
}

export interface Exercise {
  id: number;
  titulo: string;
  descripcion: string;
  video: string;
  foto: string;
  rutina: number;
}

export interface Routine {
  id: number;
  titulo: string;
  descripcion: string;
  fotos: string;
  ejercicios: Exercise[];
}
