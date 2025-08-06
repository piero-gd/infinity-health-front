/**
 * Cart-related types and interfaces
 * Consolidated from cart/types/
 */

import type { ProductImage, CategoryInfo, ProductSpecification } from './product.types';

// Cart Product (product adapted for cart usage)
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

// UI-specific cart item (legacy, consider deprecating)
export interface CartItem {
    id: string;
    name: string;
    category: string;
    images: string[];
    price: number;
    price_amb: number;
    cantidad: number;
}

// Alternative cart item structure (from productDetail)
export interface CartItemDetail {
    id: number;
    productoId: number;
    cantidad: number;
    favorito: boolean;
    sabor?: string;
}

// Progress/Steps types
export interface Step {
    id: number;
    title: string;
    icon: React.ReactNode;
}

// Cart Hook types
export interface UseCartReturn {
    items: CartProduct[];
    addItem: (product: CartProduct) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    itemCount: number;
}

// Cart Props types
export interface CartItemProps {
    item: CartProduct;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
}

export interface MiniCartProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ProgressCartProps {
    currentStep: number;
}
