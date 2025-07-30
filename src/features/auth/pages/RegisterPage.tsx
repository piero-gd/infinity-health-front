import { useNavigate } from 'react-router-dom';
import { RxChevronLeft } from "react-icons/rx";
import RegisterForm from "../components/RegisterForm";
export default function RegisterPage() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL || 'https://infinityhealth.fit';
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Fondo solo para desktop */}
      <div className="hidden md:block fixed inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img/login-desktop-bg.png')" }} />
      <div className="relative z-10 flex flex-col flex-1 mx-12">
        <div className="flex flex-col flex-1 md:items-center md:justify-center ">
          {/* Header móvil con flecha y logo */}
          <div className="md:hidden w-full pt-8 pb-6 px-4">
            <button 
              onClick={() => navigate('/login')}
              className="mb-4 text-[var(--color-primary)]"
            >
              <RxChevronLeft size={24} />
            </button>
            <div className="flex justify-center">
              <img
                src="/img/health-logo-light-mode.png"
                alt="Infinity Health"
                className="h-10 w-auto object-contain"
                onClick={() => window.location.href = baseUrl}
              />
            </div>
          </div>

<div className="hidden md:flex absolute left-0 top-6 items-left gap-2 mb-4 text-white
cursor-pointer hover:opacity-80 transition-opacity"
     onClick={() => navigate('/login')}>
  <RxChevronLeft size={24} />
</div>
          
          {/* Contenedor del formulario */}
          <div className="flex-1 md:flex-none w-full max-w-5xl bg-white rounded-t-3xl md:rounded-3xl
          xl:rounded-3xl xl:shadow-lg md:shadow-lg flex flex-col md:flex-row overflow-visible relative md:my-12 transformmd:transform-none scale-[0.98] md:scale-100 origin-top">
            {/* Imagen desktop */}
            <div className="hidden xl:block md:w-[45%] h-[494px] relative z-10">
              <img
                src="/img/FOTO MARCO Y CECILIA LOGIN.png"
                alt="Infinity Health"
                className="w-full h-full top-25 -right-5 scale-135 object-contain relative"
              />
            </div>
            {/* Formulario */}
            <div className="flex-1 md:w-[55%] flex items-center justify-center p-6 md:p-12 z-20">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}