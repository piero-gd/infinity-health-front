import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-2"
      style={{ backgroundImage: "url('/img/login-desktop-bg.png')" }}
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-visible relative">
        {/* Imagen y branding */}
        <div className="hidden md:block md:w-[45%] h-[494px] relative z-10">
          <img
            src="/img/login-desktop.png"
            alt="Infinity Health"
            className="w-full h-[110%] object-contain border-2 ml-[-75px]"
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