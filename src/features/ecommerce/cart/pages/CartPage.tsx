import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import ProgressCart from '../components/ProgressCart';
import ListCart from '../components/ListCart';
import TotalCart from '../components/TotalCart';
import type { CartItem } from '../types';
import { mockProduct } from '../../productDetail/data/mockProduct';
import { RelatedProducts } from '../../productDetail/components/RelatedProducts';

export default function CartPage() {
   //PRIMERO TOMA LOS PRIMEROS 3 PRODUCTOS Y LOS Mapea al formato CartItem
    const initialCartItems: CartItem[] = mockProduct.slice(0, 3).map(product => ({
        id: product.id.toString(),
        nombre: product.nombre,
        categoria: product.categoria,
        imagenes: [product.imagenes[0]], //TOMA LA PRIMERA IMAGEN
        precio: product.precio,
        precioAnterior: product.precioAnterior, // INCLUYE EL PRECIO ORIGINAL SI EXISTE
        cantidad: 1 // CANTIDAD DEFAULT
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

    //CALCULA LOS TOTALES DEL CARRITO
    const subtotal = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const shipping = 5.99; //ENVIO FLAT RATE
    const discount = 0; // DESCUENTO DEFAULT

    return (
        <div className="mx-auto max-w-7xl">
            
            <div className="pt-12">
                <ProgressCart currentStep={1} />
            </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 xl:px-0 px-6">
                <div className="lg:col-span-2">
                    <ListCart 
                      items={cartItems}
                      onUpdateQuantity={handleUpdateQuantity} 
                      onRemoveItem={handleRemoveItem}
                    />
                </div>
                <div className="lg:col-span-1">
                    <TotalCart 
                      subtotalNormalPrice={subtotal}
                      subtotalEmbajadorPrice={subtotal}
                      shipping={shipping}
                      discount={discount}
                      onApplyPromoCode={(code) => alert(`Código aplicado: ${code}`)}
                      onProceedToCheckout={() => alert('Procediendo al pago...')}
                    />
                </div>
           </div>


            <div className="mt-8 mb-8 flex items-center justify-center xl:justify-start">
                
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
            
        </div>
    );
}