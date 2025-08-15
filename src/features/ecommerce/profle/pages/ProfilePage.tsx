import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PanelProfile from "../components/PanelProfile"
import { mockPanel } from "../data/mockPanel"
import CartProducts from "../components/CartProducts"
import PersonalInfo from "../components/PersonalInfo"
import AmbassadorPanel from "../components/AmbassadorPanel"
import ClientSupport from "../components/Client Support"

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
                return <ClientSupport />;
            case 'ambassador':
                  return <AmbassadorPanel />;
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