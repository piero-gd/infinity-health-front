
import { Zap, Play } from "lucide-react";

export default function ClickeableServices() {
    return (
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
            {/* Primera tarjeta - Academia Nutricional */}
            <div className="flex-1">
                <div className="bg-white p-4 rounded-2xl border-1 border-gray-100 shadow-sm">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">Clases y contenido</h4>
                    
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Contenido principal con gradiente */}
                        <div className="relative aspect-[3/4] bg-gradient-to-r from-blue-600 via-blue-500 to-gray-300 overflow-hidden">
                            {/* Imagen de la mujer */}
                            <div className="absolute inset-0">
                                <img
                                    src="img/ejercicio.png"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            
                            {/* Overlay con gradiente para el texto */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-btn-gradient-bottom)] to-transparent"></div>
                            
                            {/* Contenido de texto */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                                <div>
                                    <h3 className="text-2xl font-medium leading-tight">Academia<br />nutricional</h3>
                                </div>
                                
                                <div>
                                    {/* Botón */}
                                    <button className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full border-1 border-primary text-sm font-medium hover:bg-gray-50 transition-colors">
                                        Ver lecciones <Zap size={14}/>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Elementos decorativos - rayos */}
                            <div className="absolute top-16 right-8 text-blue-300/40">
                                <Zap size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Segunda tarjeta - Biblioteca de Ejercicios */}
            <div className="flex-1 relative">
                <div className="bg-white p-4 rounded-2xl border-1 border-gray-100 shadow-sm">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">Tu entrenamiento de hoy</h4>
                    
                    <div className="relative aspect-[4/5] bg-gradient-to-r from-blue-600 to-gray-600 rounded-2xl overflow-hidden shadow-lg">
                        {/* Lado izquierdo - contenido principal */}
                        <div className="absolute left-0 top-0 h-full w-3/5 bg-blue-600 p-6 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-medium text-white leading-tight mb-4">Biblioteca de<br />ejercicios</h3>
                            </div>
                        </div>


                        {/* Lado derecho - video preview */}
                        <div className="absolute right-0 top-0 h-full w-2/5 bg-gray-700 overflow-hidden">
                            <img
                                src="img/ejercicio.png"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />

                             {/* Botón de play centrado */}
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors cursor-pointer">
                                    <Play className="text-white text-xl ml-0.5" fill="white" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Botón de biblioteca centrado encima de ambos */}
                        <div className="absolute inset-x-0 bottom-12 flex items-center justify-center z-10">
                            <div className=" cursor-pointer">
                                <button className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full border-1 border-primary text-sm font-medium hover:bg-gray-50 transition-colors">
                                    Ir a la biblioteca <Zap size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}