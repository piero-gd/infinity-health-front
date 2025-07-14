import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import { showToast } from '../../../utils/toastConfig';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, isLoading, error: apiError } = useRegister();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
      // Limpiar errores cuando el usuario escribe
    if (error || apiError) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.username.trim()) {
      showToast.error('El nombre de usuario es requerido', 'Por favor completa el campo');
      return;
    }
    
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      showToast.error('Ingresa un email válido', 'Por favor verifica el formato');
      return;
    }
    
    if (!formData.password) {
      showToast.error('La contraseña es requerida', 'Por favor completa el campo');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      showToast.error('Las contraseñas no coinciden', 'Por favor verifica');
      return;
    }
    
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Mostrar mensaje de éxito
      showToast.success('¡Registro exitoso!', 'Por favor verifica tu correo electrónico');
      
      // Redirigir a la página de confirmación de correo
      navigate('/mail-confirmation', { 
        state: { from: '/register' },
        replace: true
      });
      
    } catch (error) {
      // Mostrar el error del servidor si existe
      if (apiError) {
        showToast.error('Error al registrar', apiError);
      } else if (error instanceof Error) {
        showToast.error('Error inesperado', error.message);
      } else {
        showToast.error('Error', 'Ocurrió un error inesperado');
      }
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="w-full ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full"
        autoComplete="off"
      >
        <h2 className="text-xl font-bold text-center md:text-left text-text">
          Crea tu cuenta
        </h2>
        <p className="font-semibold text-text-muted text-sm mb-4">
          Completa el formulario para registrarte
        </p>
        
        {/* Nombre de usuario */}
        <div>
          <label htmlFor="username"
          className="block text-sm font-semibold text-text-soft mb-1">
            Nombre de usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-3xl border ${
              error ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={isLoading}
            autoFocus
          />
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text-soft mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-3xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base"
            disabled={isLoading}
          />
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
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
        </div>
        
        {/* Confirmar Contraseña */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-text-soft mb-1">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-3xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base"
            disabled={isLoading}
          />
        </div>
        
        {/* Error general */}
        {apiError && (
          <div className="text-red-500 text-sm text-center py-2">
            {apiError}
          </div>
        )}

<label className="text-sm font-semibold text-text-soft mb-1">
        Al registrarme, entiendo los <a href="#" className="text-[var(--color-primary)] ">Términos y condiciones</a> y la <a href="#" className="text-[var(--color-primary)]">Política de privacidad</a>
        </label>

        
        {/* Botón de registro */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2.5 px-4 rounded-3xl text-white font-medium mt-1 bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:bg-gradient-to-t hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] transition-colors shadow-lg ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

       
       {/* Crear cuenta */}
       <div className="flex justify-between items-center text-sm mt-2">
          <span className="font-semibold text-text-muted">
            ¿Ya tienes una cuenta?
          </span>
          <a href="/login" className="font-bold text-[var(--color-primary)] hover:underline">
            Inicia sesión
          </a>
        </div>
      </form>
    </div>
  );
}
