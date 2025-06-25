import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-2"
      style={{ backgroundImage: "url('/img/login-desktop-bg.png')" }}
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-visible relative">
        {/* Imagen y branding */}
        <div className="hidden md:block md:w-1/2 h-[500px] relative z-10">
          <img
            src="/img/login-desktop.png"
            alt="Infinity Health"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[120%] object-contain border-2"
          />
        </div>
        {/* Formulario */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 z-20">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}