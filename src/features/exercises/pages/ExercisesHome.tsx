import { useNavigate } from 'react-router-dom';
import { useExercises } from '../hooks/useExercises';
import ExerciseCard from '../components/ExerciseCard';
import Loader from '../../../components/Loader';

export default function ExercisesHome() {
  const { exercises, loading, error } = useExercises();
  const navigate = useNavigate();

  const handleSelect = (index: number) => {
    navigate(`/exercises/${index}`);
  };

  if (loading) return <Loader message="Cargando ejercicios..." />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] px-8 py-10">
      <h1 className="text-3xl font-black mb-10 text-center">¿Qué vas a entrenar hoy?</h1>
      <div className="px-2 sm:px-4 md:px-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:mx-12">
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onClick={() => handleSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}
