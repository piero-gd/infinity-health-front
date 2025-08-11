import { LuCalculator } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function NutritionalPlan() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
                <h3 className="text-3xl font-medium">Calculadora de Macros</h3>
                <span className="text-sm font-medium text-gray-500 block">
                    Personaliza tu nutrición y alcanza tus objetivos
                </span>
                
                <div className="relative mt-3">
                    <div className="bg-green-50 items-center justify-center flex flex-col rounded-4xl border-2 border-green-500 p-4 ">
                        <img 
                            src="public/img/calculator bg.png" 
                            alt="Calculadora Macro" 
                            className="w-7/8 h-full mb-4 shadow-lg rounded-2xl" 
                        />
                        
                        <div className="flex items-center justify-center">
                            <button className="flex items-center gap-2 p-3 px-14 py-2 text-black bg-blue-50 border-2 border-primary rounded-full
                            shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            onClick={() => navigate('/calculator')}>
                                <span className="text-sm font-medium">Calcular ahora</span>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl">
                                    <LuCalculator className="w-6 h-6 m-auto text-white mt-2" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile and Ipad Layout */}
            <div className="block lg:hidden">
                <div className="flex items-start gap-3 p-3">
                    {/* Contenido Izquierda - Imagen */}
                    <div className="flex-shrink-0 w-28 sm:w-36">
                        <div className="bg-green-50 rounded-2xl border-2 border-green-500 p-1.5">
                            <img 
                                src="public/img/calculator bg.png" 
                                alt="Calculadora Macro" 
                                className="w-full h-auto rounded-lg" 
                                loading="lazy"
                            />
                        </div>
                    </div>
                    
                    {/* Contenido Derecha - Texto y Botón */}
                    <div className="flex-1 flex flex-col justify-between h-full min-h-[120px]">
                        <div>
                            <h3 className="text-base font-semibold text-gray-800 leading-tight">
                                Calculadora de Macros
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                Personaliza tu nutrición y alcanza tus objetivos
                            </p>
                        </div>
                        
                        <div className="mt-2">
                            <button className="flex items-center justify-between w-full max-w-[180px] bg-blue-50 border-2 border-[var(--color-primary)] rounded-full px-4 py-1.5 shadow-sm hover:shadow-md transition-all"
                            onClick={() => navigate('/calculator')}>
                                <span className="text-sm font-medium text-gray-800">Calcular</span>
                                <div className="w-7 h-7 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow flex items-center justify-center">
                                    <LuCalculator className="w-3.5 h-3.5 text-white" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}