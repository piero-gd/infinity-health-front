import { RiLock2Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import PaymentLogos from "../../../../components/PaymentLogos";


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
        <div className="bg-gray-50 w-full">
            <div className="w-full max-auto md:max-w-full lg:max-w-md mx-auto space-y-6 pb-6">
                
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

                    {/* Ambassador Code */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ingresa un código de Embajador"
                                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Order */}
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
                            <h2 className="text-xl font-bold text-gray-900">Total</h2>
                            <span className="text-2xl font-semibold text-[var(--color-primary)]">
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

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl p-6 my-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <RiLock2Line className="text-gray-400" size={20} />
                        <span className="text-sm text-gray-500 font-medium">Pagos seguros con:</span>
                    </div>
                    
                    <div className="w-full">
                        <PaymentLogos />
                    </div>
                </div>
            </div>
        </div>
    );
}