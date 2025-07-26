import ProgressCart from "../../cart/components/ProgressCart";
import PaymentMethods from "../components/PaymentMethods";
import PersonalDetails from "../components/PersonalDetails";
import SecurityFeatures from "../components/SecurityFeatures";

export default function PaymentPage() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="pt-12">
                <ProgressCart currentStep={3} />
            </div>
            
            {/* Mobile View */}
            <div className="lg:hidden space-y-4 px-6 mt-8">
                {/* 1. Personal Details */}
                <PersonalDetails />
                
                {/* 2. Payment Methods */}
                <div className="bg-white rounded-2xl p-4">
                    <PaymentMethods />
                </div>
                
                {/* 3. Security Features */}
                <SecurityFeatures />
            </div>
            
            {/* Desktop View */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 xl:px-0 px-6">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl ">
                        <PaymentMethods />
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <PersonalDetails />
                    <SecurityFeatures />
                </div>
            </div>
        </div>
    );
}