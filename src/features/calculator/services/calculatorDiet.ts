import { mockDietsPrueba } from '../data/mockDietsPrueba';
import type { Diet } from '../types/index';

export const getDiets = async (): Promise<Diet[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      //resolve(mockDietsPrueba);
    }, 500); // Simula un delay
  });
};
