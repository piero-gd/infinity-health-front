/**
 * Cart-specific types
 * Used primarily within the cart feature
 */
import type { ProductImage, CategoryInfo, ProductSpecification } from '../../shared/types';

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

export interface CartItem {
    id: string; 
    name: string;
    category: string;
    images: string[];
    price: number;
    price_amb: number;
    cantidad: number;
}

export interface CartItemDetail {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
    specifications?: string[];
    subtotal: number;
}

// Step for checkout process
export interface Step {
    id: number;
    title: string;
    icon: React.ReactNode;
}

// Cart state interface
export interface CartState {
    items: CartProduct[];
    addItem: (product: CartProduct) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    isOpen: boolean;
    toggleCart: () => void;
}

// Component props
export interface CartItemProps {
    item: CartProduct;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}
