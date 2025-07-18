import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { showToast } from '../../../utils/toastConfig';

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [hasError, setHasError] = useState(false);
  const { login, isLoading: loading } = useLogin();

  // Function to clear previous error message
  const clearError = () => {
    setError('');
    setHasError(false);
  };

  // Function to show error with toast
  const showError = (title: string, description: string) => {
    if (!hasError) {
      showToast.error(title, description);
      setHasError(true);
      // Clear error after 3 seconds
      setTimeout(clearError, 3000);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    const email = formData.username.trim();
    
    // Verificar si el campo está vacío
    if (!email) {
      showError(
        'El email es requerido',
        'Por favor ingresa tu email'
      );
      return;
    }

    // Verificar si contiene @
    if (!email.includes('@')) {
      showError(
        'El email debe contener @',
        'Por ejemplo: nombre@dominio.com'
      );
      return;
    }

    // Verificar formato básico de email
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(email)) {
      showError(
        'Formato de email inválido',
        'Por favor ingresa un email válido'
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
      
      // La redirección se maneja en el hook useLogin
    } catch (err: any) {
      if (err.message.includes('email not found')) {
        showError(
          'Email no encontrado',
          'Este email no está registrado en nuestro sistema'
        );
      } else if (err.message.includes('invalid password')) {
        showError(
          'Contraseña incorrecta',
          'La contraseña ingresada no es correcta'
        );
      } else if (err.message.includes('inactive account')) {
        showError(
          'Cuenta inactiva',
          'Por favor contacta al administrador'
        );
      } else if (err.message.includes('too many attempts')) {
        showError(
          'Demasiados intentos',
          'Has excedido el número de intentos permitidos'
        );
      } else if (!hasError) {
        // Only show generic error if no error is currently showing
        showError(
          'Error al iniciar sesión',
          err.message || 'Por favor intenta de nuevo'
        );
      }
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
            type="text"
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
