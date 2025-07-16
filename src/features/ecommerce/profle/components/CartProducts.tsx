import { IoReload } from "react-icons/io5";
import type { JSX } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const ordersData = [
    {
        id: "00001",
        product: {
            name: "Aloex",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=center"
        },
        status: "Pendiente",
        icon: <IoReload size={20} />,
        total: "$5.00",
        date: "11/07/2025"
    },
    {
        id: "00002",
        product: {
            name: "Xgol",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop&crop=center"
        },
        status: "Completado",
        icon: <IoIosCheckmarkCircleOutline size={20} />,
        total: "$7.00",
        date: "10/07/2025"
    },
    {
        id: "00003",
        product: {
            name: "Potenciador Masculino",
            image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center"
        },
        status: "Completado",
        icon: <IoIosCheckmarkCircleOutline size={20} />,
        total: "$40.00",
        date: "06/07/2025"
    }
];

const StatusBadge = ({ status, icon }: { status: string; icon: JSX.Element }) => {
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pendiente':

                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'completado':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyle(status)}`}>
            {status}{icon}
        </div>
    );
};

export default function CartProducts() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Mis pedidos</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">N° de pedido</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Pedido</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Estado</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {ordersData.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                {/* Número de pedido */}
                                <td className="px-6 py-4">
                                    <span className="text-gray-600 font-medium">{order.id}</span>
                                </td>
                                
                                {/* Producto */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            <img 
                                                src={order.product.image} 
                                                alt={order.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-gray-800 font-medium">{order.product.name}</span>
                                    </div>
                                </td>
                                
                                {/* Estado */}
                                <td className="px-6 py-4">
                                    <StatusBadge status={order.status} icon={order.icon} />
                                </td>
                                
                                {/* Total */}
                                <td className="px-6 py-4">
                                    <span className="text-gray-800 font-semibold">{order.total}</span>
                                </td>
                                
                                {/* Fecha */}
                                <td className="px-6 py-4">
                                    <span className="text-gray-600">{order.date}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}