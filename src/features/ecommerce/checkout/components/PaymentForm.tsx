import { useState } from 'react';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { useCheckout } from '../hooks/useCheckout';

interface PaymentFormProps {
    isSubmitting: boolean;
}

export default function PaymentForm({ isSubmitting }: PaymentFormProps) {
    const { paymentData, setPaymentData } = useCheckoutStore();
    const { completeOrder } = useCheckout();
    const [touched, setTouched] = useState({
        cardNumber: false,
        cardHolder: false,
        expiryDate: false,
        cvv: false,
        email: false
    });

    // Manejar cambios en los campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Formateo especial para número de tarjeta
        if (name === 'cardNumber') {
            // Eliminar espacios y caracteres no numéricos
            const cleaned = value.replace(/\D/g, '');
            // Limitar a 16 dígitos
            const limited = cleaned.substring(0, 16);
            // Dar formato XXXX XXXX XXXX XXXX
            const formatted = limited.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
            setPaymentData({ [name]: formatted });
        } 
        // Formateo para fecha de expiración (MM/YY)
        else if (name === 'expiryDate') {
            // Eliminar caracteres no numéricos
            const cleaned = value.replace(/\D/g, '');
            // Limitar a 4 dígitos
            const limited = cleaned.substring(0, 4);
            
            // Dar formato MM/YY
            if (limited.length > 2) {
                const formatted = `${limited.substring(0, 2)}/${limited.substring(2)}`;
                setPaymentData({ [name]: formatted });
            } else {
                setPaymentData({ [name]: limited });
            }
        }
        // Formateo para CVV (3-4 dígitos)
        else if (name === 'cvv') {
            const cleaned = value.replace(/\D/g, '');
            setPaymentData({ [name]: cleaned.substring(0, 4) });
        } 
        // Campos regulares
        else {
            setPaymentData({ [name]: value });
        }
    };

    // Marcar un campo como tocado cuando pierde el foco
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    // Verificar si hay un error en un campo
    const hasError = (field: keyof typeof touched) => {
        return touched[field] && !paymentData[field];
    };

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Marcar todos los campos como tocados
        const allTouched = Object.keys(touched).reduce((acc, key) => {
            return { ...acc, [key]: true };
        }, {});
        setTouched(allTouched as typeof touched);
        
        // Verificar si todos los campos tienen valor
        const isValid = Object.keys(paymentData).every(
            key => !!paymentData[key as keyof typeof paymentData]
        );
        
        if (isValid) {
            completeOrder();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Número de tarjeta */}
            <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Número de tarjeta *
                </label>
                <input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${
                        hasError('cardNumber') ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    placeholder="XXXX XXXX XXXX XXXX"
                    autoComplete="cc-number"
                />
                {hasError('cardNumber') && (
                    <p className="mt-1 text-sm text-red-600">El número de tarjeta es obligatorio</p>
                )}
            </div>

            {/* Nombre del titular */}
            <div>
                <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del titular *
                </label>
                <input
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    value={paymentData.cardHolder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${
                        hasError('cardHolder') ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    placeholder="Como aparece en la tarjeta"
                    autoComplete="cc-name"
                />
                {hasError('cardHolder') && (
                    <p className="mt-1 text-sm text-red-600">El nombre del titular es obligatorio</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Fecha de expiración */}
                <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de expiración *
                    </label>
                    <input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        value={paymentData.expiryDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${
                            hasError('expiryDate') ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                        placeholder="MM/YY"
                        autoComplete="cc-exp"
                    />
                    {hasError('expiryDate') && (
                        <p className="mt-1 text-sm text-red-600">La fecha es obligatoria</p>
                    )}
                </div>

                {/* CVV */}
                <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                    </label>
                    <input
                        id="cvv"
                        name="cvv"
                        type="text"
                        value={paymentData.cvv}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border ${
                            hasError('cvv') ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                        placeholder="XXX"
                        autoComplete="cc-csc"
                    />
                    {hasError('cvv') && (
                        <p className="mt-1 text-sm text-red-600">El CVV es obligatorio</p>
                    )}
                </div>
            </div>

            {/* Email para recibo */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email para recibo *
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={paymentData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border ${
                        hasError('email') ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    placeholder="tucorreo@ejemplo.com"
                    autoComplete="email"
                />
                {hasError('email') && (
                    <p className="mt-1 text-sm text-red-600">El email es obligatorio</p>
                )}
            </div>

            {/* Botón de pago */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Procesando pago...' : 'Completar compra'}
            </button>
        </form>
    );
}
