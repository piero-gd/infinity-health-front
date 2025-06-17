import { LuCalculator } from "react-icons/lu";

export default function NutritionalPlan() {
    
    return (
        <div className="relative">
            <h3 className="text-3xl font-medium">Calculadora de Macros</h3>
            <span className="text-sm font-medium text-gray-500 block ">Personaliza tu nutrición y alcanza tus objetivos</span>

            
            <div className="relative mt-2">
                <div className="space-y-3 bg-green-50 rounded-4xl border-2 border-green-500 p-6">
                <img src="public/img/calculator bg.png" alt="Calculadora Macro" className="w-full h-auto mb-4 shadow-lg rounded-2xl" />
             
                <div className="flex items-center justify-center">
                    <button className="flex items-center gap-2 p-3 px-6 py-1 text-black bg-blue-50 border-2 border-primary rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                        <span className="text-sm font-medium">Calcular ahora</span>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] shadow-xl">
                            <LuCalculator className="w-6 h-6 m-auto text-white mt-2" />
                        </div>
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}