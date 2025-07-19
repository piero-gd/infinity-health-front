import { useNavigate, useParams } from "react-router-dom";
import { RxChevronLeft } from "react-icons/rx";
import { useState, useEffect } from "react";
import { useNewPass } from "../hooks/useNewPass";
import { showToast } from "../../../utils/toastConfig";

interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export default function NewPassword() {
    const navigate = useNavigate();
    const { uid, token } = useParams<{ uid: string; token: string }>();
    const [formData, setFormData] = useState<ResetPasswordData>({ 
        password: '', 
        confirmPassword: '' 
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { resetPassword, isLoading } = useNewPass();

    // Verificar si el uid y token están presentes
    useEffect(() => {
        if (!uid || !token) {
            showToast.error('Error', 'El enlace de restablecimiento no es válido');
            navigate('/forgot-password');
        }
    }, [uid, token, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm() || !token) return;
        
        try {
            setIsSubmitting(true);
            if (!uid || !token) return;
            
            await resetPassword({
                password: formData.password,
                uid,
                token
            });
            // La navegación se maneja en el hook useNewPass
        } catch (error) {
            // El error ya se maneja en el hook useNewPass
            console.error('Error al restablecer la contraseña:', error);
        } finally {
            setIsSubmitting(false);
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
                        <label className="block text-text-soft text-sm font-medium mb-2" htmlFor="password">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-3xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base"
                            placeholder="••••••••"
                            disabled={isLoading || isSubmitting}
                            autoComplete="new-password"
                        />
                        <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
                    </div>

                    {/* Campo de confirmar contraseña */}
                    <div className="mb-6">
                        <label className="block text-text-soft text-sm font-medium mb-2" htmlFor="confirmPassword">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-3xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-base"
                            placeholder="••••••••"
                            disabled={isLoading || isSubmitting}
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Botón enviar */}
                    <button 
                        type="submit"
                        className="w-full bg-[var(--color-primary)] text-white py-3 px-4 rounded-3xl font-medium hover:bg-opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={isLoading || isSubmitting}
                    >
                        {isLoading || isSubmitting ? 'Actualizando...' : 'Restablecer Contraseña'}
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