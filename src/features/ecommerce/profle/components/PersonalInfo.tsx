import type { dataProfile } from "../type";
import { CiCircleCheck } from "react-icons/ci";
import { useLocation } from "../hooks/useLocation";

interface PersonalInfoProps {
    user: dataProfile;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {
    const {
        location,
        locationOptions,
        isLoading,
        onLocationChange
    } = useLocation({
        department: user.department ?? '',
        province: user.province ?? '',
        district: user.district ?? ''
    });


    // Handle location changes
    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onLocationChange('department', e.target.value);
        
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onLocationChange('province', e.target.value);
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onLocationChange('district', e.target.value);
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos personales</h2>
            
            {/* Sección de avatar */}
            <div className="flex justify-start mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-[var(--color-primary)] font-semibold text-lg">
                        {user.first_name?.[0]}{user.last_name?.[0]}
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
                            placeholder={user.first_name || ''}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
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
                            placeholder={user.last_name || ''}
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
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
                            className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
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
                            disabled
                            placeholder={user.email || ''}
                            className="w-full px-4 py-3 bg-blue-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
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
                            disabled
                            placeholder="****************"
                            className="w-full px-4 py-3 bg-blue-50 border border-gray-200 rounded-full transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                            Cambia tu Contraseña
                        </label>
                        <button className="w-full px-4 py-3 bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all">
                            Cambiar Contraseña
                        </button>
                    </div>
                </div>

                {/* Cuarta fila: País */}
                <div className="flex flex-col gap-2">
                    <label>Perú</label>
                </div>

                {/* Quinta fila tres columnas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="department" className="text-sm font-medium text-gray-700">
                            Departamento
                        </label>
                        <select
                            id="department"
                            value={location.department}
                            onChange={handleDepartmentChange}
                            className={`w-full px-4 py-3 border ${isLoading.departments ? 'border-gray-300 bg-gray-50' : 'border-gray-200'} rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all appearance-none`}
                            disabled={isLoading.departments}
                            aria-busy={isLoading.departments}
                        >
                            <option value="" disabled>Seleccionar departamento</option>
                            {locationOptions.departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="province" className="text-sm font-medium text-gray-700">
                            Provincia
                        </label>
                        <select
                            id="province"
                            value={location.province}
                            onChange={handleProvinceChange}
                            className={`w-full px-4 py-3 border ${isLoading.provinces ? 'border-gray-300 bg-gray-50' : 'border-gray-200'} rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all appearance-none ${!location.department || isLoading.provinces ? 'bg-gray-50 text-gray-400' : 'bg-white'}`}
                            disabled={!location.department || isLoading.provinces}
                            aria-busy={isLoading.provinces}
                        >
                            <option value="" disabled>Seleccionar provincia</option>
                            {locationOptions.provinces.map((prov) => (
                                <option key={prov} value={prov}>
                                    {prov}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="district" className="text-sm font-medium text-gray-700">
                            Distrito
                        </label>
                        <select
                            id="district"
                            value={location.district}
                            onChange={handleDistrictChange}
                            className={`w-full px-4 py-3 border ${isLoading.districts ? 'border-gray-300 bg-gray-50' : 'border-gray-200'} rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all appearance-none ${!location.province || isLoading.districts ? 'bg-gray-50 text-gray-400' : 'bg-white'}`}
                            disabled={!location.province || isLoading.districts}
                            aria-busy={isLoading.districts}
                        >
                            <option value="" disabled>Seleccionar distrito</option>
                            {locationOptions.districts.map((dist) => (
                                <option key={dist} value={dist}>
                                    {dist}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Sexta fila una columna */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="address" className="text-sm font-medium text-gray-700">
                        Dirección
                    </label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        placeholder={user.address_detail || ''}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                    />
                </div>
               
                {/* Séptima fila una columna */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="reference" className="text-sm font-medium text-gray-700">
                        Referencia
                    </label>
                    <input 
                        type="text" 
                        id="reference" 
                        name="reference" 
                        placeholder={user.address_reference || ''}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                    />
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