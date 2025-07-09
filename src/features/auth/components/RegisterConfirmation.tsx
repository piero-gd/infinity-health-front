import { useNavigate } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";
export default function RegisterConfirmation() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
              <div className="flex justify-center mb-4">
              <img
                src="/img/health-logo-light-mode.png"
                alt="Infinity Health"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* Boton flecha Desktop y Mobile*/}
                  <div className="md:flex absolute left-12 top-6 items-left gap-2 mb-4 text-[var(--color-primary)]
                    cursor-pointer hover:opacity-80 transition-opacity"
                         onClick={() => navigate(-1)}>
                      <RxChevronLeft size={24} />
                    </div>

            <img src="/img/Icono exito.svg" className="w-55 h-55" />
            <h2 className="text-2xl font-bold mb-4">Cuenta Verificada</h2>
        <p className="text-gray-600 mb-6 mx-20 text-center">Tu cuenta ha sido confirmada exitosamente.
        <br />¡Empieza ahora su viaje de fitness! </p>
            <p className="text-white bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] cursor-pointer hover:opacity-80 transition-opacity  px-10 py-2 rounded-full shadow-md">Iniciar Sesión</p>
        </div>
    );
}   