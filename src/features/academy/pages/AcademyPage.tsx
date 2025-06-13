import { useParams } from 'react-router-dom';
import { useZoomSession } from '../hooks/useZoomSession';
import ZoomSession from '../components/ZoomSession';
import Loader from '../../../components/Loader';

type Params = { id: string };

export default function AcademyPage() {
  const { id } = useParams<Params>();
  const courseId = Number(id) || 1; // por defecto 1 si viene mal
  const { session, loading, error } = useZoomSession(courseId);

  if (loading) return <Loader message="Cargando sesión..." />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!session) return <div className="text-center mt-10">Sesión no encontrada</div>;

  return (
    <div className="academy-page flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
        Sesión en Vivo: Academia {courseId}
      </h1>
      <ZoomSession session={session} courseId={courseId} />
    </div>
  );
}
