import type { dataProfile } from "../type";
import { TbApps } from "react-icons/tb";
import CardsPanel from "./CardsPanel";

export default function PanelProfile({user}: {user: dataProfile}) {
    return (
        <div className="flex flex-col gap-8 bg-slate-100 p-12 rounded-2xl mb-8">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <TbApps size={28} className="text-gray-600" />
                    <h1 className="text-gray-600 text-2xl font-bold">Mi cuenta</h1>
                </div>
                <h1 className="text-2xl font-bold text-gray-600">Hola <span className="text-gray-800">{user.name}</span> 👋</h1>
            </div>
            <CardsPanel />
        </div>
    )
}