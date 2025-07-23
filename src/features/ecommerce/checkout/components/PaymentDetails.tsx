import { Shield, Headphones, CreditCard } from "lucide-react";

export default function PaymentDetails() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-md mx-auto space-y-6">
                
                {/* Main Details Card */}
                <div className="bg-white rounded-2xl p-6">
                    
                    {/* Personal Details Section */}
                    <div className="mb-8 border-b pb-6 border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Detalles personales</h2>
                        
                        <div className="space-y-3">
                            <div className="text-gray-700">
                                <div className="font-medium">Yoma Arenas</div>
                            </div>
                            
                            <div className="text-gray-700">
                                <div>955142649</div>
                            </div>
                            
                            <div className="text-gray-700">
                                <div>yomaarenas@gmail.com</div>
                            </div>
                            
                            <div className="text-gray-700">
                                <div className="text-sm text-gray-500">DNI</div>
                                <div>4865235</div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery / Entrega</h2>
                        
                        <div className="space-y-2 text-gray-700">
                            <div>Lima</div>
                            <div>Lima</div>
                            <div>Santiago de Surco</div>
                            <div>Av Oscar benavides 3940</div>
                            <div>Apto 203, Torre C</div>
                        </div>
                    </div>

                </div>

                {/* Security Features - Outside main card */}
                <div className="space-y-4">
                    
                    {/* SSL Security */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-gray-700">
                            <span>Pago seguro con SSL</span>
                        </div>
                    </div>

                    {/* 24/7 Support */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Headphones className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-gray-700">
                            <span>Soporte disponible 24/7</span>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-gray-700">
                            <span>Diferentes métodos de pago</span>
                        </div>
                    </div>
                    
                </div>
                </div>
                
            </div>
        
    );
}