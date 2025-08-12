import { useState } from 'react';
import { Check } from 'lucide-react';
import { RiLock2Line } from "react-icons/ri";
import { RiInfinityLine } from "react-icons/ri";
import { ImWhatsapp } from "react-icons/im";
import { CiCreditCard1 } from "react-icons/ci";
import PaymentLogos from "../../../../components/PaymentLogos";
import { useCheckout } from '../hooks/useCheckout';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { showToast } from '../../../../utils/toastConfig';

const cardPaymentLogos = [
    { src: "/img/icons/visa-logo.svg" },
    { src: "/img/icons/Mastercard.svg" },
    { src: "/img/icons/american-eex.svg" },
    { src: "/img/icons/DinersClub.svg" },
];

export default function PaymentMethods() {
    // Por default card para la simulación de Mercado Pago
    const [selectedMethod, setSelectedMethod] = useState('card');
    // Por default false
    const [acceptedTerms, setAcceptedTerms] = useState({
        crypto: false,
        whatsapp: false,
        card: false
    });
    
    const { isSubmitting, completeOrder } = useCheckout();
    const { orderUuid } = useCheckoutStore();

    const handleMethodSelect = (method: string) => {
        setSelectedMethod(method);
    };

    const handleTermsChange = (method: string, checked: boolean) => {
        setAcceptedTerms(prev => ({
            ...prev,
            [method]: checked
        }));
    };
    
    const handlePayment = (method: string) => {
        if (!acceptedTerms[method as keyof typeof acceptedTerms]) {
            showToast.error('Términos y Condiciones', 'Debes aceptar los términos y condiciones para continuar');
            return;
        }
        
        // Verificar que tenemos el UUID de la orden
        if (!orderUuid) {
            showToast.error('Error', 'No se encontró el identificador de la orden. Por favor regresa al paso anterior.');
            return;
        }
        
        if (method === 'card') {
            // Procesar pago con tarjeta usando el UUID de la orden
            completeOrder();
        } else {
            showToast.info('Método de pago', 'Este método de pago estará disponible próximamente');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto xl:p-4 bg-white rounded-3xl">
            <h2 className="text-xl font-bold text-gray-900 mb-8 text-left">Métodos de pago</h2>
            
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
                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' 
                                    : 'border-gray-300'
                            }`}>
                                {selectedMethod === 'crypto' && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex grid-cols-2 gap-4 mb-2">
                                    <div className="w-20 h-10 xl:block md:block hidden rounded-lg border-1 border-gray-300 items-center justify-center text-white font-bold text-sm">
                                        <img src="../../img/capitalStacking.png" className="p-1 pb-4 pt-1" alt="" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-semibold text-gray-900 mb-2">Capital Staking X (Cripto)</h3>
                                        <p className="text-sm text-gray-600 mb-4">Paga con Staking en automático y en tiempo real</p>
                                        <div className="w-15 h-10 border-1 border-gray-300 rounded flex items-center justify-center">
                                            <img src="../../img/thetherUSDT.png" className="p-1 pb-4 pt-2" alt="" />
                                        </div>
                                    </div>
                                </div>
                                
                                {selectedMethod === 'crypto' && (
                                    <div className="mt-4 pt-2">
                                        <button
                                            onClick={() => handlePayment('crypto')}
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-3 px-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            Pagar con Staking X
                                            <RiInfinityLine className="hidden xl:block md:block w-10 h-6 text-white" />
                                        </button>
                                        <div className="flex items-start gap-2 mt-3">
                                            <input 
                                                type="checkbox" 
                                                id="terms-crypto"
                                                checked={acceptedTerms.crypto}
                                                onChange={(e) => handleTermsChange('crypto', e.target.checked)}
                                                style={{ accentColor: 'var(--color-primary)' }}
                                                className="w-4 h-4 rounded border-gray-300 mt-0.5"
                                            />
                                            <label htmlFor="terms-crypto" className="text-sm text-gray-600">
                                                Declaro que he leído y aceptado los{' '}
                                                <span className="text-[var(--color-primary)] hover:underline cursor-pointer">
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
                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' 
                                    : 'border-gray-300'
                            }`}>
                                {selectedMethod === 'whatsapp' && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex grid-cols-2 gap-4 mb-2">
                                <div className="w-20 h-10 xl:block md:block hidden border-1 border-gray-300 rounded-lg items-center justify-center">
                                    <img src="../../img/whatsApp.png" className="p-1 pb-4 pt-1" alt="WhatsApp" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <h3 className="font-semibold text-gray-900 mb-2">Pago por WhatsApp</h3>
                                    <p className="text-sm text-gray-600 mb-4">Paga con Yape, Plin y Transferencias (BCP, BBVA, Interbank).</p>
                                    <div className="flex items-center gap-2">
                                    <div className="w-12 h-8 border-1 border-gray-300 rounded flex items-center justify-center">
                                        <img src="../../img/transfer.png" alt="Transferencia" />
                                    </div>
                                    <div className="w-12 h-8 rounded flex items-center justify-center">
                                        <img src="../../img/YAPE.png" className="p-0.5" alt="YAPE" />
                                    </div>
                                    <div className="w-8 h-8 rounded flex items-center justify-center">
                                        <img src="../../img/PLIN.png" alt="PLIN" />
                                    </div>
                                    </div>
                                </div>
                                </div>
                                
                                {selectedMethod === 'whatsapp' && (
                                    <div className="mt-4 pt-2 ">
                                        <button 
                                            onClick={() => handlePayment('whatsapp')}
                                            disabled={isSubmitting} 
                                            className="w-full bg-white text-[var(--color-primary)] border-[var(--color-primary)] border-2 py-3 px-4 shadow-lg rounded-full font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                             Pagar por WhatsApp
                                             <ImWhatsapp className="hidden xl:block md:block ml-2 w-6 h-6 text-[var(--color-primary)]" />
                                        </button>
                                        <div className="flex items-start gap-2 mt-3">
                                            <input 
                                                type="checkbox" 
                                                id="terms-whatsapp"
                                                checked={acceptedTerms.whatsapp}
                                                onChange={(e) => handleTermsChange('whatsapp', e.target.checked)}
                                                style={{ accentColor: 'var(--color-primary)' }}
                                                className="w-4 h-4 rounded border-gray-300 mt-0.5"
                                            />
                                            <label htmlFor="terms-whatsapp" className="text-sm text-gray-600">
                                                Declaro que he leído y aceptado los{' '}
                                                <span className="text-[var(--color-primary)] hover:underline cursor-pointer">
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
                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]' 
                                    : 'border-gray-300'
                            }`}>
                                {selectedMethod === 'card' && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex grid-cols-2 gap-4 mb-2">
                            <div className="w-20 h-11 xl:block md:block hidden border-1 border-gray-300 rounded-lg items-center justify-center">
                                <img src="../../img/mercadoPago.png" className='p-1 pb-4'  alt="MercadoPago" />
                            </div>
                            <div className="flex flex-col items-start">
                                <h3 className="font-semibold text-gray-900 mb-2">Tarjeta Débito y Crédito</h3>
                                <p className="text-sm text-gray-600 mb-4">Tu pago será procesado con Mercadopago de forma segura</p>
                                <div className="flex items-center gap-2">
                                <PaymentLogos logos={cardPaymentLogos} />
                                </div>
                            </div>
                            </div>
                                
                                {selectedMethod === 'card' && (
                                    <div className="mt-4 pt-2">
                                        <button 
                                            onClick={() => handlePayment('card')} 
                                            disabled={isSubmitting}
                                            className="w-full bg-white text-[var(--color-primary)] border-[var(--color-primary)] border-2 py-3 px-4 shadow-lg rounded-full font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            {isSubmitting ? 'Procesando pago...' : 'Pagar con Tarjeta'}
                                            {!isSubmitting && <CiCreditCard1 className="hidden xl:block md:block ml-2 w-6 h-6 text-[var(--color-primary)]" />}
                                        </button>
                                        <div className="flex items-start gap-2 mt-3">
                                            <input 
                                                type="checkbox" 
                                                id="terms-card"
                                                checked={acceptedTerms.card}
                                                onChange={(e) => handleTermsChange('card', e.target.checked)}
                                                style={{ accentColor: 'var(--color-primary)' }}
                                                className="w-4 h-4 rounded border-gray-300 mt-0.5"
                                            />
                                            <label htmlFor="terms-card" className="text-sm text-gray-600">
                                                Declaro que he leído y aceptado los{' '}
                                                <span className="text-[var(--color-primary)] hover:underline cursor-pointer">
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