import { useState, useEffect } from 'react';
import { getZoomSession, type ZoomSessionData } from '../utils/api';

export function useZoomSession(courseId: number) {
  const [session, setSession] = useState<ZoomSessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getZoomSession(courseId)
      .then(res => {
        if (res.status === 'success') {
          setSession(res.data);
        } else {
          setError('No se pudo cargar la sesión');
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [courseId]);

  return { session, loading, error };
}