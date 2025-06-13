import { useParams } from 'react-router-dom';
import ZoomSession from '../components/ZoomSession';

type Params = { id: string };

export default function AcademyPage() {
  const { id } = useParams<Params>();
  const courseId = Number(id) || 1; // por defecto 1 si viene mal

  return (
    <div className="academy-page flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 md:px-8 py-10">
      <head>
        <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' https://app.zoom.us;">
      </head>
      <h1 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">
        Sesión en Vivo: Academia {courseId}
      </h1>
      <ZoomSession courseId={courseId} />
    </div>
  );
}
