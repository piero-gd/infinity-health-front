import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart() {
    const navigate = useNavigate();
    return (
        <div className="bg-white p-8 text-center">
            <div className="flex flex-col items-center justify-center py-12">
                <div className="p-4 rounded-full mb-4">
                    <img src="img/noAvailable.svg" alt="" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Aún no tienes pedidos</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                    Aún no has realizado ningún pedido. Cuando lo hagas, aparecerán aquí.
                </p>
                <button className="bg-gradient-to-t from-[var(--color-btn-gradient-bottom)]
                to-[var(--color-btn-gradient-top)] text-white px-6 py-2 rounded-full
                hover:bg-gradient-to-t hover:from-[var(--color-btn-gradient-top)]
                hover:to-[var(--color-btn-gradient-bottom)] transition-colors flex items-center gap-2 cursor-pointer"
                onClick={() => navigate('/products')}>
                    Empezar a comprar <ShoppingCart className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
