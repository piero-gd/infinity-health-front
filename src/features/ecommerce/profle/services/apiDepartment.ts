const API_BASE_URL = 'https://api.infinityhealth.fit/api';

export interface LocationOption {
  id: number;
  name: string;
}

const fetchWithErrorHandling = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getDepartments = async (): Promise<LocationOption[]> => {
  try {
    const data = await fetchWithErrorHandling(`${API_BASE_URL}/location/departments/`);
    return data.map((dept: any) => ({
      id: dept.id || 0,
      name: dept.name || dept
    }));
  } catch (error) {
    console.error('Error fetching departments:', error);
    return [];
  }
};

export const getProvinces = async (departmentName: string): Promise<LocationOption[]> => {
  try {
    const data = await fetchWithErrorHandling(
      `${API_BASE_URL}/location/departments/${encodeURIComponent(departmentName)}/provinces/`
    );
    return data.map((province: any) => ({
      id: province.id || 0,
      name: province.name || province
    }));
  } catch (error) {
    console.error(`Error fetching provinces for ${departmentName}:`, error);
    return [];
  }
};

export const getDistricts = async (provinceName: string): Promise<LocationOption[]> => {
  try {
    const data = await fetchWithErrorHandling(
      `${API_BASE_URL}/location/provinces/${encodeURIComponent(provinceName)}/districts/`
    );
    return data.map((district: any) => ({
      id: district.id || 0,
      name: district.name || district
    }));
  } catch (error) {
    console.error(`Error fetching districts for ${provinceName}:`, error);
    return [];
  }
};