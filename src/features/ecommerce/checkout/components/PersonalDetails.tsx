export default function PersonalDetails() {
    return (
        <div className="bg-white rounded-2xl p-5 w-full">
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

            {/* Delivery Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
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
    );
}
