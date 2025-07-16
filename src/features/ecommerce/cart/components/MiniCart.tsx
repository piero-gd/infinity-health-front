import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react';
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
    removeFromCart,
    updateCartQuantity
  } = useCart();
  
  return (
    <Popover className={`relative ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button className="relative p-2 text-gray-700 hover:text-[var(--color-primary)] focus:outline-none">
            <FaShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Popover.Button>
          
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
              {({ close }) => (
                <>
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h3 className="text-lg font-medium text-gray-800">Tu Carrito ({itemCount})</h3>
                    <button 
                      onClick={() => close()}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <IoMdClose className="w-5 h-5" />
                    </button>
                  </div>
          
                  <div className="max-h-96 overflow-y-auto py-2 bg-gray-50">
                    {items.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        Tu carrito está vacío
                      </div>
                    ) : (
                      items.map(item => (
                        <div key={item.id} className="px-4 py-3 flex gap-3 border-b border-gray-100 bg-white mx-3 my-2 rounded-xl shadow-sm">
                          <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden p-1">
                            <img 
                              src={item.images[0]?.image_url || ''} 
                              alt={item.name}
                              className="w-full h-full object-contain rounded-md"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h4 className="text-lg font-semibold line-clamp-1 text-gray-800">{item.name}</h4>
                              <button 
                                className="text-gray-400 hover:text-gray-600 ml-2 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromCart(item.id);
                                }}
                              >
                                <IoMdClose className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="mt-2">
                              <div className="text-sm text-gray-600">Precio Unidad</div>
                              <div className="font-medium text-gray-900">${parseFloat(item.price_amb).toFixed(2)}</div>
                            </div>
                            
                            <div className="flex justify-between items-end mt-2">
                              <div>
                                <div className="text-sm text-gray-600">Cantidad</div>
                                <div className="flex items-center border border-gray-300 rounded-lg mt-1">
                                  <button 
                                    className="px-2 py-1 text-gray-500 hover:text-gray-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (item.quantity > 1) {
                                        updateCartQuantity(item.id, item.quantity - 1);
                                      } else {
                                        removeFromCart(item.id);
                                      }
                                    }}
                                    disabled={item.quantity <= 1}
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <button 
                                    className="px-2 py-1 text-gray-500 hover:text-gray-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateCartQuantity(item.id, item.quantity + 1);
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              
                              <div>
                                <div className="text-sm text-gray-600">Subtotal</div>
                                <div className="font-semibold text-[var(--color-primary)]">
                                  ${(parseFloat(item.price_amb) * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {items.length > 0 && (
                    <>
                      <div className="bg-white px-5 py-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">Subtotal:</span>
                          <span className="font-bold text-xl text-[var(--color-primary)]">
                            $ {subtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5 flex flex-col gap-3 bg-white">
                        <Link 
                          to="/cart"
                          className="flex items-center justify-center w-full bg-white border border-[var(--color-primary)] text-[var(--color-primary)] py-3 px-6 rounded-full text-center font-medium gap-2"
                          onClick={() => close()}
                        >
                          Ver carrito
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12H16M16 12L12 8M16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                        <button 
                          className="w-full bg-gradient-to-b from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] text-white py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Lógica de checkout cuando esté implementada
                          }}
                        >
                          Proceder a pagar
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 9V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H15C16.1046 19 17 18.1046 17 17V15M21 12H7M7 12L11 16M7 12L11 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
