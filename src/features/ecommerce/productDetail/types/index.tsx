// Tipos base
export interface Product {
    id: number;
    nombre: string;
    precio: number;
    precioAnterior?: number;  // Hacerlo opcional con ?
    categoria: string;
    slogan: string;
    descripcion: string;
    imagenes: string[];
    videos: string[];
    videoThumbnails?: string[];  // Nuevo campo para miniaturas de video
    stock: number;
    resena: string;
    calificacion: number;
    disponible: boolean;
    peso: string;  // Unificado a solo string ya que todos los pesos usan '100g'
}

export interface Category {
    id: string;
    categoria: Product["categoria"] ;
    icon: React.ReactNode;
    color: string;
}

export interface DeliveryOption {
    id: number;
    zona: string;
    tiempo: string;
    costoAprox: number; 
}

export interface CartItem {
    id: number;
    productoId: number;
    cantidad: number;
    favorito: boolean;
    sabor?: string;  
}

// Tipos para props de componentes
export interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: number) => void;
}

export interface PhotoSliderProps {
    images: string[];
    videos: string[];
    videoThumbnails?: string[];
    currentIndex?: number;
    onIndexChange?: (index: number) => void;
}

export interface RelatedProductsProps {
    currentProductId: number;
    category: string;
    products?: Product[]; 
}

export interface InfoDetailProps {
    product: Product;
    onAddToCart?: (product: Product, quantity: number) => void;
}
