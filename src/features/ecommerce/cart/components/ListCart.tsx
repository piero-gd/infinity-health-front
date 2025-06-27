import { FaShoppingCart } from 'react-icons/fa';
import type { ListCartProps } from '../types';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function ListCart({
    items,
    onUpdateQuantity,
    onRemoveItem,
    className = ''
  }: ListCartProps) {
    const formatPrice = (price: number) => {
      return `$${price.toFixed(2)}`;
    };
  
    const calculateSubtotal = (price: number, quantity: number) => {
      return price * quantity;
    };
  
    const handleQuantityChange = (id: string, newQuantity: number) => {
      if (newQuantity < 1) return;
      onUpdateQuantity(id, newQuantity);
    };
  
    return (
    <div className={`w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 md:mb-8">Tu carrito</h2>
      
      {/* Header - Solo visible en desktop */}
      <div className="hidden xl:grid xl:grid-cols-5 gap-4 pb-4 mb-6 border-b border-gray-200">
        <div className="col-span-2">
          <span className="text-sm font-medium text-gray-600">Producto</span>
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-gray-600">Cantidad</span>
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-gray-600">Precio Unidad</span>
        </div>
        <div className="text-center">
          <span className="text-sm font-medium text-gray-600">Subtotal</span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="xl:grid xl:grid-cols-5 xl:gap-4 xl:items-center xl:py-4 xl:border-b xl:border-gray-100 
                                         bg-white rounded-2xl border border-gray-200 p-4 xl:p-0 xl:bg-transparent xl:border-0 xl:rounded-none">
            
            {/* Mobile Layout */}
            <div className="xl:hidden flex gap-4">
              {/* Product Image Mobile */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={item.imagenes[0]}
                  alt={item.nombre}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info and Controls Mobile */}
              <div className="flex-1 min-w-0">
                {/* Header with name and delete button */}
                <div className="flex justify-between items-start mb-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 text-lg">{item.nombre}</h4>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2 flex-shrink-0"
                    title="Eliminar producto"
                  >
                    <RiDeleteBinLine className="w-5 h-5" />
                  </button>
                </div>

                {/* Price and Quantity Info Mobile */}
                <div className="space-y-2 ">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Precio Unidad</span>
                    <span className="font-medium text-gray-900">{formatPrice(item.precio)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-t mt-2 border-gray-200">
                    <span className="text-sm text-gray-600 mt-2">Cantidad</span>
                    <div className="flex items-center border border-gray-300 rounded-full mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.cantidad - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-full transition-colors text-sm"
                        disabled={item.cantidad <= 1}
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-medium">
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.cantidad + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-full transition-colors text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {formatPrice(calculateSubtotal(item.precio, item.cantidad))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Hidden on mobile */}
            <div className="hidden xl:contents">
              {/* Product Info Desktop */}
              <div className="col-span-2 flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.imagenes[0]}
                    alt={item.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.nombre}</h4>
                  <p className="text-sm text-gray-500">{item.categoria}</p>
                </div>
              </div>

              {/* Quantity Controls Desktop */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors mr-4"
                  title="Eliminar producto"
                >
                  <RiDeleteBinLine className="w-6 h-6" />
                </button>
                
                <div className="flex items-center border border-gray-300 rounded-full">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.cantidad - 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-full transition-colors"
                    disabled={item.cantidad <= 1}
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-sm font-medium">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.cantidad + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-full transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Unit Price Desktop */}
              <div className="text-center">
                <span className="text-sm text-gray-900">{formatPrice(item.precio)}</span>
              </div>

              {/* Subtotal Desktop */}
              <div className="text-center">
                <span className="font-medium text-gray-900">
                  {formatPrice(calculateSubtotal(item.precio, item.cantidad))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Cart Message */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-300 flex items-center justify-center">
           <FaShoppingCart className="text-gray-400" size={50} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Tu carrito está vacío</h3>
          <p className="text-gray-500">Agrega algunos productos para comenzar</p>
        </div>
      )}
    </div>
  );
};