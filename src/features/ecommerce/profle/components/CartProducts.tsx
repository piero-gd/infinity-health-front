import { useCart } from '../hooks/useCart';
import EmptyCart from './EmptyCart';
import { IoReload, IoCheckmarkCircleOutline } from 'react-icons/io5';
import ExerciseLoader from '../../../../components/ExerciseLoader';

const StatusBadge = ({ status }: { status: string }) => {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Pendiente':
                return 'bg-gray-100 text-gray-700 border-2 border-gray-200';
            case 'Completado':
                return 'bg-blue-100 text-[var(--color-primary)] border-2 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-700 border-2 border-gray-200';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'Pendiente':
                return <IoReload className="ml-2" size={16} />;
            case 'Completado':
                return <IoCheckmarkCircleOutline className="ml-2 text-ok tr--color-primary)]" size={16} />;
            default:
                return null;
        }
    };

    return (
        <div className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(status)}`}>
            {status}
            {getStatusIcon()}
        </div>
    );
};

export default function CartProducts() {
    const { products, isLoading, error, isEmpty } = useCart();

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex items-center justify-center h-64">
                <ExerciseLoader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center">
                <p className="text-red-500">Error al cargar los pedidos. Intenta nuevamente más tarde.</p>
            </div>
        );
    }

    if (isEmpty) {
        return <EmptyCart />;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">Mis pedidos</h2>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">N° de pedido</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Pedido</th>
                            <th className="px-12 py-4 text-left text-sm font-semibold text-gray-600">Estado</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-gray-600 font-medium">{order.id}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-25 h-25 rounded-xl overflow-hidden bg-white border border-gray-400 p-2 flex-shrink-0">
                                            <img 
                                                src={order.product.image} 
                                                alt={order.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-gray-800 font-medium">{order.product.name}</span>
                                    </div>
                                </td>
                                <td className="px-12 py-4">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-600">{order.total}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-600">{order.date}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4 overflow-x-auto">
                <div className="flex space-x-4 pb-2" style={{ minWidth: `${products.length * 320}px` }}>
                    {products.map((order) => (
                        <div key={order.id} className="w-80 flex-shrink-0 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-sm text-gray-500">Pedido #</p>
                                    <p className="font-medium">{order.id}</p>
                                </div>
                                <StatusBadge status={order.status} />
                            </div>
                            
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 p-1 flex-shrink-0">
                                    <img 
                                        src={order.product.image} 
                                        alt={order.product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{order.product.name}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-medium">{order.total}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Fecha</p>
                                    <p className="text-sm text-gray-700">{order.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}