import { useNavigate, useParams } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";
import { useState } from "react";
import { useNewPass } from "../hooks/useNewPass";

interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  token: string;
}

export default function NewPassword() {
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();
    const [formData, setFormData] = useState<Omit<ResetPasswordData, 'token'>>({ 
        password: '', 
        confirmPassword: '' 
    });
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
    const { resetPassword, isLoading } = useNewPass();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = () => {
        const newErrors: { password?: string; confirmPassword?: string } = {};
        
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm() || !token) return;
        
        try {
            await resetPassword({
                password: formData.password,
                token: token
            });
            // Navigation is handled by the useNewPass hook on success
        } catch (error) {
            // Error is already handled by the useNewPass hook
            console.error('Password reset error:', error);
        }
    };
    
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            
            {/* Boton flecha Desktop y Mobile*/}
            <div 
                    className="md:flex absolute left-8 top-8 items-left gap-2 mb-4 text-[var(--color-primary)]
                    cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate(-1)}
                >
                    <RxChevronLeft size={24} />
                </div>
            <div className="bg-white p-8 w-full max-w-md relative">
                
                {/* Logo centrado */}
                <div className="flex justify-center mb-8 mt-4">
                    <img
                        src="/img/health-logo-light-mode.png"
                        alt="Infinity Health"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Texto explicativo */}
                <h2 className="text-xl font-bold mb-8 text-center text-text leading-relaxed">
                    Crear una nueva contraseña
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Campo de contraseña */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Nueva Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-full border ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-base placeholder-gray-400`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    {/* Campo de confirmar contraseña */}
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-full border ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-base placeholder-gray-400`}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Botón enviar */}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full text-white bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:opacity-90 transition-opacity px-6 py-3 rounded-full font-medium shadow-md mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                    </button>
                </form>

                {/* ¿Tienes cuenta? */} 
                <p className="text-sm text-center text-text-muted">
                    ¿Tienes cuenta?{' '}
                    <a href="/login" className="font-semibold text-[var(--color-primary)] hover:underline">
                        Iniciar sesión
                    </a>
                </p>
            </div>
        </div>
    );
}