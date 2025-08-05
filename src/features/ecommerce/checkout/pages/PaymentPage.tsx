import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressCart from "../../cart/components/ProgressCart";
import { OrderSummary } from "../components/OrderSummary";
import { useCartStore } from "../../cart/stores/useCartStore";
import { useCheckoutStore } from "../stores/useCheckoutStore";
import SecurityFeatures from "../components/SecurityFeatures";
import PaymentMethods from "../components/PaymentMethods";
import PersonalDetails from "../components/PersonalDetails";

export default function PaymentPage() {
    const navigate = useNavigate();
    const { items } = useCartStore();
    const { currentStep } = useCheckoutStore();
    
    // Redirigir si no hay productos en el carrito o si no vino del paso anterior
    useEffect(() => {
        if (items.length === 0) {
            navigate('/cart');
        } else if (currentStep < 3) {
            navigate('/checkout/shipping');
        }
    }, [items, currentStep, navigate]);

    return (
        <div className="mx-auto max-w-7xl">
            <div className="pt-12">
                <ProgressCart currentStep={3} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 px-6 xl:px-0">
                {/* Sección izquierda - 2/3 del ancho en desktop */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-6">
                        <h2 className="text-2xl font-semibold mb-4">Información de pago</h2>
                        <PaymentMethods />
                        
                        <div className="mt-6">
                            <SecurityFeatures />
                        </div>
                    </div>
                </div>
                
                {/* Sección derecha - 1/3 del ancho en desktop */}
                <div className="lg:col-span-1 w-full space-y-6">
                    {/* Información del cliente y entrega */}
                    <div className="bg-white rounded-3xl p-6">
                        <PersonalDetails />
                    </div>
                    
                    <div className="bg-gray-50 rounded-3xl w-full">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    );
}