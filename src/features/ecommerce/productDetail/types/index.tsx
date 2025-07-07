export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    slogan: string;
    price: number;
    price_amb: number;
    rating: number;
    product_type: string;

    created: string;
    updated: string;
    images: string[];

    specifications: string[];
    featured_image: string;
    category: string;
    
    stock: number;
    videos: string[];
    videoThumbnails?: string[]; 

}

export interface Category {
    id: string;
    category: Product["category"] ;
    icon: React.ReactNode;
    color: string;
}

//ENVIO  
export interface DeliveryOption {
    id: number;
    zona: string;
    tiempo: string;
    costoAprox: number; 
}

//CATALOG
export interface CartItem {
    id: number;
    productoId: number;
    cantidad: number;
    favorito: boolean;
    sabor?: string;  
}

// COMPONENTS PROPS

//PRODUCT CARD GLOBAL
export interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: number) => void;
}

//PRODUCT DETAIL / PHOTO SLIDER
export interface PhotoSliderProps {
    images: string[];
    videos: string[];
    videoThumbnails?: string[];
    currentIndex?: number;
    onIndexChange?: (index: number) => void;
}

//PRODUCT DETAIL / RELATED PRODUCTS
export interface RelatedProductsProps {
    currentProductId: number;
    category: string;
    products?: Product[]; 
}

//PRODUCT DETAIL / INFO DETAIL
export interface InfoDetailProps {
    product: Product;
    onAddToCart?: (product: Product, quantity: number) => void;
}
