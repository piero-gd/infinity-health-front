import type { Exercise } from '../types/exercise'

export default function ExerciseDetails({ exercise }: { exercise: Exercise }) {
  return (
    <div className="bg-[var(--color-background)] p-4 rounded-lg shadow max-w-7xl mr-32">
      <h2 className="text-xl font-semibold mb-2">{exercise.title}</h2>
      <p>{exercise.description}</p>
    </div>
  );
}
