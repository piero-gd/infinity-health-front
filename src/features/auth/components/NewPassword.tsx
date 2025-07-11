import { useNavigate } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";

export default function NewPassword() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            {/* Contenedor principal */}

              {/* Boton flecha Desktop y Mobile*/}
              <div className="md:flex absolute left-12 top-6 items-left gap-2 mb-4 text-[var(--color-primary)]
                    cursor-pointer hover:opacity-80 transition-opacity"
                     onClick={() => navigate(-1)}>
                    <RxChevronLeft size={24} />
                </div>
            <div className="bg-white p-8 w-full max-w-md relative">
                
      
                {/* Logo centrado */}
                <div className="flex justify-center mb-8 mt-4">
                    <img
                        src="/img/health-logo-light-mode.png"
                        alt="Infinity Health"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Texto explicativo */}
                <h2      className="text-xl font-bold mb-8 text-center text-text leading-relaxed">
Crear una contraseña                </h2>

                {/* Campo de contraseña */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value=""
                        onChange={() => {}}
                        className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-base placeholder-gray-400"
                    />
                </div>

                {/* Campo de confirmar contraseña */}
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Contraseña
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value=""
                        onChange={() => {}}
                        className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-base placeholder-gray-400"
                    />
                </div>

                {/* Botón enviar */}
                <button 
                    className="w-full text-white bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:opacity-90 transition-opacity px-6 py-3 rounded-full font-medium shadow-md mb-6"
                    onClick={() => navigate('/login')}
                >
                    Actualizar Contraseña
                </button>

                {/* ¿Tienes cuenta? */} 
                <p className="text-sm text-center text-text-muted">
                    ¿Tienes cuenta? <a href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">Iniciar sesión</a>
                </p>
               
            </div>
        </div>
    );
}