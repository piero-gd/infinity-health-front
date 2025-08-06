export interface ProductImage {
    image_url: string;
    is_featured: boolean;
}

export interface ColorOption {
    value: string;        // Valor del color (código HEX, RGB, o nombre de color válido)
    available?: boolean;   // Si el color está disponible
}

export interface SizeOption {
    value: string;
    label: string;
    stock: number;
    available: boolean;
    originalLabel?: string; // Para mantener la etiqueta original cuando se muestra tachada
}

export interface ProductSpecification {
    id: number;
    color?: string;
    size?: string;
    weight?: string;
    stock: number;
    is_available: boolean;
    // Nuevas propiedades para manejar opciones
    available_colors?: ColorOption[];
    available_sizes?: SizeOption[];
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
    category: Product["category"];
    icon: React.ReactNode;
    color: string;
}

// COMPONENTS PROPS
export interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: number) => void;
}

// Tipos para el carrito
export interface CartProduct {
    id: number;
    name: string;
    slug: string;
    price: string;
    price_amb: string;
    images: ProductImage[];
    category_info: CategoryInfo;
    quantity: number;
    specifications?: ProductSpecification[];
}
