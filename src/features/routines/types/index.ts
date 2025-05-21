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
