import { useCartStore } from '../../cart/stores/useCartStore';
import { useCheckoutStore } from '../stores/useCheckoutStore';

/**
 * Componente que muestra el resumen de la orden (productos, subtotal, envío, descuento, total)
 */
export const OrderSummary: React.FC = () => {
  // Obtener datos del carrito
  const { items, subtotal, subtotalEmbajador, shipping, discount } = useCartStore();
  
  // Estado del checkout
  const { referralCode } = useCheckoutStore();
  
  // Calcular total
  const isAmbassador = !!referralCode;
  const effectiveSubtotal = isAmbassador ? subtotalEmbajador : subtotal;
  const total = effectiveSubtotal + shipping - discount;

  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="font-semibold text-lg mb-4 text-gray-900">Tu Pedido</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Subtotal</span>
          <span className="text-gray-900 font-semibold">$ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Envío</span>
          <span className="text-gray-900 font-semibold">$ {shipping.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="font-medium text-green-600">Descuento</span>
            <span className="font-semibold text-green-600">-$ {discount.toFixed(2)}</span>
          </div>
        )}
        
        <hr className="border-gray-200 my-4" />
        <div className="flex justify-between items-center pb-4">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <span className="text-2xl font-semibold text-[var(--color-primary)]">$ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between cursor-pointer" 
             onClick={() => document.getElementById('productsList')?.classList.toggle('hidden')}>
          <h3 className="font-medium text-gray-800">Productos</h3>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div id="productsList" className="mt-4 hidden">
          {items.map(item => (
            <div key={item.id} className="mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {item.images?.[0]?.image_url && (
                    <img 
                      src={item.images[0].image_url} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>${parseFloat(item.price_amb || item.price).toFixed(2)} x {item.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
