import { FaCircle } from "react-icons/fa";


export default function NutritionalPlan() {
    
    return (
        <div >
            <h3 className="text-3xl font-medium">Plan nutricional</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3">
            <span className="text-sm font-medium text-gray-500"> Calculadora Macros</span>
            <img src="public/img/calculator bg.png" alt="" />
            <ul className="pl-3">
                <li className="flex items-center gap-2 text-gray-500">
                    <FaCircle className="text-primary " /> Plan de alimentación diaria
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                    <FaCircle className="text-primary" /> Consejos del día
                </li>
                <li className="flex items-center gap-2 text-gray-500">
                    <FaCircle className="text-primary" /> Resultados Macros
                </li>
            </ul>
        </div>
        </div>
    );
}