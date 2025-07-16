import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useCart } from '../hooks/useCart';

interface MiniCartProps {
  className?: string;
}

export const MiniCart: React.FC<MiniCartProps> = ({ className = '' }) => {
  const { 
    items, 
    itemCount,
    subtotal,
    subtotalEmbajador, 
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateCartQuantity
  } = useCart();
  
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  
  // Sincronizar con el estado del carrito principal
  useEffect(() => {
    setIsOpen(isCartOpen);
  }, [isCartOpen]);
  
  // Cerrar el carrito al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
        toggleCart();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleCart]);
  
  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };
  
  const handleToggleCart = () => {
    setIsOpen(!isOpen);
    toggleCart();
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* Botón del carrito */}
      <button 
        className="relative p-2 text-gray-700 hover:text-[var(--color-primary)]"
        onClick={handleToggleCart}
      >
        <FaShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      
      {/* Mini carrito desplegable */}
      {isOpen && (
        <div 
          ref={cartRef}
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50"
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium">Tu Carrito ({itemCount})</h3>
            <button 
              onClick={handleToggleCart}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          </div>
          
          <div className="max-h-64 overflow-y-auto py-2">
            {items.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Tu carrito está vacío
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="px-4 py-3 flex gap-3 border-b border-gray-100">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img 
                      src={item.images[0]?.image_url || ''} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                        Cant: {item.quantity}
                      </span>
                      <button 
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-bold text-[var(--color-primary)]">
                        {formatPrice(item.price_amb)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {items.length > 0 && (
            <>
              <div className="p-4 border-t border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Subtotal Embajador:</span>
                  <span className="font-medium text-[var(--color-primary)]">
                    ${subtotalEmbajador.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex flex-col gap-2">
                <Link 
                  to="/cart"
                  className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white py-2 px-4 rounded-full text-center text-sm font-medium"
                >
                  Ver carrito
                </Link>
                <button className="w-full border border-[var(--color-primary)] text-[var(--color-primary)] py-2 px-4 rounded-full text-sm font-medium">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
