import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Delivery from "../components/Delivery";
import ProductsCheckout from "../components/ProductsCheckout";
import ProgressCart from "../../cart/components/ProgressCart";
import { useCartStore } from "../../cart/stores/useCartStore";
import { useCheckoutStore } from "../stores/useCheckoutStore";
import BillingDetails from "../components/BillingDetails";

export default function ShipmentPage() {
    const navigate = useNavigate();
    const { items } = useCartStore();
    const { currentStep } = useCheckoutStore();
    // El método proceedToPayment ahora se usa desde ProductsCheckout
    
    // Redirigir si no hay productos en el carrito o si no vino del paso anterior
    useEffect(() => {
        if (items.length === 0) {
            navigate('/cart');
        } else if (currentStep < 2) {
            navigate('/cart');
        }
    }, [items, currentStep, navigate]);

    return (
        <div className="mx-auto max-w-7xl">
            <div className="pt-12">
                <ProgressCart currentStep={2} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 px-6 xl:px-0">
                {/* Sección izquierda - 2/3 del ancho en desktop */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl">
                        <BillingDetails />
                    </div>
                    <div className="bg-white rounded-3xl">
                        <Delivery />
                        
                        {/* Botón eliminado para evitar duplicación con el de ProductsCheckout */}
                    </div>
                </div>
                
                {/* Sección derecha - 1/3 del ancho en desktop, full width en iPad */}
                <div className="lg:col-span-1 w-full">
                    <div className="bg-gray-50 rounded-3xl w-full h-full">
                        <ProductsCheckout />
                    </div>
                </div>
            </div>
        </div>
    );
}