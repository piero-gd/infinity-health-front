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
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 xl:px-0 px-6">
                <div className="lg:col-span-2">
                      <div className="bg-white rounded-3xl text-center mb-6">
                      <PaymentInfo />
                      </div>
                      <div className="bg-white rounded-3xl text-center">
                      <Delivery />
                      </div>
                </div>
                <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl text-center">
            <ProductsCheckout />
                </div>

                </div>
           </div>


            
        </div>
 )
 }           