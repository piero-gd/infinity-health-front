import type { Exercise } from '../types';

export default function RoutineDetails({ exercise }: { exercise: Exercise }) {
  return (
    <div className="bg-[var(--color-background)] p-4 rounded-lg shadow max-w-7xl mr-32">
      <h2 className="text-xl font-semibold mb-2">{exercise.titulo}</h2>
      <p>{exercise.descripcion}</p>
    </div>
  );
}
