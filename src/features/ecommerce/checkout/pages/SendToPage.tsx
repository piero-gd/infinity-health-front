import Delivery from "../components/Delivery";
import ProductsCheckout from "../components/ProductsCheckout";
import PaymentInfo from "../components/PaymentInfo";
import ProgressCart from "../../cart/components/ProgressCart";

export default function SendToPage() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="pt-12">
                <ProgressCart currentStep={2} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 px-6 xl:px-0">
                {/* Sección izquierda - 2/3 del ancho en desktop */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl">
                        <PaymentInfo />
                    </div>
                    <div className="bg-white rounded-3xl">
                        <Delivery />
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