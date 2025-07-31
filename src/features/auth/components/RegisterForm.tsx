import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import { showToast } from '../../../utils/toastConfig';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function RegisterForm() {
  const { register } = useRegister();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      showToast.error('Error', 'El correo electrónico es requerido');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showToast.error('Error', 'Ingresa un correo electrónico válido');
      return false;
    }
    
    if (!formData.username.trim()) {
      showToast.error('Error', 'El nombre de usuario es requerido');
      return false;
    }
    
    if (formData.username.length < 3) {
      showToast.error('Error', 'El nombre de usuario debe tener al menos 3 caracteres');
      return false;
    }
    
    if (!formData.password) {
      showToast.error('Error', 'La contraseña es requerida');
      return false;
    }
    
    if (formData.password.length < 8) {
      showToast.error('Error', 'La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      showToast.error('Error', 'Las contraseñas no coinciden');
      return false;
    }
    
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    const loadingId = showToast.loading('Procesando registro', 'Por favor espera...');
    
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      showToast.dismiss(loadingId);
      showToast.success('¡Registro exitoso!', 'Por favor verifica tu correo electrónico');
      
      // Redirigir a la página de confirmación de correo
      navigate('/mail-confirmation', { 
        state: { 
          from: '/register',
          email: formData.email,
          username: formData.username
        },
        replace: true
      });
    } catch (error) {
      console.error('Registration error:', error);
      showToast.dismiss(loadingId);
      
      if (error instanceof Error) {
        let errorMessage = error.message;
        
        if (errorMessage.includes('email already exists')) {
          errorMessage = 'Ya existe una cuenta con este correo electrónico';
        } else if (errorMessage.includes('username already exists')) {
          errorMessage = 'El nombre de usuario ya está en uso';
        } else if (errorMessage.includes('password')) {
          errorMessage = 'La contraseña no cumple con los requisitos';
        } else if (errorMessage.includes('network')) {
          errorMessage = 'Error de conexión. Por favor verifica tu conexión a internet';
        }
        
        showToast.error('Error al registrar', errorMessage);
      } else {
        showToast.error('Error inesperado', 'Ocurrió un error al intentar registrar la cuenta');
      }
    } finally {
      setIsLoading(false);
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
        <p className="font-medium text-text-muted text-sm mb-4">
          Por favor ingresa tu cuenta
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
            placeholder="Tu nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-3xl border border-gray-200 bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={isLoading}
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
            className={`w-full px-4 py-3 rounded-3xl border border-gray-200 bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={isLoading}
          />
        </div>
        
        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-text-soft mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 rounded-3xl border border-gray-200 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
        </div>
        
        {/* Confirmar Contraseña */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-text-soft mb-1">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 rounded-3xl border border-gray-200 bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        <label className="text-sm font-semibold text-text-soft mb-1">
          Al registrarme, entiendo los <a href="#" className="text-[var(--color-primary)] ">Términos y condiciones</a> y la <a href="#" className="text-[var(--color-primary)]">Política de privacidad</a>
        </label>

        
        {/* Botón de registro */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2.5 px-4 rounded-3xl text-white font-medium mt-1
            bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)]
            hover:bg-gradient-to-t hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)]
            transition-colors shadow-lg ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
