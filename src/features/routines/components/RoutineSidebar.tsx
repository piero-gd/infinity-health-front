import { ListBulletIcon, PlayCircleIcon } from '@heroicons/react/24/solid';
import type { Routine } from '../types';

interface Props {
  routines: Routine[];
  selectedRoutineIndex: number;
  selectedExerciseIndex: number;
  setSelectedRoutineIndex: (i: number) => void;
  setSelectedExerciseIndex: (i: number) => void;
}

export default function RoutineSidebar({
  routines,
  selectedRoutineIndex,
  selectedExerciseIndex,
  setSelectedRoutineIndex,
  setSelectedExerciseIndex,
}: Props) {
  return (
    <div className="w-80 bg-[var(--color-background)] border-l border-[var(--color-border)] p-4 overflow-auto">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <ListBulletIcon className="h-6 w-6 text-[var(--color-primary-accent)]" />
        Contenido
      </h2>
      {routines.map((routine, rIndex) => (
        <div key={rIndex} className="bg-[var(--color-surface)] rounded-lg shadow p-4 mb-4">
          <button
            onClick={() => {
              setSelectedRoutineIndex(rIndex);
              setSelectedExerciseIndex(0);
            }}
            className={`block w-full text-left font-semibold mb-2 items-center gap-2 ${
              rIndex === selectedRoutineIndex ? 'text-[var(--color-primary-accent)]' : 'text-gray-200'
            }`}
          >
            {routine.titulo}
          </button>
          <ul className="ml-2 space-y-2">
            {routine.ejercicios.map((exercise, eIndex) => (
              <li key={eIndex}>
                <button
                  onClick={() => {
                    setSelectedRoutineIndex(rIndex);
                    setSelectedExerciseIndex(eIndex);
                  }}
                  className={`text-sm hover:text-[var(--color-primary-accent)] transition-colors flex items-center gap-2 ${
                    rIndex === selectedRoutineIndex && eIndex === selectedExerciseIndex
                      ? 'text-[var(--color-primary-light)]'
                      : 'text-[var(--color-text-muted)]'
                  }`}
                >
                  <PlayCircleIcon className="h-4 w-4 text-[var(--color-primary-accent)]" />
                  {exercise.titulo}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
