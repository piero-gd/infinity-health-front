import 'animate.css';

export default function Header() {
        return (
            <div className="relative bg-cover bg-no-repeat">
                <img src="img/COVER.png" className="w-full h-full" alt="Infinity Health Cover" />
                <div className="absolute top-2/4 left-1/5 transform -translate-x-1/2
                -translate-y-1/2  text-left ">
                    <h4 className="xl:text-4xl text-2xl font-medium
                    md:text-4xl text-white animate__animated animate__fadeInUp animate__delay-1s">Tienda</h4>
                    <h1 className="xl:text-5xl text-2xl font-bold md:text-4xl text-white
                    animate__animated animate__fadeInLeft animate__delay-2s">Infinity Health</h1>
                </div>
            </div>
        )
}