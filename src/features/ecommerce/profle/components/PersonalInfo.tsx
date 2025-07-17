import type { dataProfile } from "../type";
import { CiCircleCheck } from "react-icons/ci";

interface PersonalInfoProps {
    user: dataProfile;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos personales</h2>
            
            {/* Avatar Section */}
            <div className="flex justify-start mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-[var(--color-primary)] font-semibold text-lg">
                        {user.name?.[0]}{user.lastName?.[0]}
                    </span>
                </div>
            </div>

            <div className="space-y-6">
                {/* Primera fila: Nombre y Apellidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            defaultValue={user.name || ''}
                            placeholder={user.name || ''}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Apellidos
                        </label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            placeholder={user.lastName || ''}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Segunda fila: Teléfono y Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Teléfono / WhatsApp
                        </label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            placeholder={user.phone || ''}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            defaultValue={user.email || ''}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Tercera fila: Contraseñas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            defaultValue="****************"
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                            Confirmar nueva Contraseña
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            defaultValue="****************"
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Botón de Guardar */}
                <div className="flex justify-start pt-4">
                    <button 
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:bg-gradient-to-t hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)]
                        text-white font-medium rounded-full transition-all flex items-center gap-2"
                    >
                        Guardar Cambios
                        <CiCircleCheck size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}