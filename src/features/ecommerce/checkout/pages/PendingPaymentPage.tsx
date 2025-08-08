import { useNavigate } from 'react-router-dom';

/**
 * Página que muestra información cuando el pago está pendiente
 */
export default function PendingPaymentPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl py-16 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-md text-center">
        <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-yellow-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Pago en Proceso
        </h1>
        
        <p className="text-gray-600 mb-6">
          Tu pago está siendo procesado. El banco puede tardar hasta 48 horas en confirmar la transacción.
          Te notificaremos por correo electrónico cuando el pago haya sido aprobado.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-xl mb-6">
          <p className="text-sm text-gray-600">
            Si tienes alguna pregunta sobre el estado de tu pago, por favor contáctanos a 
            <a href="mailto:soporte@infinityhealth.com" className="text-blue-600 hover:underline ml-1 cursor-pointer">
              soporte@infinityhealth.com
            </a>
          </p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
