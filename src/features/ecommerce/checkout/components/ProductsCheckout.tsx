import { RiLock2Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";

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
    name: 'Visa',
    logo: (
      <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center">
        <span className="text-blue-600 font-bold text-xs">VISA</span>
      </div>
    )
  },
  {
    name: 'Mastercard Alt',
    logo: (
      <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
        <span className="text-white font-bold text-xs">MC</span>
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

const products = [
  {
    name: 'Aloex',
    price: 5.00,
    image: '🧴'
  },
  {
    name: 'Xgo!',
    price: 7.00,
    image: '🥤'
  },
  {
    name: 'Potenciador Masculino',
    price: 80.00,
    image: '💊'
  }
];

export default function ProductsCheckout() {
    const subtotal = products.reduce((sum, product) => sum + product.price, 0);
    const shipping = 5.00;
    const discount = 0.00;
    const total = subtotal + shipping - discount;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-md mx-auto space-y-6">
                
                {/* Main Checkout Card */}
                <div className="bg-white rounded-2xl p-6 ">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Tu Pedido</h2>
                    
                    {/* Product List */}
                    <div className="space-y-4 mb-6">
                        {products.map((product, index) => (
                            <div key={index} className="flex items-center space-x-6 pb-4 border-b border-gray-100 last:border-b-0">
                                {/* Product Image Placeholder */}
                                <div className="w-15 h-15 bg-gray-200 border border-gray-400 rounded-lg flex items-center justify-center text-xl">
                                    {product.image}
                                </div>
                                
                                {/* Product Info */}
                                <div className="flex-1">
                                    <h3 className="font-medium text-gray-900 text-left">{product.name}</h3>
                                </div>
                                
                                {/* Product Price */}
                                <div className="text-right">
                                    <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Ambassador Code Input */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ingresa un código de Embajador"
                                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Subtotal:</span>
                            <span className="text-gray-900 font-semibold">$ {subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Envío:</span>
                            <span className="text-gray-900 font-semibold">$ {shipping.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Descuento:</span>
                            <span className="text-gray-900 font-semibold">$ {discount.toFixed(2)}</span>
                        </div>
                        
                        <hr className="border-gray-200 my-4" />
                        
                        <div className="flex justify-between items-center border-b pb-4 text-gray-200">
                            <span className="text-xl font-bold text-gray-900">Total</span>
                            <span className="text-2xl font-bold text-[var(--color-primary)]">
                                $ {total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button className="w-full bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)]  hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl ">
                        <span>Continuar al pago</span>
                        <FaShoppingCart className="text-white" size={18} />
                    </button>
                </div>

                {/* Payment Methods Section */}
                <div className="bg-white rounded-2xl p-6 ">
                    <div className="flex items-center space-x-2 mb-4">
                        <RiLock2Line className="text-gray-400" size={20} />
                        <span className="text-sm text-gray-500 font-medium">Pagos seguros con:</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                        {paymentMethods.map((method, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                                title={method.name}
                            >
                                {method.logo}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}