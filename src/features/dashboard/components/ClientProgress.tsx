import { AreaChart, Area, ResponsiveContainer } from "recharts";


export default function ClientProgress() {
    // Mock data
    const data = [
        { day: '12', value: 45 },
        { day: '13', value: 35 },
        { day: '14', value: 40 },
        { day: '15', value: 25 },
        { day: '16', value: 30 },
        { day: '17', value: 20 },
        { day: '18', value: 35 }
    ];

    return (
        <div className="flex flex-col w-full h-full">
            {/* Sección de barras */}
            <div className="rounded-2xl bg-white px-6 py-4 border border-gray-100 shadow-sm mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-900 text-md">Progreso general</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">Entrenamientos completados</p>
                <div className="bg-gray-100 rounded-2xl mb-3 py-8 p-5 px-3 ">
                    <div className="flex items-center gap-4 ">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div className="bg-[var(--color-primary)] h-full rounded-full w-[70%] transition-all duration-500"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 min-w-[30px] text-right">70%</span>
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 h-full">
               {/* Favorite Training  */}
            <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-sm">
                <h3 className="font-medium text-gray-900 mb-3 text-center sm:text-left">Entrenamiento Favorito</h3>
                <span className="text-md font-medium text-primary underline mb-3 mt-3 block text-center sm:text-left">Flexiones (Push-ups)</span>
                                
                <div className="mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2 mt-3 items-center">
                        <h2 className="text-2xl font-bold text-gray-900">12</h2>
                        <span className="text-gray-500 text-sm">Veces esta semana</span>
                    </div>
                </div>
                                
                {/* AreaChart */}
                <div className="relative h-12 mb-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#3b82f6" 
                                strokeWidth={3}
                                fill="url(#colorValue)"
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                                
                {/* Days - Tu base exacta */}
                <div className="flex justify-between text-xs text-gray-400 px-1">
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span className="text-blue-500 font-medium">15</span>
                    <span>16</span>
                    <span>17</span>
                    <span>18</span>
                </div>
            </div>

                {/* EMBAJADOR SECTION */}
                <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                            <img src="img/iconohealth.png" alt="" className="w-6 h-6" />
                        </div>
                    </div>
                    
                    <h3 id="client-progress" className="text-md font-medium text-gray-900 mb-1">Conviértete en Embajador</h3>
                    
                    <p className="text-gray-600 text-sm mb-2 flex-1">
                        Su prueba finaliza el 7 de julio 2025. Actualice tu Membresía para continuar usando todas las herramientas.
                    </p>
                    
                    <button className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white text-sm font-medium py-2 px-3 rounded-full transition-colors shadow-md">
                        Actualizar
                    </button>
                </div>
            </div>
        </div>
    );
}