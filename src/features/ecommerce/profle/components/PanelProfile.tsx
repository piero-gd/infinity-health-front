import type { dataProfile } from "../type";
import { TbApps, TbShoppingCart } from "react-icons/tb";
import CardsPanel from "./CardsPanel";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";


interface PanelProfileProps {
    user: dataProfile;
    activeComponent: string;
    onCardClick: (component: string) => void;
}

export default function PanelProfile({ user, activeComponent, onCardClick }: PanelProfileProps) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-8 bg-slate-100 p-6 md:p-12 rounded-2xl mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center gap-2">
                        <TbApps size={28} className="text-gray-600" />
                        <h1 className="text-gray-600 text-2xl font-bold">Mi cuenta</h1>
                    </div>
                    {/* Mobile Shopping Cart Icon */}
                    <button 
                        className="md:hidden p-2 bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] rounded-full shadow-xl hover:shadow-lg transition-shadow"
                        aria-label="Carrito de compras"
                        onClick={() => navigate('/catalog')}
                    >
                        <MdLogout size={24} className="text-white" />
                    </button>
                </div>
                <h1 className="text-2xl font-bold text-gray-600">
                    Hola <span className="text-gray-800">{user.name}</span> 👋
                </h1>
            </div>
            <CardsPanel 
                activeComponent={activeComponent}
                onCardClick={(component) => {
                    if (component === 'logout') {
                        // Lógica para cerrar sesión
                        console.log('Cerrar sesión');
                        return;
                    }
                    onCardClick(component);
                }} 
            />
        </div>
    )
}