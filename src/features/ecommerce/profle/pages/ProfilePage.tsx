import PanelProfile from "../components/PanelProfile"
import { mockPanel } from "../data/mockPanel"

export default function ProfilePage() {
    return (
        <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen">
            <PanelProfile user={mockPanel} />   
        </div>
    )
}