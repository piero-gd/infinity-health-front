import { Shield, Headphones, CreditCard } from "lucide-react";

export default function SecurityFeatures() {
    return (
        <div className="bg-gray-50 rounded-2xl p-5 w-full">
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <div className="w-13 h-13 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-gray-700">
                        <span className="text-sm">Pago seguro con SSL</span>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="w-13 h-13 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                        <Headphones className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-gray-700">
                        <span className="text-sm">Soporte disponible 24/7</span>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="w-13 h-13 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-gray-700">
                        <span className="text-sm">Diferentes métodos de pago</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
