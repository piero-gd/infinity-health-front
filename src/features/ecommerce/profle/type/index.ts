export interface dataProfile {
    first_name: string;
    last_name: string;
    email:string;
    birth_date: string;
    phone: string;
    district?: string;
    department?: string;
    province?: string;
    address_detail: string;
    address_reference: string;
}
export interface PersonalInfoPayload {
    first_name: string;
    last_name: string;
    phone: string;
    department: string;
    province: string;
    district: string;
    address_detail: string;
    address_reference: string;
}


export interface CartProduct {
    id: string;
    product: {
        name: string;
        image: string;
    };
    status: string;
    total: string;
    date: string;
    icon?: React.ReactNode;
}

export interface UseCartReturn {
    products: CartProduct[];
    isLoading: boolean;
    error: Error | null;
    isEmpty: boolean;
}
