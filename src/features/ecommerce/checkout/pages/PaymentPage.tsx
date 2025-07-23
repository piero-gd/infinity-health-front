import ProgressCart from "../../cart/components/ProgressCart";
import PaymentDetails from "../components/PaymentDetails";
import PaymentMethods from "../components/PaymentMethods";
export default function PaymentPage() {
    return (
       
        <div className="mx-auto max-w-7xl">
            
            <div className="pt-12">
                <ProgressCart currentStep={3} />
            </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 xl:px-0 px-6">
                <div className="lg:col-span-2">
                      <div className="bg-white rounded-3xl text-center mb-6">
                      <PaymentMethods/>
                      </div>
                </div>
                <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl text-center">
            <PaymentDetails />
                </div>

                </div>
           </div>


            
        </div>
    );
}