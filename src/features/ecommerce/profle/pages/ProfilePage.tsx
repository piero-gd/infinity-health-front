import PanelProfile from "../components/PanelProfile"
import { mockPanel } from "../data/mockPanel"
import CartProducts from "../components/CartProducts"

export default function ProfilePage() {
    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <PanelProfile user={mockPanel} />   
            <CartProducts />
        </div>
    )
}