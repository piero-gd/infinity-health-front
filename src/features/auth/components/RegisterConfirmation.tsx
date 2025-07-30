import { useNavigate } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";

export default function RegisterConfirmation() {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_HOME_URL || 'https://infinityhealth.fit';
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
           {/* Boton flecha Desktop y Mobile*/}
           <div className="md:flex absolute left-12 top-6 items-left gap-2 mb-4 text-[var(--color-primary)]
                    cursor-pointer hover:opacity-80 transition-opacity"
                     onClick={() => navigate('/login')}>
                    <RxChevronLeft size={24} />
                </div>
            {/* Contenedor principal */}
            <div className="bg-white p-8 w-full max-w-md relative">
                {/* Logo centrado */}
                <div className="flex justify-center mb-25 mt-4">
                    <img
                        src="/img/health-logo-light-mode.png"
                        alt="Infinity Health"
                        className="h-10 w-auto object-contain"
                        onClick={() => window.location.href = baseUrl }
                    />
                </div>
                <div className="flex justify-center mb-30 mt-4">
                <img src="/img/Icono exito.svg" className="w-65 h-65 absolute top-12" />
                </div>

                {/* Título */}
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Cuenta verificada</h2>

                {/* Texto explicativo */}
                <p className="text-gray-600 mb-8 text-center leading-relaxed">
                    Tu cuenta ha sido confirmada exitosamente.<br />
                    ¡Empieza ahora tu viaje de fitness!
                </p>

                {/* Botón */}
                <button 
                    className="w-full text-white bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:opacity-90 transition-opacity px-6 py-3 rounded-full font-medium shadow-md"
                    onClick={() => navigate('/login')}
                >
                    Iniciar sesión
                </button>
            </div>
        </div>
    );
}