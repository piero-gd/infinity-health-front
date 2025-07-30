import Header from "../components/header";
import Summary from "../components/Summary";
import InfoDetail from "../components/InfoDetail";
import Advice from "../components/Advice";

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-[1000px] mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <Header />
                </div>
                
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Summary */}
                    <div className="w-full">
                        <Summary />
                    </div>
                    
                    {/* Right Side - Info Detail */}
                    <div className="w-full">
                        <InfoDetail />
                    </div>
                </div>
                
                {/* Bottom Advice */}
                <div className="mt-4">
                    <Advice />
                </div>
            </div>
        </div>
    );
}