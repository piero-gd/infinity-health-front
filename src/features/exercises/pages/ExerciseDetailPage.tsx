import { useParams, useNavigate } from 'react-router-dom';
import { useExercises } from '../hooks/useExercises';
import ExerciseVideoPlayer from '../components/ExerciseVideoPlayer';
import Loader from '../../../components/Loader';
import { ClockIcon } from '@heroicons/react/24/solid';
import ExerciseCard from '../components/ExerciseCard';
import ExerciseProgressForm from '../components/ExerciseProgressForm';
import { productAds } from '../data/exerciseProducts';
import ProductAdBox from '../components/ProductAdBox';

export default function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { exercises, loading, error } = useExercises();
  const navigate = useNavigate();

  if (loading) return <Loader message="Cargando ejercicio..." />;
  if (error) return <div>Error: {error}</div>;

  const exercise = exercises.find(e => String(e.id) === String(id));
  if (!exercise) return <div className="text-center mt-10">Ejercicio no encontrado</div>;

  const product = productAds[String(exercise.category).toLowerCase()];

  return (
    <div className="relative mx-auto px-0 md:px-0 py-10">
      {/* Product Ad sticky/fixed en desktop */}
      {product && (
        <div className="hidden lg:block">
          <div className="fixed top-28 right-0 z-40">
            <ProductAdBox product={product} />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-black text-center mb-2">{exercise.title}</h1>
        {/* Categoría y duración */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-lg font-semibold text-gray-700">{exercise.category}</span>
          <span className="flex items-center text-gray-500 text-base">
            <ClockIcon className="w-5 h-5 mr-1 text-blue-400" />
            {exercise.duration} min
          </span>
        </div>
        {/* Video */}
        <div className="justify-center mb-6">
          <ExerciseVideoPlayer videoUrl={exercise.video_url} />
        </div>
        {/* Descripción */}
        <div className="bg-white rounded-xl shadow p-6 mb-8 text-gray-700 text-center max-w-3xl mx-auto">
          <p>{exercise.description}</p>
        </div>
        {/* Formulario de registro de entrenamiento */}
        <ExerciseProgressForm
          onSubmit={(data) => {
            // TODO: enviar datos al backend
            console.log("Progreso registrado:", data);
          }}
        />
        <div className="mt-12">
          <h2 className="text-2xl font-black mb-6">Entrenamientos Similares</h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {exercises
              .filter(
                (e) =>
                  e.category === exercise.category &&
                  e.id !== exercise.id
              )
              .slice(0, 3)
              .map((similar) => (
                <ExerciseCard
                  key={similar.id}
                  exercise={similar}
                  onClick={() => navigate(`/exercises/${similar.id}`)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}