import { ClockIcon, PlayCircleIcon } from "@heroicons/react/16/solid";
import type { Exercise } from "../types/exercise";

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

export default function ExerciseCardMobile({ exercise, onClick }: Props) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md flex items-center px-4 py-4 mb-4 cursor-pointer transition hover:shadow-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={exercise.preview_image}
        alt={exercise.title}
        className="rounded-xl w-20 h-20 object-cover flex-shrink-0"
      />
      <div className="flex-1 ml-4">
        <div className="text-base mb-1">{exercise.title}</div>
        <div className="flex items-center text-gray-400 text-xs">
          <ClockIcon className="w-4 h-4 mr-1 text-primary-dark" />
          <span>
            {exercise.duration ? `${exercise.duration} minutos` : "Sin duración"}
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="ml-4 flex items-center justify-center">
          <PlayCircleIcon className="w-10 h-10 text-[var(--color-primary)] drop-shadow-md hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}