import type { Exercise } from '../types/exercise';
import { PlayCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

export default function ExerciseCard({ exercise, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform flex flex-col mx-8 mt-4"
    >
      <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center">
        <img
          src={exercise.preview_image || '/img/placeholder-exercise.jpg'}
          alt={exercise.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Ícono de play */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <PlayCircleIcon className="w-16 h-16 text-gray-300 group-hover:text-white transition" />
        </div>
        {/* Categoría en la parte inferior de la imagen */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center">
          <span className="bg-black/60 text-white text-lg font-semibold px-4 py-2 rounded-t-lg mb-0">
            {exercise.category}
          </span>
        </div>
      </div>
      <div className="px-6 py-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-left">{exercise.title}</h2>
        <div className="flex items-center text-sm text-gray-500">
          <ClockIcon className="w-5 h-5 mr-1 text-blue-400" />
          <span>
            {exercise.duration ? `${exercise.duration} Minutos` : "Sin duración"}
          </span>
        </div>
      </div>
    </div>
  );
}