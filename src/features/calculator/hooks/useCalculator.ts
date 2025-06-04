import {useState, useCallback} from 'react';
import type {CalculatorResults, CalculatorData} from '../types/index';
import calculateMacros from '../utils/calculateMacros';

export function useCalculator() {
    const [resultado, setResultado] = useState<CalculatorResults | null>(null);
    const [showDietPlan, setShowDietPlan] = useState(false);

    const manejarCalculo = useCallback((resultado: CalculatorData) => {
        const calculo = calculateMacros(resultado);
        setResultado(calculo);
        setShowDietPlan(false);
        console.log("se manejó el calculo", calculo);
    }, []);

    const handleGenerateDiet = useCallback(() => {
        setShowDietPlan(true);
    }, []);

    const handleBackToResults = useCallback(() => {
        setShowDietPlan(false);
    }, []);

    return {
        resultado,
        showDietPlan,
        manejarCalculo,
        handleGenerateDiet,
        handleBackToResults
    };
}
        