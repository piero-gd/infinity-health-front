import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const checkAuth = () => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token'); // Si usas tokens JWT
      
      // Verificar si hay un usuario autenticado
      const authStatus = !!(username || token);
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Si aún está cargando, muestra un indicador de carga o null
  if (isLoading) {
    return null; // O puedes devolver un componente de carga
  }

  // Si se requiere autenticación y el usuario no está autenticado, redirigir al login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Si se especificó un origen permitido, verificar que venga de allí
  if (allowedFrom && location.state?.from !== allowedFrom) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Si todo está bien, renderizar los hijos
  return <>{children}</>;
};
