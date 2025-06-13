import { FaCircle } from "react-icons/fa";
import { LuCalculator } from "react-icons/lu";

export default function NutritionalPlan() {
    
    return (
        <div className="relative">
            <h3 className="text-3xl font-medium">Plan nutricional</h3>
            <span className="text-sm font-medium text-gray-500 block ">Calculadora Macro</span>

            
            <div className="relative mt-2">
                <img src="public/img/calculator bg.png" alt="Calculadora Macro" className="w-full h-auto mb-4" />
                <ul className="space-y-3 pl-2">
                    <li className="flex items-center gap-2 text-gray-600">
                        <FaCircle className="text-primary text-xs " /> Plan de alimentación diaria
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 ">
                        <FaCircle className="text-primary text-xs" /> Consejos del día
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 ">
                        <FaCircle className="text-primary text-xs" /> Resultados Macros
                    </li>
                </ul>
                
                <button className="absolute -right-1 w-16 h-16 -bottom-2 z-10 p-3 text-white bg-gradient-to-r from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <LuCalculator className=" inline-block w-8 h-8" />
                </button>
            </div>
        </div>
    );
}