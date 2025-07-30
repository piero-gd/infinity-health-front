import { useParams } from 'react-router-dom';
import { useZoomSession } from '../hooks/useZoomSession';
import ZoomSession from '../components/ZoomSession';
import Loader from '../../../components/Loader';
import { useState, useEffect } from 'react';

type Params = { id: string };

export default function AcademyPage() {
  const { id } = useParams<Params>();
  const courseId = Number(id) || 1; // por defecto 1 si viene mal
  const { session, loading: sessionLoading, error } = useZoomSession(courseId);
  
  // Estado unificado para controlar toda la carga
  const [isPageReady, setIsPageReady] = useState(false);

  // Esperamos un tiempo breve después de que los datos estén listos
  // para asegurar una transición suave y una sola carga
  useEffect(() => {
    if (session && !sessionLoading) {
      // Damos un pequeño margen para que se prepare todo
      const timer = setTimeout(() => {
        setIsPageReady(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [session, sessionLoading]);

  // Mostrar un único loader mientras la página no esté lista
  if (!isPageReady) {
    return (
      <div className="academy-page flex flex-col items-center justify-center min-h-screen">
        <Loader message="Preparando sesión de Academia..." />
      </div>
    );
  }

  if (error) throw new Error("Error al cargar la sesión de Zoom");
  if (!session) return <div className="text-center mt-10">Sesión no encontrada</div>;

  return (
    <div className="academy-page flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
        Sesión en Vivo: Academia {courseId}
      </h1>
      <ZoomSession session={session} courseId={courseId} />
    </div>
  );
}
