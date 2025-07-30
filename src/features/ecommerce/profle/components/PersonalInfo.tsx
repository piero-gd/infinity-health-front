
import { useState } from "react";
import type { dataProfile } from "../type";
import { CiCircleCheck } from "react-icons/ci";
import { useLocation } from "../hooks/useLocation";
import { updatePersonalInfo } from "../services/apiPersonalInfo";
import type { PersonalInfoPayload } from "../type";

interface PersonalInfoProps {
    user: dataProfile;
}

export default function PersonalInfo({ user }: PersonalInfoProps) {

    const [form, setForm] = useState<PersonalInfoPayload>({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        phone: user.phone ?? "",
        department: user.department ?? "",
        province: user.province ?? "",
        district: user.district ?? "",
        address_detail: user.address_detail ?? "",
        address_reference: user.address_reference ?? ""
    });

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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

     // Enviar al API
     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updatePersonalInfo(form);
            alert("¡Datos guardados!");
        } catch {
            alert("Error al guardar");
        }
    };



    // Handle location changes
    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setForm({ ...form, department: value, province: "", district: "" });
        onLocationChange('department', value);
    };
    
    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setForm({ ...form, province: value, district: "" });
        onLocationChange('province', value);
    };
    
    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setForm({ ...form, district: value });
        onLocationChange('district', value);
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

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Primera fila: Nombre y Apellidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="first_name" 
                            value={form.first_name}
                            onChange={handleChange}
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
                            name="last_name" 
                            value={form.last_name}
                            onChange={handleChange}
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
                            value={form.phone}
                            onChange={handleChange}
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
                            value={user.email}
                            onChange={handleChange}
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
                            value={form.department}

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
                            value={form.province}
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
                            value={form.district}
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
                        value={form.address_detail}
                        onChange={handleChange}
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
                        value={form.address_reference}
                        onChange={handleChange}
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
            </form>
        </div>
    )
}