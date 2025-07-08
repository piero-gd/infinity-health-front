import { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for the field being edited
    if (error[name]) {
      setError(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    }
    
    if (!formData.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Aquí iría la lógica de registro real
      // Por ahora simulamos una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Redirigir al usuario después del registro exitoso
      // navigate('/login');
    } catch (err) {
      setError({
        general: 'Ocurrió un error al registrar la cuenta. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
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
          <label htmlFor="username" className="block text-sm font-semibold text-text-soft mb-1">
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
              error.username ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={loading}
            autoFocus
          />
          {error.username && (
            <span className="text-xs text-red-500 mt-1 block">{error.username}</span>
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
              error.email ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={loading}
          />
          {error.email && (
            <span className="text-xs text-red-500 mt-1 block">{error.email}</span>
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
              error.password ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={loading}
          />
          {error.password && (
            <span className="text-xs text-red-500 mt-1 block">{error.password}</span>
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
              error.confirmPassword ? 'border-red-400' : 'border-gray-200'
            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base`}
            disabled={loading}
          />
          {error.confirmPassword && (
            <span className="text-xs text-red-500 mt-1 block">{error.confirmPassword}</span>
          )}
        </div>
        
        {/* Error general */}
        {error.general && (
          <div className="text-red-500 text-sm text-center py-2">
            {error.general}
          </div>
        )}

<label className="text-sm font-semibold text-text-soft mb-1">
        Al registrarme, entiendo los <a href="#" className="text-[var(--color-primary)] ">Términos y condiciones</a> y la <a href="#" className="text-[var(--color-primary)]">Política de privacidad</a>
        </label>

        
        {/* Botón de registro */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 px-4 rounded-3xl text-white font-medium mt-1 bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:bg-gradient-to-t hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] transition-colors shadow-lg`}
        >
          Crear cuenta
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
