import React, { useState } from 'react';
import { RiLock2Line } from 'react-icons/ri';
import { FaShoppingCart } from 'react-icons/fa';
import { FaCheckDouble } from "react-icons/fa6";
import type { TotalCartProps } from '../types';
export default function TotalCart({
  subtotalNormalPrice,
  subtotalEmbajadorPrice,
  shipping,
  discount,
  onApplyPromoCode,
  onProceedToCheckout
}: TotalCartProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isAmbassador, setIsAmbassador] = useState(false);
  
  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EMBAJADOR') {
      setIsAmbassador(true);
    } else {
      setIsAmbassador(false);
      if (promoCode.trim()) {
        onApplyPromoCode(promoCode.trim());
      }
    }
  };

  const totalNormalPrice = subtotalNormalPrice + shipping - (isAmbassador ? 0 : discount);
  const totalEmbajadorPrice = subtotalEmbajadorPrice + shipping - (isAmbassador ? discount : 0);
      
        const formatPrice = (price: number) => {
          return `$ ${price.toFixed(2)}`;
        };
      
      
        const paymentMethods = [
          {
            name: 'Capital One',
            logo: (
              <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                C1
              </div>
            )
          },
          {
            name: 'WhatsApp Pay',
            logo: (
              <div className="w-12 h-8 bg-green-500 rounded flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/>
                </svg>
              </div>
            )
          },
          {
            name: 'Visa',
            logo: (
              <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xs">VISA</span>
              </div>
            )
          },
          {
            name: 'Mastercard',
            logo: (
              <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                <div className="flex">
                  <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1 opacity-80"></div>
                </div>
              </div>
            )
          },
          {
            name: 'American Express',
            logo: (
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">AE</span>
              </div>
            )
          },
          {
            name: 'Diners Club',
            logo: (
              <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-blue-600 rounded-full"></div>
              </div>
            )
          }
        ];

  return (
    <div className="space-y-4 max-w-2xl w-full mx-auto">
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
          {isAmbassador && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                <FaCheckDouble className="w-6 h-6 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-black">¡Código de Embajador aplicado!<br /> Precios especiales activados.</p>
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
            <span className="text-2xl font-bold text-blue-600">
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
          onClick={onProceedToCheckout}
          className="w-full bg-gradient-to-b from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <span>Proceder a pagar</span>
          <FaShoppingCart className="text-white" size={20} />
        </button>
      </div>

      {/* Second Section - Payment Methods */}
      <div className="bg-white rounded-3xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <RiLock2Line className="text-gray-400" size={20} />
          <span className="text-sm text-gray-500 font-medium">Pagos seguros con:</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 bg-white rounded border border-gray-200 hover:border-gray-300 transition-colors"
              title={method.name}
            >
              {method.logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};  
