import { ClockIcon, PlayCircleIcon } from "@heroicons/react/16/solid";
import type { Exercise } from "../types/exercise";

interface Props {
  exercise: Exercise;
  onClick: () => void;
}

export default function ExerciseCardMobile({ exercise, onClick }: Props) {
  return (
    <div
      className="bg-white rounded-2xl shadow flex items-center px-3 py-5 mb-4 cursor-pointer transition hover:shadow-lg"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={exercise.preview_image}
        alt={exercise.title}
        className="rounded-xl w-16 h-16 object-cover flex-shrink-0"
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
      <PlayCircleIcon className="ml-4 w-7 h-7 text-[var(--color-primary)] transition group-hover:text-btn-hover" />
    </div>
  );
}