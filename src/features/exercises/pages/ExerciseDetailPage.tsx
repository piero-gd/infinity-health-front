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
  if (error) throw new Error('Error al cargar el ejercicio');

  const exercise = exercises.find(e => String(e.id) === String(id));
  if (!exercise) return <div className="text-center mt-10">Ejercicio no encontrado</div>;

  const product = productAds[String(exercise.category).toLowerCase()];

  return (
    <div className="relative mx-auto px-4 sm:px-6 md:px-8 py-10">
      {/* Product Ad sticky/fixed en desktop */}
      {product && (
        <div className="hidden lg:block">
          <div className="fixed top-1/2 right-0 -translate-y-1/2 z-40">
            <ProductAdBox product={product} />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Título */}
        <h1 className="order-2 sm:order-none text-2xl sm:text-3xl md:text-4xl font-black text-center mb-4 mx-2">{exercise.title}</h1>
        {/* Categoría y duración */}
        <div className="order-3 sm:order-none flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
          <span className="text-base sm:text-lg font-semibold text-gray-700">
            {String(exercise.category).charAt(0).toUpperCase() + String(exercise.category).slice(1)}
          </span>
          <span className="flex items-center text-gray-500 text-sm sm:text-base">
            <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary-dark" />
            {exercise.duration} min
          </span>
        </div>
        {/* Video */}
        <div className="order-1 sm:order-none justify-center mb-6">
          <ExerciseVideoPlayer videoUrl={exercise.video_url} />
        </div>
        {/* Descripción */}
        <div className="order-4 sm:order-none bg-white rounded-xl shadow p-4 sm:p-6 mb-8 text-gray-700 text-center max-w-3xl mx-auto">
          <p className="text-sm sm:text-base">{exercise.description}</p>
        </div>
        {/* Formulario de registro de entrenamiento */}
        <div className='order-5 sm:order-none'>
          <ExerciseProgressForm exerciseId={exercise.id} />
        </div>
        <div className="order-6 sm:order-none mt-12">
          <h2 className="text-xl sm:text-2xl font-black mb-6">Entrenamientos Similares</h2>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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