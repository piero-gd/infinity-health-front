import type { dataProfile } from "../type";
import { TbApps } from "react-icons/tb";
import CardsPanel from "./CardsPanel";

export default function PanelProfile({user}: {user: dataProfile}) {
    return (
        <div className="flex flex-col gap-4 bg-slate-100 p-6 rounded-2xl mb-6">
            <div className="flex items-center gap-2">
                <TbApps size={20} className="text-gray-600" />
                <h1 className="text-gray-600 font-medium">Mi cuenta</h1>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Hola {user.name} 👋</h1>
            <CardsPanel />
        </div>
    )
}