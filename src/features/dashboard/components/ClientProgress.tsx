import { RiProgress3Fill } from "react-icons/ri";
//import { Zap } from "lucide-react";
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
        <div className="flex flex-col max-w-4xl mx-auto  ">
            {/* Main Progress Section */}
            <div className="rounded-2xl bg-white px-6 py-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full flex items-center justify-center">
                        <RiProgress3Fill className="w-7 h-7 text-[var(--color-primary)]" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-lg">Progreso general</h4>
                </div>
                
                <div className="bg-gray-200 rounded-2xl p-4 mb-4">
                    <h4 className="text-gray-600 text-lg mb-4">Entrenamientos completados</h4>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div className="bg-[var(--color-primary)] h-full rounded-full w-[70%]"></div>
                        </div>
                        <span className="text-md text-gray-600">70%</span>
                    </div>
                </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
               {/* Favorite Training - Tu base exacta */}
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Entrenamiento Favorito</h3>
                                
                <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-4xl font-bold text-gray-900">1.480</h2>
                        <span className="text-gray-500 text-lg">Peso</span>
                    </div>
                </div>
                                
                {/* AreaChart - Reemplaza tu SVG */}
                <div className="relative h-16   mb-2">
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
                <div className="flex justify-between text-sm text-gray-400 p-2">
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span className="text-blue-500 font-medium">15</span>
                    <span>16</span>
                    <span>17</span>
                    <span>18</span>
                </div>
            </div>

                {/* Ambassador Section */}
                <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                            <img src="img/iconohealth.png" alt="" className="w-6 h-6" />
                        </div>
                    </div>
                    
                    <h4 className="text-md font-medium text-gray-900 mb-2">Conviértete en Embajador</h4>
                    
                    <p className="text-gray-600 text-sm mb-2 flex-1">
                        Su prueba finaliza el 7 de julio 2025. Actualice tu Membresía para continuar usando todas las herramientas.
                    </p>
                    
                    <button className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white font-medium py-3 px-4 rounded-full transition-colors shadow-md">
                        Actualizar
                    </button>
                </div>
            </div>
        </div>
    );
}