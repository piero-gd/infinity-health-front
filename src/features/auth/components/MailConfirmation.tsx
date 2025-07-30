import { useNavigate } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";
import { useResendMail } from "../hooks/useResendMail";
import { toast } from "../../../utils/toastConfig";

export default function MailConfirmation() {
    const navigate = useNavigate();
    const { resendConfirmation, isLoading } = useResendMail();

    const handleResend = async () => {
        const success = await resendConfirmation();
        if (success) {
            toast.success("Correo reenviado", "Se ha enviado un nuevo correo de verificación");
        } else {
            toast.error("Error", "No se pudo reenviar el correo. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <div className="flex justify-center mb-4">
                <img
                    src="/img/health-logo-light-mode.png"
                    alt="Infinity Health"
                    className="h-10 w-auto object-contain cursor-pointer"
                    onClick={() => (window.location.href = 'VITE_PRINCIPAL_WEB')}
                />
            </div>

            {/* Boton flecha Desktop y Mobile */}
            <div 
                className="md:flex absolute left-12 top-6 items-left gap-2 mb-4 text-[var(--color-primary)]
                cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate(-1)}
            >
                <RxChevronLeft size={24} />
            </div>

            <img 
                src="/img/Icono Correo Verificado.svg" 
                className="w-55 h-55 animate-pulse" 
                alt="Correo verificado"
            />
            <h2 className="text-2xl font-bold mb-4">Verifica tu correo</h2>
            <p className="text-md text-gray-800 mb-6 mx-8 text-center">
                ¡Revisa tu bandeja de entrada! <br />
                Te hemos enviado un correo para activar tu cuenta. <br />
                Haz clic en el enlace para continuar.
            </p>

            <div className="text-center w-full max-w-xs">
                <p className="text-gray-600 mb-4 text-center font-semibold">
                    ¿No recibiste el correo?
                </p>
                
                <button 
                    onClick={handleResend}
                    disabled={isLoading}
                    className={`text-[var(--color-primary)] bg-white
                    border-2 border-[var(--color-primary)] px-8 py-2 rounded-full
                    shadow-md w-full transition-opacity
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-80 cursor-pointer'}`}
                >
                    {isLoading ? 'Enviando...' : 'Reenviar correo'}
                </button>
            </div>
        </div>
    );
}