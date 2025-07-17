export interface dataProfile{
    name:string,
    lastName:string,
    email:string,
    phone:string,
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
