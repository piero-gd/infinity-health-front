import { RiLock2Line } from 'react-icons/ri';
import { FaShoppingCart } from 'react-icons/fa';
import { FaCheckDouble } from "react-icons/fa6";
import PaymentLogos from '../../../../components/PaymentLogos';
import type { TotalCartProps } from '../types';
import { useAmbassadorValidation } from '../hooks/useAmbassadorValidation';
export default function TotalCart({
  subtotalNormalPrice,
  subtotalEmbajadorPrice,
  shipping,
  discount,
}: TotalCartProps) {
  const {
    isAmbassador,
    promoCode,
    setPromoCode,
    handlePromoCodeSubmit,
    validationMessage
  } = useAmbassadorValidation({ onApplyPromoCode: () => {} });

  const totalNormalPrice = subtotalNormalPrice + shipping - (isAmbassador ? 0 : discount);
  const totalEmbajadorPrice = subtotalEmbajadorPrice + shipping - (isAmbassador ? discount : 0);
      
        const formatPrice = (price: number) => {
          return `$ ${price.toFixed(2)}`;
        };

  return (
    <div className="space-y-4 max-w-full w-full mx-auto">
      {/* First Section - Order Summary */}
      <div className="bg-white rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Total del carrito</h2>
        
        {/* Promo Code Input */}
        <form onSubmit={handlePromoCodeSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Ingresa el código de Embajador"
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
        </form>

        {/* Price Breakdown */}
        <div className="space-y-4 mb-6">
          {validationMessage.type && (
            <div className={`p-4 mb-4 rounded border-l-4 ${
              validationMessage.type === 'success' 
                ? 'bg-green-50 border-green-400' 
                : 'bg-red-50 border-red-400'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {validationMessage.type === 'success' ? (
                    <FaCheckDouble className="w-6 h-6 text-green-400" />
                  ) : (
                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm text-black whitespace-pre-line">{validationMessage.text}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Subtotal:</span>
            {isAmbassador ? (
              <div className="flex items-center">
                <span className="text-gray-500 line-through mr-2">{formatPrice(subtotalNormalPrice)}</span>
                <span className="text-[var(--color-primary)] font-semibold">{formatPrice(subtotalEmbajadorPrice)}</span>
                <img src="img/payInfinity.svg" className="w-6 h-6 ml-1" />
              </div>
            ) : (
              <span className="text-gray-900 font-semibold">{formatPrice(subtotalNormalPrice)}</span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Envío:</span>
            <span className="text-gray-900 font-semibold">{formatPrice(shipping)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Descuento:</span>
            <span className="text-gray-900 font-semibold">{formatPrice(discount)}</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-[var(--color-primary)]">
              {isAmbassador ? (
                <div className="flex items-center">
                  <span className="text-gray-500 line-through text-lg mr-2">{formatPrice(totalNormalPrice + discount)}</span>
                  <span className="text-[var(--color-primary)]">{formatPrice(totalEmbajadorPrice)}</span>
                </div>
              ) : (
                formatPrice(totalNormalPrice)
              )}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          className="w-full bg-gradient-to-b from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <span>Continuar compra</span>
          <FaShoppingCart className="text-white" size={20} />
        </button>
      </div>

      {/* Second Section - Payment Methods */}
      <div className="bg-white rounded-3xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <RiLock2Line className="text-gray-400" size={20} />
          <span className="text-sm text-gray-500 font-medium">Pagos seguros con:</span>
        </div>
        
        <div className="w-full">
          <PaymentLogos />
        </div>
      </div>
    </div>
  );
};  
