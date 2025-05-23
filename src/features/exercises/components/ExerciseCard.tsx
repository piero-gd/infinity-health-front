import type { Exercise } from '../types/exercise';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

export default function ExerciseCard({ exercise, onClick }: Props) {
  return (
    <div className="flex flex-col items-center mx-6 mt-4">
      <div
        onClick={onClick}
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform w-full"
      >
        <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center">
          <img
            src={exercise.preview_image || '/img/placeholder-exercise.jpg'}
            alt={exercise.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <PlayCircleIcon className="w-16 h-16 text-gray-300 group-hover:text-white transition" />
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mt-4 mb-1 text-center">{exercise.title}</h2>
      <div className="text-sm text-gray-500 mb-2 text-center">{exercise.duration || "Sin duración"}</div>
    </div>
  );
}