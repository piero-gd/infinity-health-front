import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PanelProfile from "../components/PanelProfile"
import { mockPanel } from "../data/mockPanel"
import CartProducts from "../components/CartProducts"
import PersonalInfo from "../components/PersonalInfo"

export default function ProfilePage() {
    const location = useLocation();
    const [activeComponent, setActiveComponent] = useState('profile');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const section = params.get('section');
        if (section && ['orders', 'profile', 'support', 'ambassador'].includes(section)) {
            setActiveComponent(section);
        }
    }, [location.search]);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'orders':
                return <CartProducts />;
            case 'profile':
                return <PersonalInfo user={mockPanel} />;
            case 'support':
                //otro componente en el futuro
                return <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Atención al Cliente</h2>
                    <p>Contenido de atención al cliente aquí...</p>
                </div>;
            case 'ambassador':
                //otro componente en el futuro
                return <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Conviértete en Embajador</h2>
                    <p>Información del programa de embajadores...</p>
                </div>;
            default:
                return <PersonalInfo user={mockPanel} />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <PanelProfile 
                user={mockPanel} 
                activeComponent={activeComponent}
                onCardClick={setActiveComponent}
            />   
            <div className="mt-6">
                {renderComponent()}
            </div>
        </div>
    )
}