import type { Exercise } from '../types/exercise';
import { PlayCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

export default function ExerciseCardDesktop({ exercise, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:scale-105 transition-transform flex flex-col mx-8 mt-4"
    >
      <div className="relative w-full aspect-video bg-gray-200 flex items-center justify-center">
        <img
          src={exercise.preview_image || '/img/placeholder-exercise.jpg'}
          alt={exercise.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 transition"
          style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }} // Asegúrate de importar la fuente en tu proyecto
        />
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Texto sobre la imagen alineado a la izquierda */}
        <div className="absolute bottom-0 left-0 w-full flex items-end px-4 pb-4">
          <div>
            <span className="text-white text-lg font-normal" style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}>
              {String(exercise.category).charAt(0).toUpperCase() + String(exercise.category).slice(1)}
            </span>
          </div>
        </div>
        {/* Ícono de play */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PlayCircleIcon className="w-16 h-16 text-gray-300 group-hover:text-white transition" />
        </div>
      </div>
      <div className="px-6 py-4 flex flex-col gap-2">
        <h2 className="text-lg font-normal text-left" style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}>
          {exercise.title}
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <ClockIcon className="w-5 h-5 mr-1 text-primary-dark" />
          <span>
            {exercise.duration ? `${exercise.duration} Minutos` : "Sin duración"}
          </span>
        </div>
      </div>
    </div>
  );
}