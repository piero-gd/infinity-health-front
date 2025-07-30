export default function Summary() {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h1 className="text-xl font-bold mb-4 text-gray-800">Resumen del pedido</h1>
            
            {/* Product List */}
            <div className="space-y-4 mb-6">
                {/* Header */}
                <div className="flex justify-between pb-2 border-b border-gray-400">
                    <span className="font-semibold text-gray-700">Productos</span>
                    <span className="font-semibold text-gray-700">Subtotal: $92</span>
                </div>
                
                {/* Product Items */}
                <div className="space-y-3">
                    <div className="flex justify-between pb-4 border-b border-dashed items-center border-gray-300">
                        <div className="flex items-center">
                            <div className="border border-gray-200 p-2 rounded-lg ">
                                <img src="img/pruebapro.png" className="w-16 h-16" alt="Aloex" />
                            </div>
                            <span className="text-black ml-2">Aloex</span>
                        </div>
                        <span className="font-medium">$5</span>
                    </div>
                    <div className="flex justify-between pb-4 pt-1 border-b border-dashed border-gray-300 items-center">
                        <div className="flex items-center">
                            <div className="border border-gray-200 p-2 rounded-lg ">
                                <img src="img/pruebapro.png" className="w-16 h-16" alt="Xgo" />
                            </div>
                            <span className="text-black ml-2">Xgo!</span>
                        </div>
                        <span className="font-medium">$7</span>
                    </div>
                    <div className="flex justify-between pt-1 items-center">
                        <div className="flex items-center">
                            <div className="border border-gray-200 p-2 rounded-lg ">
                                <img src="img/pruebapro.png" className="w-16 h-16" alt="Potenciador Masculino" />
                            </div>
                            <span className="text-black ml-2">Potenciador Masculino</span>
                        </div>
                        <span className="font-medium">$80</span>
                    </div>
                </div>
            </div>
            
            {/* Summary */}
            <div className="space-y-1 border-t border-black pt-2">
                <div className="flex justify-between">
                    <span className="text-black">Envío:</span>
                    <span className="text-black font-semibold">$0</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-black">Descuento:</span>
                    <span className="text-black font-semibold">$0</span>
                </div>
                <div className="flex justify-between pt-4 mt-2 border-t border-black">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-xl text-[var(--color-primary)]">$97</span>
                </div>
            </div>
        </div>
    );
}