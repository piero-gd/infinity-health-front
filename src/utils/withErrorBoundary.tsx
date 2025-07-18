import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "../components/ErrorBoundaryFallback";
import type { ComponentType, PropsWithChildren, ReactElement } from 'react';

/**
 * HOC para envolver componentes con ErrorBoundary
 * @param Component Componente a envolver
 * @returns Componente envuelto con ErrorBoundary
 */
export const withErrorBoundary = <P extends object>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P): ReactElement => (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

/**
 * HOC para envolver un elemento JSX con ErrorBoundary
 * @param children Elementos hijos a envolver
 * @returns Elemento envuelto con ErrorBoundary
 */
export const WithErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    {children}
  </ErrorBoundary>
);
