import { useState } from 'react';
import { Check } from 'lucide-react';
import { RiLock2Line } from "react-icons/ri";

export default function PaymentMethods() {
    const [selectedMethod, setSelectedMethod] = useState('crypto');
    const [acceptedTerms, setAcceptedTerms] = useState({
        crypto: false,
        whatsapp: false,
        card: false
    });

    const handleMethodSelect = (method: string) => {
        setSelectedMethod(method);
    };

    const handleTermsChange = (method: string, checked: boolean) => {
        setAcceptedTerms(prev => ({
            ...prev,
            [method]: checked
        }));
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Métodos de pago</h2>
            
            {/* Security notice */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                <RiLock2Line className="w-4 h-4 text-[var(--color-primary)]" />
                <span>Todas las transacciones son seguras y están encriptadas.</span>
            </div>

            <div className="grid md:grid-cols-1 gap-6">
                {/* Payment Options */}
                <div className="space-y-4">
                    {/* Capital Staking X (Crypto) */}
                    <div 
                        className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                            selectedMethod === 'crypto' 
                                ? 'border-[var(--color-primary)] bg-white' 
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleMethodSelect('crypto')}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                                selectedMethod === 'crypto' 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300'
                            }`}>
                                {selectedMethod === 'crypto' && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                        X
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Capital Staking X (Cripto)</h3>
                                        <p className="text-sm text-gray-600">Paga con Staking en automático y en tiempo real</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-6 bg-green-100 rounded flex items-center justify-center">
                                        <span className="text-xs text-green-700 font-medium">tether</span>
                                    </div>
                                    <span className="text-xs text-gray-500">(USDT)</span>
                                </div>
                                
                                {selectedMethod === 'crypto' && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <button className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-3 px-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                                            <span className="text-lg">∞</span>
                                            Pagar con Capital Staking X
                                        </button>
                                        <div className="flex items-start gap-2 mt-3">
                                            <input 
                                                type="checkbox" 
                                                id="terms-crypto"
                                                checked={acceptedTerms.crypto}
                                                onChange={(e) => handleTermsChange('crypto', e.target.checked)}
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 mt-0.5"
                                            />
                                            <label htmlFor="terms-crypto" className="text-sm text-gray-600">
                                                Declaro que he leído y aceptado los{' '}
                                                <span className="text-blue-500 hover:underline cursor-pointer">
                                                    Términos y Condiciones
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Payment */}
                    <div 
                        className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                            selectedMethod === 'whatsapp' 
                                ? 'border-[var(--color-primary)] bg-white' 
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleMethodSelect('whatsapp')}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                                selectedMethod === 'whatsapp' 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300'
                            }`}>
                                {selectedMethod === 'whatsapp' && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-lg">💬</span>
                                    </div>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                        PAGO DIRECTO
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Pago por WhatsApp</h3>
                                    <p className="text-sm text-gray-600 mb-3">Paga con Yape, Plin y Transferencias (BCP, BBVA, Interbank).</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-6 bg-purple-600 rounded flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">T</span>
                                    </div>
                                    <div className="w-8 h-6 bg-purple-800 rounded flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">yape</span>
                                    </div>
                                    <div className="w-8 h-6 bg-teal-500 rounded flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">plin</span>
                                    </div>
                                </div>
                                
                                {selectedMethod === 'whatsapp' && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <button className="w-full bg-white text-[var(--color-primary)] border-[var(--color-primary)] border-2 py-3 px-4 shadow-lg rounded-full font-semibold transition-colors flex items-center justify-center gap-2">
                                            <span>💬</span>
                                            Pagar por WhatsApp
                                        </button>
                                        <div className="flex items-start gap-2 mt-3">
                                            <input 
                                                type="checkbox" 
                                                id="terms-whatsapp"
                                                checked={acceptedTerms.whatsapp}
                                                onChange={(e) => handleTermsChange('whatsapp', e.target.checked)}
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 mt-0.5"
                                            />
                                            <label htmlFor="terms-whatsapp" className="text-sm text-gray-600">
                                                Declaro que he leído y aceptado los{' '}
                                                <span className="text-blue-500 hover:underline cursor-pointer">
                                                    Términos y Condiciones
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Credit/Debit Card */}
                    <div 
                        className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                            selectedMethod === 'card' 
                                ? 'border-[var(--color-primary)] bg-white' 
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleMethodSelect('card')}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                                selectedMethod === 'card' 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300'
                            }`}>
                                {selectedMethod === 'card' && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-blue-600 text-sm font-bold">MP</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Tarjeta Débito y Crédito</h3>
                                    <p className="text-sm text-gray-600 mb-3">Tu pago será procesado con Mercadopago de forma segura</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">VISA</span>
                                    </div>
                                    <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-400 rounded flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">MC</span>
                                    </div>
                                    <div className="w-10 h-6 bg-blue-400 rounded flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">AMEX</span>
                                    </div>
                                    <div className="w-8 h-6 bg-blue-900 rounded flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">D</span>
                                    </div>
                                </div>
                                
                                {selectedMethod === 'card' && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <button className="w-full bg-white text-[var(--color-primary)] border-[var(--color-primary)] border-2 py-3 px-4 shadow-lg rounded-full font-semibold transition-colors flex items-center justify-center gap-2">
                                            <span>💳</span>
                                            Pagar con Tarjeta
                                        </button>
                                        <div className="flex items-start gap-2 mt-3">
                                            <input 
                                                type="checkbox" 
                                                id="terms-card"
                                                checked={acceptedTerms.card}
                                                onChange={(e) => handleTermsChange('card', e.target.checked)}
                                                className="w-4 h-4 text-blue-600 rounded border-gray-300 mt-0.5"
                                            />
                                            <label htmlFor="terms-card" className="text-sm text-gray-600">
                                                Declaro que he leído y aceptado los{' '}
                                                <span className="text-blue-500 hover:underline cursor-pointer">
                                                    Términos y Condiciones
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}