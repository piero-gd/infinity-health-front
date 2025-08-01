import React from 'react';
import { useCartStore } from '../../cart/stores/useCartStore';

interface OrderSummaryProps {
  showItems?: boolean;
}

/**
 * Componente que muestra el resumen de la orden (productos, subtotal, envío, descuento, total)
 */
export const OrderSummary: React.FC<OrderSummaryProps> = ({ showItems = true }) => {
  const { items, subtotal, shipping, discount, total } = useCartStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Resumen de la Orden</h3>
      
      {showItems && items.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Productos</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded overflow-hidden mr-3">
                    <img 
                      src={item.images?.[0]?.image_url || '/img/product-placeholder.png'} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${parseFloat(item.price) * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2 border-t pt-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Descuento</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
