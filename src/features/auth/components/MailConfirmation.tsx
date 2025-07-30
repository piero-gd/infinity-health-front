import { useNavigate } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";

export default function MailConfirmation() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
              <div className="flex justify-center mb-4">
              <img
                src="/img/health-logo-light-mode.png"
                alt="Infinity Health"
                className="h-10 w-auto object-contain "
                onClick={() => window.location.href = 'VITE_PRINCIPAL_WEB' }
              />
            </div>

{/* Boton flecha Desktop y Mobile*/}
      <div className="md:flex absolute left-12 top-6 items-left gap-2 mb-4 text-[var(--color-primary)]
        cursor-pointer hover:opacity-80 transition-opacity"
             onClick={() => navigate(-1)}>
          <RxChevronLeft size={24} />
        </div>


            <img src="/img/Icono Correo Verificado.svg" className="w-55 h-55 animate-pulse" />
            <h2 className="text-2xl font-bold mb-4">Verifica tu correo</h2>
        <p className="text-gray-600 mb-6 mx-20 text-center">¡Revisa tu bandeja de entrada! <br />
            Te hemos enviado un correo para activar tu cuenta. <br />
            Haz clic en el enlace para continuar.</p>
            <p className="text-gray-600 mb-4 mx-20 text-center font-semibold">¿No recibiste el correo?</p>
            <button className="text-[var(--color-primary)] bg-white border-2 border-[var(--color-primary)] px-10 py-2 rounded-full shadow-md cursor-pointer hover:opacity-80 transition-opacity">Reenviar</button>
        </div>
    );
}