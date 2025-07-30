import LoginForm from '../components/LoginForm';
import { RxChevronLeft } from 'react-icons/rx';

export default function LoginPage() {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL || 'https://infinityhealth.fit';
  return (
    <div
      className="min-h-screen flex flex-col md:items-center md:justify-center bg-cover bg-center px-0 md:px-6"
      style={{ backgroundImage: "url('/img/login-desktop-bg.png')" }}
    >
      
      {/* Imagen arriba solo en mobile */}
      <div className="md:hidden w-full flex justify-center pb-2 bg-transparent">
        <img
          src="/img/login-mobile.png"
          alt="Infinity Health"
          className="w-full h-auto rounded-2xl object-cover"
          onClick={() => window.location.href = baseUrl}
        />
      </div>
      
      {/* Boton flecha Desktop */}
      <div className="hidden md:flex absolute left-12 top-6 items-left gap-2 mb-4 text-white
        cursor-pointer hover:opacity-80 transition-opacity"
             onClick={() => window.location.href = baseUrl}
             >
          <RxChevronLeft size={24} />
        </div>

        {/* Boton flecha Mobile */}
        <div className="block md:hidden absolute left-3 xl:left-5 xl:top-10 top-8 items-left gap-2 mb-4 text-[var(--color-primary)]
cursor-pointer hover:opacity-90 transition-opacity rounded-full bg-white p-2 shadow-md"
     onClick={() => window.location.href = baseUrl}>
  <RxChevronLeft size={24} />
</div>

      {/* Card blanco */}
      <div className="flex-1 md:flex-none w-full max-w-4xl  bg-white rounded-t-3xl
      md:rounded-3xl shadow-lg flex flex-col md:flex-row overflow-visible
      relative md:my-12 mt-[-30%]">

        {/* Imagen desktop */}
        <div className="hidden xl:block md:w-[45%] h-[494px] relative z-10">
          <img
            src="/img/FOTO MARCO Y CECILIA LOGIN.png"
            alt="Infinity Health"
            className="absolute top-5 right-0 w-full h-full scale-110
           object-contain"
          />
        </div>

        {/* Formulario */}
        <div className="flex-1 md:w-[55%] flex items-center justify-center p-6 md:p-12 z-20">
          <LoginForm />
        </div>
      </div>
      
    </div>
  );
}