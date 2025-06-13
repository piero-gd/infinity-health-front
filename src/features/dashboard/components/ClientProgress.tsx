import { RiProgress3Fill } from "react-icons/ri";

export default function ClientProgress() {
    return (
        <div className="flex flex-col">
            <div className="rounded-xl bg-white px-3 h-1/2  border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 px-4 py-4">
                <RiProgress3Fill className="w-6 h-6 text-primary"  />
                <h3>Progreso del cliente</h3>
                </div>
                <div className="px-4 mb-6">
                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl">
                        <span>Entrenamientos Completados</span>
                        <div className="w-1/2 h-2 bg-primary rounded-full"></div>
                        </div>
                </div>
            </div>

            <div className="grid grid-cols-2 h-1/2 gap-4 mt-4">
                <div className="rounded-xl bg-white px-3 border border-gray-100 shadow-sm p-2">
                    <h3>Entrenamiento Favorito </h3>
                    
                </div>

                <div className="rounded-xl bg-white px-3 border border-gray-100 shadow-sm p-2">
                    <h3>Conviértete en Embajador</h3>
                    
                </div>
            </div>
        </div>
    );
}