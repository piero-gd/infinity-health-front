import { Headphones, LogOut, Zap, User, Package } from "lucide-react";
import { useAuthStore } from "../../../auth/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export type CardItemType = {
    id: string;
    title: string;
    icon: React.ReactNode;
    component: string;
};

const cardInfo: CardItemType[] = [
    {
        id: 'orders',
        title: "Mis pedidos",
        icon: <Package className="text-green-500 bg-green-50 p-2 rounded-full size-10" />,
        component: 'orders'
    },
    {
        id: 'profile',
        title: "Datos personales",
        icon: <User className="text-violet-500 bg-violet-50 p-2 rounded-full size-10" />,
        component: 'profile'
    },
    {
        id: 'support',
        title: "Atención al cliente",
        icon: <Headphones className="text-orange-500 bg-orange-50 p-2 rounded-full size-10" />,
        component: 'support'
    },
    {
        id: 'ambassador',
        title: "Conviértete en\nEmbajador",
        icon: <Zap className="text-blue-400 bg-blue-50 p-2 rounded-full size-10" />,
        component: 'ambassador'
    },
    {
        id: 'logout',
        title: "Salir",
        icon: <LogOut className="text-gray-500 bg-gray-50 p-2 rounded-full size-10" />,
        component: 'logout'
    },
];

interface CardsPanelProps {
    activeComponent: string;
    onCardClick: (component: string) => void;
}

export default function CardsPanel({ activeComponent, onCardClick }: CardsPanelProps) {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    const handleCardClick = (component: string) => {
        if (component === 'logout') {
            logout();
            navigate('/login');
            return;
        }
        onCardClick(component);
    };
    return (
        <div className="relative">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {cardInfo.map((card) => {
                    const isActive = activeComponent === card.component;
                    return (
                        <div key={card.id} onClick={() => handleCardClick(card.component)}>
                            <CardItem 
                                card={card} 
                                isActive={isActive} 
                            />
                        </div>
                    );
                })}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="md:hidden pb-2 -mx-4">
                <div className="flex gap-3 px-4 py-4 overflow-x-auto pb-4 scrollbar-hide">
                    {cardInfo.map((card) => {
                        const isActive = activeComponent === card.component;
                        return (
                            <div key={card.id} className="flex-shrink-0 w-44" onClick={() => handleCardClick(card.component)}>
                                <CardItem card={card} isActive={isActive} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const CardItem = ({ card, isActive }: { card: CardItemType, isActive: boolean }) => (
    <div
        className={`w-full h-24 flex items-center justify-between p-4 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md cursor-pointer ${
            isActive
                ? 'bg-gray-50 border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]'
                : 'bg-white border-gray-100 hover:border-gray-200'
        }`}>
        <h4 className={`text-sm font-medium leading-5 text-center flex-1 ${
            isActive ? 'text-[var(--color-primary)]' : 'text-gray-700'
        }`}>
            {card.title.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
            ))}
        </h4>
        <div className="flex-shrink-0 ml-3">
            {card.icon}
        </div>
    </div>
);