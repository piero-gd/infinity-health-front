import { mockRoutines } from '../data/mockRoutines';
import type { Routine } from '../types/index';

export const getRoutines = async (): Promise<Routine[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoutines);
    }, 500); // Simula un delay
  });
};
