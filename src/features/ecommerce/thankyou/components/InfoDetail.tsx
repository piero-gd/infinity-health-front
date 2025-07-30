export default function InfoDetail() {
    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm h-auto">
            {/* Personal Information */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Detalles personales
                </h2>
                <div className="space-y-1">
                    <p className="text-gray-700">Yoma Arenas</p>
                    <p className="text-gray-600">+51 123456789</p>
                    <p className="text-gray-600">yomaarenas@gmail.com</p>
                    <p className="text-sm font-medium text-gray-500">DNI</p>
                    <p className="text-gray-700">12345678</p>
                </div>
            </div>
            
            {/* Delivery Information */}
            <div className="pt-3 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Delivery / Entrega
                </h2>
                <div className="space-y-1">
                    <p className="text-gray-700">Yoma Arenas</p>
                    <p className="text-gray-600">Av. Surco 123</p>
                    <p className="text-gray-600">Santiago de Surco, Lima</p>
                    <p className="text-gray-600">Lima, 3940</p>
                    <p className="text-gray-600">Dpto. 123</p>
                </div>
            </div>
        </div>
    );
}