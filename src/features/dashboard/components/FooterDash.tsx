import { LuMessageCircleQuestion } from "react-icons/lu";


export default function FooterDash() {
    return (
        <div className="w-full h-full">
            <footer>
                <div className="flex justify-between items-center mx-5 xl:mx-10 xl:px-10">
                    <span className="text-sm text-gray-400 font-base">© 2025 Infinity Health</span>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400 font-base">Soporte</span>
                        <LuMessageCircleQuestion className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                </div>
            </footer>
        </div>
    )
}
