import { TbHeadset } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import { TbBolt } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { PiPackageLight } from "react-icons/pi";

const cardInfo = [
    {
        title: "Mis pedidos",
        icon: <PiPackageLight className="text-green-500 bg-green-50 p-2 rounded-full size-10" />
    },
    {
        title: "Datos personales",
        icon: <GoPerson className="text-violet-500 bg-violet-50 p-2 rounded-full size-10" />,
        isActive: true
    },
    {
        title: "Atención al cliente",
        icon: <TbHeadset className="text-orange-500 bg-orange-50 p-2 rounded-full size-10" />
    },
    {
        title: "Conviértete en embajador",
        icon: <TbBolt className="text-blue-500 bg-blue-50 p-2 rounded-full size-10" />
    },
    {
        title: "Salir",
        icon: <TbLogout className="text-gray-500 bg-gray-50 p-2 rounded-full size-10" />
    },
];
export default function CardsPanel() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cardInfo.map((card, index) => (
            <div
                key={index}
                className={`flex items-center justify-center gap-4 p-4 rounded-2xl shadow-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                    card.isActive
                        ? 'bg-gray-100 border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
            >
                <div className={`flex items-center gap-3 min-w-[120px]`}>
                    
                    <h4  className={`text-xs font-semibold leading-tight ${
                        card.isActive ? 'text-[var(--color-primary)]' : 'text-gray-700'
                    }`}>
                        {card.title}
                    </h4>
                    {card.icon}
                </div>
            </div>
        ))}
    </div>
    )
}