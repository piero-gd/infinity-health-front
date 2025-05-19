import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRoutinesContext } from "../context/RoutinesContext";
import RoutineVideoPlayer from "../components/RoutineVideoPlayer";
import RoutineDetails from "../components/RoutineDetails";
import RestScreen from "../components/RestScreen";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function RoutinePlayerPage({
  onLogout,
}: {
  onLogout: () => void;
}) {
  const {
    routines,
    error,
    currentRoutine,
    currentExercise,
    selectedRoutineIndex,
    selectedExerciseIndex,
    setSelectedRoutineIndex,
    setSelectedExerciseIndex,
    isResting,
    handleVideoEnd,
    handleRestComplete,
  } = useRoutinesContext();

  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();

  // Al cambiar la ruta, sincroniza la rutina seleccionada
  useEffect(() => {
    if (index !== undefined) {
      const idx = parseInt(index, 10);
      if (!isNaN(idx)) {
        setSelectedRoutineIndex(idx);
        setSelectedExerciseIndex(0);
      }
    }
  }, [index]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!routines.length || !currentRoutine || !currentExercise)
    return <p className="text-gray-300 p-4">Cargando...</p>;

  return (
    <div className="flex flex-col flex-1 bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto px-6 py-6 flex flex-col gap-6">
          {/* Botón volver */}
          <button
            onClick={() => navigate("/")}
            className="w-fit inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-accent)] transition-colors px-3 py-1 rounded-full border border-transparent hover:border-[var(--color-primary-accent)]"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Volver
          </button>

          {isResting ? (
            <RestScreen duration={15} onComplete={handleRestComplete} />
          ) : (
            <>
              <h1 className="text-2xl font-semibold">
                {currentRoutine.titulo}
              </h1>
              <p className="text-[var(--color-text-soft)]">
                {currentRoutine.descripcion}
              </p>
              <RoutineVideoPlayer
                videoUrl={currentExercise.video}
              />
              <RoutineDetails exercise={currentExercise} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
