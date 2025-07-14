import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { showToast } from '../../../utils/toastConfig';

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login, isLoading: loading } = useLogin();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.username.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      showToast.error(
        'Ingresa un email válido',
        'Inténtalo de nuevo'
      );
      return;
    } 

    if (!formData.password) {
      showToast.error(
        'Ingresa tu contraseña',
        'Inténtalo de nuevo'
      );
      return;
    }

    try {
      // Intentar hacer login
      await login({
        username: formData.username,
        password: formData.password
      });
      showToast.success(
        'Inicio de sesión exitoso',
        'Bienvenido'
      );
      
      // La redirección se maneja en el hook useLogin
    } catch (err) {
      showToast.error(
        'Credenciales incorrectas',
        'Inténtalo de nuevo'
      );
      console.error('Error en el login:', err);
    }
  };

  return (
    <div className="w-full ">
      {/* Branding mobile eliminado */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-none md:p-0 flex flex-col gap-4"
        autoComplete="off"
      >
        <h2 className="text-xl font-bold text-center md:text-left mb-2 text-text">
          Inicia sesión en tu cuenta
        </h2>
        <p className="font-semibold text-text-muted mb-2 text-sm md:text-base ">
          Por favor ingresa tu usuario y contraseña
        </p>
        {/* Usuario */}
        <div>
          <label htmlFor="username" className="block text-sm font-semibold text-text-soft mb-1">
            Email
          </label>
          <input
            id="username"
            name="username"
            type="email"
            placeholder="Ej: jimmy@gmail.com"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-3xl border ${
              error ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={loading}
            autoFocus
          />
          {error && (
            <span className="text-xs text-red-500 mt-1 block">{error}</span>
          )}
        </div>
        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-text-soft mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-3xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base"
            disabled={loading}
          />
        </div>
        {/* Recordar y Olvidaste */}
        <div className="flex items-center justify-between text-sm mt-1">
            <label className="flex items-center gap-2">
              <input
              type="checkbox"
              className="accent-[var(--color-primary)] rounded-full"
              style={{ width: 20, height: 20 }}
              disabled={loading}
              />
              Recordar contraseña
            </label>
          <a href="/forgot-password" className="text-[var(--color-primary)] font-medium hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-full text-white font-bold text-lg mt-2 transition-all
            bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)]
            hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)]
            shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
        {/* Crear cuenta */}
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="font-semibold text-text-muted">
            ¿Aún no tienes una cuenta?
          </span>
          <a href="/register" className="font-bold text-[var(--color-primary)] hover:underline">
            Crear cuenta
          </a>
        </div>
      </form>
    </div>
  );
}
