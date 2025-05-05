import { useRoutines } from '../hooks/useRoutines';
import RoutineNavbar from '../components/RoutineNavbar';
import RoutineSidebar from '../components/RoutineSidebar';
import RoutineVideoPlayer from '../components/RoutineVideoPlayer';
import RoutineDetails from '../components/RoutineDetails';

export default function RoutinesHome({ token, onLogout }: { token : string; onLogout: () => void }) {
  const {
    routines,
    error,
    currentRoutine,
    currentExercise,
    selectedRoutineIndex,
    selectedExerciseIndex,
    setSelectedRoutineIndex,
    setSelectedExerciseIndex,
  } = useRoutines();

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!routines.length || !currentRoutine || !currentExercise)
    return <p className="text-gray-300 p-4">Cargando...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <RoutineNavbar onLogout={onLogout} />
      <div className="flex flex-1 overflow-auto">
        <div className="flex-1 overflow-auto px-6 py-6">
          <h1 className="text-2xl font-semibold mb-4">{currentRoutine.titulo}</h1>
          <p className="mb-6 text-gray-300">{currentRoutine.descripcion}</p>
          <RoutineVideoPlayer videoUrl={currentExercise.video} />
          <RoutineDetails exercise={currentExercise} />
        </div>
        <RoutineSidebar
          routines={routines}
          selectedRoutineIndex={selectedRoutineIndex}
          selectedExerciseIndex={selectedExerciseIndex}
          setSelectedRoutineIndex={setSelectedRoutineIndex}
          setSelectedExerciseIndex={setSelectedExerciseIndex}
        />
      </div>
    </div>
  );
}
