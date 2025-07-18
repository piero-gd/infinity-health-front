import { useState, useEffect, useCallback } from "react";
import type { LocationOption } from "../services/apiDepartment";
import { getDepartments, getProvinces, getDistricts } from "../services/apiDepartment";

interface LocationData {
    department: string;
    province: string;
    district: string;
}

export const useLocation = (initialLocation?: Partial<LocationData>) => {
    const [selectedLocation, setSelectedLocation] = useState<LocationData>({
        department: initialLocation?.department || '',
        province: initialLocation?.province || '',
        district: initialLocation?.district || '',
    });
    
    // Crear una referencia estable al setter para evitar problemas de dependencia
    const setSelectedLocationStable = useCallback((updater: (prev: LocationData) => LocationData) => {
        setSelectedLocation(prev => {
            const newState = updater(prev);
            return { ...prev, ...newState };
        });
    }, []);
    
    const [departments, setDepartments] = useState<LocationOption[]>([]);
    const [provinces, setProvinces] = useState<LocationOption[]>([]);
    const [districts, setDistricts] = useState<LocationOption[]>([]);
    // Estados de carga para mejor UX
    const [isLoading, setIsLoading] = useState({
        departments: false,
        provinces: false,
        districts: false,
    });

    // Cargar departamentos al montar
    useEffect(() => {
        const loadDepartments = async () => {
            setIsLoading(prev => ({ ...prev, departments: true }));
            try {
                const depts = await getDepartments();
                setDepartments(depts);
            } catch (error) {
                console.error('Failed to load departments:', error);
            } finally {
                setIsLoading(prev => ({ ...prev, departments: false }));
            }
        };
        
        loadDepartments();
    }, []);

    // Cargar provincias cuando cambia el departamento
    useEffect(() => {
        const loadProvinces = async () => {
            if (!selectedLocation.department) {
                setProvinces([]);
                return;
            }
            
            setIsLoading(prev => ({ ...prev, provinces: true }));
            try {
                const provs = await getProvinces(selectedLocation.department);
                setProvinces(provs);
                
                // Reset province and district if they don't exist in the new department
                if (!provs.some(p => p.name === selectedLocation.province)) {
                    setSelectedLocation(prev => ({ ...prev, province: '', district: '' }));
                    setDistricts([]);
                }
            } catch (error) {
                console.error('Failed to load provinces:', error);
                setProvinces([]);
            } finally {
                setIsLoading(prev => ({ ...prev, provinces: false }));
            }
        };
        
        loadProvinces();
    }, [selectedLocation.department]);

    // Cargar distritos cuando cambia la provincia
    useEffect(() => {
        const loadDistricts = async () => {
            if (!selectedLocation.province) {
                setDistricts([]);
                return;
            }
            
            setIsLoading(prev => ({ ...prev, districts: true }));
            try {
                const dists = await getDistricts(selectedLocation.province);
                setDistricts(dists);
                
                // Reset district if it doesn't exist in the new province
                if (!dists.some(d => d.name === selectedLocation.district)) {
                    setSelectedLocation(prev => ({ ...prev, district: '' }));
                }
            } catch (error) {
                console.error('Failed to load districts:', error);
                setDistricts([]);
            } finally {
                setIsLoading(prev => ({ ...prev, districts: false }));
            }
        };
        
        loadDistricts();
    }, [selectedLocation.province]);

    // Actualizar la ubicación y restablecer los campos dependientes cuando un campo padre cambia
    const handleLocationChange = useCallback((type: keyof LocationData, value: string) => {
        setSelectedLocationStable(prev => {
            const newLocation = { ...prev, [type]: value };
            
            // Restablecer campos dependientes cuando un campo padre cambia
            if (type === 'department' && value !== prev.department) {
                newLocation.province = '';
                newLocation.district = '';
                setProvinces([]);
                setDistricts([]);
            } else if (type === 'province' && value !== prev.province) {
                newLocation.district = '';
                setDistricts([]);
            }
            
            return newLocation;
        });
    }, [setSelectedLocationStable]);

    // Lista de provincias para el departamento seleccionado
    const getProvincesList = useCallback(() => {
        if (!selectedLocation.department) return [];
        return provinces.map(p => p.name);
    }, [selectedLocation.department, provinces]);

    // Lista de distritos para la provincia seleccionada
    const getDistrictsList = useCallback(() => {
        if (!selectedLocation.province) return [];
        return districts.map(d => d.name);
    }, [selectedLocation.province, districts]);

    return {
        location: selectedLocation,
        locationOptions: {
            departments: departments.map(d => d.name),
            provinces: getProvincesList(),
            districts: getDistrictsList(),
        },
        isLoading,
        onLocationChange: handleLocationChange,
    };
};