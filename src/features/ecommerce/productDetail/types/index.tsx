export interface ProductImage {
    image_url: string;
    is_featured: boolean;
}

export interface ProductSpecification {
    id: number;
    color?: string;
    size?: string;
    weight?: string;
    stock: number;
    is_available: boolean;
}

export interface CategoryInfo {
    id: number;
    name: string;
    slug: string;
    category_type: string;
    category_type_display: string;
    subcategory: string;
    subcategory_display: string;
    description: string;
    image: string | null;
    is_active: boolean;
    created: string;
    updated: string;
    products_count: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    slogan: string;
    price: string;
    price_amb: string;
    rating: string;
    product_type: string;
    created: string;
    updated: string;
    images: ProductImage[];
    specifications: ProductSpecification[];
    featured_image: string;
    category: number;
    category_info: CategoryInfo;
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
