export interface Product {
    id: number;
    nombre: string;
    slug: string;
    precioEmbajador: number;
    precioNormal: number; 
    categoria: string;
    slogan: string;
    descripcion: string;
    imagenes: string[];
    videos: string[];
    videoThumbnails?: string[]; 
    stock: number;
    resena: string;
    calificacion: number;
    disponible: boolean;
    objetivo: string;
    formato: string;
    peso: string;
}

export interface Category {
    id: string;
    categoria: Product["categoria"] ;
    icon: React.ReactNode;
    color: string;
}

//MERCHANDISING
export interface Merchandising {
    id: number;
    category: string;
    subCategory: string;
    name: string;
    slug: string;
    description: string;
    price: string;
    slogan: string;
    discount: string;
    rating: string;
    short_description: string;
    images: string[];
    details: {
        id: number;
        product_merch: number;
        color: string;
        size: string;
        stock: number;
    }[];
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
