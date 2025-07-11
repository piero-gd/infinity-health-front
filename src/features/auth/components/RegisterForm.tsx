import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, isLoading, error: apiError, fieldErrors } = useRegister();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores del campo que se está editando
    if (formErrors[name] || fieldErrors[name as keyof typeof fieldErrors]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    // Validar nombre de usuario
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Solo se permiten letras, números y guiones bajos';
      isValid = false;
    }
    
    // Validar correo electrónico
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
      isValid = false;
    }
    
    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Debe contener al menos una mayúscula, una minúscula y un número';
      isValid = false;
    }
    
    // Validar confirmación de contraseña
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }
    
    setFormErrors(newErrors);
    return isValid;
  };
  
  // Combinar errores del formulario con los de la API
  const getFieldError = (field: string) => {
    // Priorizar errores del formulario sobre los de la API
    if (formErrors[field]) {
      return formErrors[field];
    }
    
    // Manejar errores de la API
    const apiError = fieldErrors[field as keyof typeof fieldErrors];
    if (apiError) {
      // Si el error es un array, tomar el primer mensaje
      return Array.isArray(apiError) ? apiError[0] : apiError;
    }
    
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Redirigir a la página de confirmación de correo después del registro exitoso
      navigate('/mail-confirmation', { 
        state: { from: '/register' },
        replace: true
      });
      
    } catch (error) {
      // Los errores ya son manejados por el hook useRegister
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
            className={`w-full px-4 py-2.5 rounded-3xl border ${
              getFieldError('username') ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={isLoading}
            autoFocus
          />
          {getFieldError('username') && (
            <span className="text-xs text-red-500 mt-1 block">{getFieldError('username')}</span>
          )}
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
            className={`w-full px-4 py-2.5 rounded-3xl border ${
              getFieldError('email') ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={isLoading}
          />
          {getFieldError('email') && (
            <span className="text-xs text-red-500 mt-1 block">{getFieldError('email')}</span>
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
            className={`w-full px-4 py-2.5 rounded-3xl border ${
              getFieldError('password') ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={isLoading}
          />
          {getFieldError('password') && (
            <span className="text-xs text-red-500 mt-1 block">{getFieldError('password')}</span>
          )}
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
            className={`w-full px-4 py-2.5 rounded-3xl border ${
              getFieldError('confirmPassword') ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={isLoading}
          />
          {getFieldError('confirmPassword') && (
            <span className="text-xs text-red-500 mt-1 block">{getFieldError('confirmPassword')}</span>
          )}
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
