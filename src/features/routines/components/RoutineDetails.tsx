import type { Exercise } from '../types';

export default function RoutineDetails({ exercise }: { exercise: Exercise }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">{exercise.titulo}</h2>
      <p className="text-gray-300">{exercise.descripcion}</p>
    </div>
  );
}
