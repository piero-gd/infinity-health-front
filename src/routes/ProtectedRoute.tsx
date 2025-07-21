import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../features/auth/stores/useAuthStore';

type ProtectedRouteProps = {
  children: ReactNode;
  allowedFrom?: string;
  redirectTo?: string;
  requireAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  allowedFrom,
  redirectTo = '/login',
  requireAuth = true,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Usamos el store de Zustand para obtener el estado de autenticación
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    // Efecto para manejar la carga inicial
    setIsLoading(false);
  }, []);

  // Efecto para manejar cambios en la autenticación
  useEffect(() => {
    // Este efecto se ejecutará cuando cambie el estado de autenticación
    // El siguiente bloque if se encargará de redirigir cuando sea necesario
    console.log('[ProtectedRoute] Estado de autenticación cambiado:', { isAuthenticated });
  }, [isAuthenticated]);

  // Si aún está cargando, muestra un indicador de carga
  if (isLoading) {
    return null; // O puedes devolver un componente de carga
  }

  // Si se requiere autenticación y el usuario no está autenticado, redirigir al login
  if (requireAuth && !isAuthenticated) {
    // Si ya estamos en proceso de redirección, no redirigir nuevamente
    const isRedirecting = sessionStorage.getItem('redirecting_to_login');
    if (isRedirecting === 'true') {
      console.log('[ProtectedRoute] Ya se está redirigiendo al login, evitando redirección duplicada');
      return null;
    }
    
    // Marcar que estamos en proceso de redirección
    sessionStorage.setItem('redirecting_to_login', 'true');
    
    // Limpiar el estado después de un tiempo
    setTimeout(() => {
      sessionStorage.removeItem('redirecting_to_login');
    }, 1000);
    
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Si se especificó un origen permitido, verificar que venga de allí
  if (allowedFrom && location.state?.from !== allowedFrom) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Si todo está bien, renderizar los hijos
  return <>{children}</>;
};
