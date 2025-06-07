import type { FallbackProps } from 'react-error-boundary';

export function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">¡Vaya! Algo inesperado sucedió.</h2>
      <p className="text-sm text-gray-700 mb-4">{error.message}</p>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={resetErrorBoundary}
      >
        Reintentar
      </button>
    </div>
  );
}
