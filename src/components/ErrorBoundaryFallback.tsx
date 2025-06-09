import type { FallbackProps } from 'react-error-boundary';

export function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-6 text-center">
      {/* Imagen GIF de error */}
      <img
        className="mx-auto mb-4"
        src="/gif/sad-cat.gif"
        alt="Error"
        style={{ maxWidth: '200px' }}
      />

      <h2 className="text-2xl font-bold text-red-600 mb-2">¡Vaya! Algo falló...y no fue tu músculo.</h2>
      <p className="text-sm text-gray-700 mb-4">{error.message}</p>
      <button
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        onClick={resetErrorBoundary}
      >
        Reintentar
      </button>
    </div>
  );
}
