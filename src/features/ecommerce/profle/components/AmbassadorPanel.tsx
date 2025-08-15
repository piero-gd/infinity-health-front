import { IoCheckmarkDoneOutline } from "react-icons/io5";

export default function AmbassadorPanel() {
    const benefits = [
        'Comisiones atractivas',
        'Acceso a recursos exclusivos',
        'Descuentos especiales en productos Health',
        'Panel de Ejercicios y rutinas personalizadas',
        'Comunidad privada de embajadores',
        'Capacitación y soporte continuo con Academy'
    ];

    return (
        <div className="w-full mx-auto relative">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl transform -rotate-1 scale-105 -z-10"></div>
            
            {/* Card */}
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex flex-col md:flex-row">
                    {/* Left Column - Content */}
                    <div className="md:w-3/5 p-8 md:pr-4">
                        <div className="inline-block bg-yellow-500 text-yellow-50 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            Sé un Embajador de Capital Infinity
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                            Embajadores <span className="text-yellow-500">Staking</span>
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Únete a nuestra red de embajadores y genera ingresos mientras promueves el bienestar integral a través de nuestra innovadora plataforma blockchain.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => window.open('https://capitalstakingx.com/auth/login', '_blank')}
                                className="bg-gradient-to-r from-yellow-500 to-yellow-500 hover:from-yellow-500 hover:to-yellow-500 text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                                Regístrate en Capital Staking
                            </button>
                        </div>
                    </div>
                    
                    {/* Right Column - Image */}
                    <div className="md:w-2/5 p-6 flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white relative">
                        <div className="relative z-10">
                            <div className="relative">
                                <div className="absolute -inset-3 bg-yellow-100 rounded-full opacity-50 animate-pulse"></div>
                                <div className="relative bg-white p-2 rounded-full shadow-lg">
                                    <img 
                                        src="/img/capitalStacking.png" 
                                        alt="Capital Staking Logo" 
                                        className="w-32 h-32 object-contain" 
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-yellow-600 text-white text-xs font-bold py-1 px-2 rounded-full">
                                ¡Regístrate hoy!
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-4 text-yellow-200 text-6xl font-bold opacity-30">∞</div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Beneficios de Ser Embajador</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <IoCheckmarkDoneOutline className="h-6 w-6 text-green-500 mt-0.5" />
                            <span className="text-gray-700">{benefit}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}