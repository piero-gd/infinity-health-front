import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";
import { GoCheckCircleFill, GoAlertFill } from "react-icons/go";
import { useForgotPass } from '../hooks/useForgotPass';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const { resetPassword, isLoading, error, success } = useForgotPass();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await resetPassword(email);
    };
    
    // Success message will be shown below the form
    
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            {/* Boton flecha Desktop y Mobile */}
            <div className="md:flex absolute left-12 top-6 items-left gap-2 mb-4 text-[var(--color-primary)]
                  cursor-pointer hover:opacity-80 transition-opacity"
                   onClick={() => navigate(-1)}>
                <RxChevronLeft size={24} />
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white p-8 w-full max-w-md relative">
                {/* Logo centrado */}
                <div className="flex justify-center mb-8 mt-4">
                    <img
                        src="/img/health-logo-light-mode.png"
                        alt="Infinity Health"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Texto explicativo */}
              
                <p className="text-gray-600 mb-8 text-center leading-relaxed">
                    Ingrese el correo electrónico asociado con su cuenta y le enviaremos un correo electrónico con un link para restablecer su contraseña
                </p>

                {/* Mensaje de error */}
                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-start gap-2">
                        <GoAlertFill className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Campo de email */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Escribe tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-base placeholder-gray-400"
                        disabled={isLoading}
                        required
                    />
                </div>

                {/* Botón de enviar */}
                <button 
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-white bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:opacity-90 transition-opacity px-6 py-3 rounded-full font-medium shadow-md mb-6 flex justify-center items-center ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                        </>
                    ) : 'Enviar enlace'}
                </button>

                {/* Success message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center mb-6">
                        <GoCheckCircleFill className="w-6 h-6 text-[var(--color-exito-icon)] mr-3 flex-shrink-0" />
                        <span className="text-green-700 text-sm">
                            Te hemos enviado un enlace a <span className="font-medium">{email}</span> para que puedas restablecer tu contraseña.
                        </span>
                    </div>
                )}

            </form>
        </div>
    );
}