import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ProgressCart from '../components/ProgressCart';
import ListCart from '../components/ListCart';
import TotalCart from '../components/TotalCart';
import type { CartItem } from '../types';
import { mockProduct } from '../../productDetail/data/mockProduct';
//import { ProductCardDashboard } from '../../productDetail/components/ProductCardDashboard';
import { RelatedProducts } from '../../productDetail/components/RelatedProducts';

export default function CartPage() {
    // Take first 3 products and map to CartItem format
    const initialCartItems: CartItem[] = mockProduct.slice(0, 3).map(product => ({
        id: product.id.toString(),
        nombre: product.nombre,
        categoria: product.categoria,
        imagenes: [product.imagenes[0]], // Take first image
        precio: product.precio,
        cantidad: 1 // Default quantity
    }));

    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const handleUpdateQuantity = (id: string, quantity: number) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, cantidad: quantity } : item
        ));
    };

    const handleRemoveItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Calculate cart totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const shipping = 5.99; // Flat rate shipping
    const discount = 0; // No discount by default

    return (
        <div className="mx-auto max-w-7xl">
            
            <div className="pt-12">
                <ProgressCart currentStep={1} />
            </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
                <div className="lg:col-span-2">
                    <ListCart 
                      items={cartItems}
                      onUpdateQuantity={handleUpdateQuantity} 
                      onRemoveItem={handleRemoveItem}
                    />
                </div>
                <div className="lg:col-span-1">
                    <TotalCart 
                      subtotal={subtotal}
                      shipping={shipping}
                      discount={discount}
                      onApplyPromoCode={(code) => alert(`Código aplicado: ${code}`)}
                      onProceedToCheckout={() => alert('Procediendo al pago...')}
                    />
                </div>
           </div>


            <div className="mt-8 mb-8">
                
                <button className="border-2 border-[var(--color-primary)] bg-white text-[var(--color-primary)] font-medium py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                    <FaArrowLeft className="w-6 h-6 mr-2"/>
                    Continuar comprando</button>
                
            </div>

            <div>
                <RelatedProducts 
                  currentProductId={Number(cartItems[0].id)} 
                  category={cartItems[0].categoria} 
                />
            </div>
{/* 
            <div className="mt-8 mb-8 grid grid-cols-1 lg:grid-cols-4 gap-4">
                <ProductCardDashboard 
                  product={mockProduct[0]}
                  onAddToCart={() => alert('Añadir al carrito')}
                  onToggleFavorite={() => alert('Toggle favorito')}
                />
            </div> */}
            
        </div>
    );
}