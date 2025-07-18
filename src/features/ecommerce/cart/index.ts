// Exportaciones principales para el feature de carrito
export * from './hooks/useCart';
export * from './components/MiniCart';

// Para uso interno del feature
export { useCartStore } from './stores/useCartStore';
export { cartService } from './services/cartService';
