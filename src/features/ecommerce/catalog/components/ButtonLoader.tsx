import { RiLoaderLine } from "react-icons/ri";


export default function ButtonLoader() {
    return (
        <div>
            <button className="flex bg-gradient-to-t text-white shadow-lg from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] items-center gap-2 rounded-full px-4 py-2">Cargar Más <RiLoaderLine /></button>
        </div>
    )
}