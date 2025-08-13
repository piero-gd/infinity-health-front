export default function Header() {
        return (
            <div className="relative bg-cover bg-no-repeat">
                <img src="img/COVER.png" className="w-full h-full" />
                <h1 className="xl:text-6xl text-2xl font-black md:text-4xl md:top-30 text-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">Tienda </h1>
                <h1 className="xl:text-6xl text-2xl font-black md:text-4xl md:top-50 text-[var(--color-primary)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center underline">Infinity Health</h1>
            </div>
        )
}