import { useRoutines } from "../hooks/useRoutines";
import RoutineNavbar from "../components/RoutineNavbar";
import RoutineSidebar from "../components/RoutineSidebar";
import RoutineVideoPlayer from "../components/RoutineVideoPlayer";
import RoutineDetails from "../components/RoutineDetails";
import { useState } from "react";
import RestScreen from "../components/RestScreen";

export default function RoutinesHome({
  onLogout,
}: {
  token: string;
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
  } = useRoutines();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!routines.length || !currentRoutine || !currentExercise)
    return <p className="text-gray-300 p-4">Cargando...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <RoutineNavbar onLogout={onLogout} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-auto">
        <RoutineSidebar
          routines={routines}
          selectedRoutineIndex={selectedRoutineIndex}
          selectedExerciseIndex={selectedExerciseIndex}
          setSelectedRoutineIndex={setSelectedRoutineIndex}
          setSelectedExerciseIndex={setSelectedExerciseIndex}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-auto px-6 py-6 items-center">
          {/* Si estamos en descanso, mostramos RestScreen */}
          {isResting ? (
            <RestScreen duration={15} onComplete={handleRestComplete} />
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-4">{currentRoutine.titulo}</h1>
              <p className="mb-6">{currentRoutine.descripcion}</p>
              <RoutineVideoPlayer videoUrl={currentExercise.video} onEnded={handleVideoEnd} />
              <RoutineDetails exercise={currentExercise} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
