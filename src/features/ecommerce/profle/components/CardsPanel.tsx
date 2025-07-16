import { BsBoxSeam } from "react-icons/bs";
import { TbHeadset } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import { TbBolt } from "react-icons/tb";
import { GoPerson } from "react-icons/go";

const cardInfo = [
    {
        title: "Mis pedidos",
        icon: <BsBoxSeam className="text-green-500 bg-green-50 p-2 rounded-full size-8" />
    },
    {
        title: "Datos personales",
        icon: <GoPerson className="text-blue-500 bg-blue-50 p-2 rounded-full size-8" />,
        isActive: true
    },
    {
        title: "Atención al cliente",
        icon: <TbHeadset className="text-yellow-500 bg-yellow-50 p-2 rounded-full size-8" />
    },
    {
        title: "Conviértete en embajador",
        icon: <TbBolt className="text-blue-500 bg-blue-50 p-2 rounded-full size-8" />
    },
    {
        title: "Salir",
        icon: <TbLogout className="text-gray-500 bg-gray-50 p-2 rounded-full size-8" />
    },
];
export default function CardsPanel() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cardInfo.map((card, index) => (
            <div
                key={index}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md cursor-pointer ${
                    card.isActive
                        ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-300'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
            >
                <div className="flex-shrink-0">
                    {card.icon}
                </div>
                <h3 className={`text-sm font-medium text-center leading-tight ${
                    card.isActive ? 'text-blue-700' : 'text-gray-700'
                }`}>
                    {card.title}
                </h3>
            </div>
        ))}
    </div>
    )
}