/**
 * Product-related types and interfaces
 * Consolidated from product.model.ts and productDetail/types
 */

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
    category: Product["category"];
    icon: React.ReactNode;
    color: string;
}

// API-related types
export interface FetchProductsParams {
    category?: string | null;
    minPrice?: number;
    maxPrice?: number;
    searchQuery?: string;
    sort?: string;
    page?: number;
    limit?: number;
    product?: string;
    merchandising?: string;
    objective?: string;
    format?: string;
}

export interface ProductsResponse {
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Component Props types
export interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: number) => void;
}

export interface PhotoSliderProps {
    images: ProductImage[];
    videos: string[];
    videoThumbnails?: string[];
    currentIndex?: number;
    onIndexChange?: (index: number) => void;
}

export interface RelatedProductsProps {
    currentProductId: number;
    category: number;
    categoryName?: string;
    products?: Product[];
}

export interface InfoDetailProps {
    product: Product;
    onAddToCart?: (product: Product, quantity: number) => void;
}

// Delivery types
export interface DeliveryOption {
    id: number;
    zona: string;
    tiempo: string;
    costoAprox: number;
}
