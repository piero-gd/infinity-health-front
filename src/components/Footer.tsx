import { LiaDotCircleSolid } from "react-icons/lia";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { CiCalculator1 } from "react-icons/ci";
import { LiaDumbbellSolid } from "react-icons/lia";
import { TbApple } from "react-icons/tb";
import { GiOpenBook } from "react-icons/gi";


const logosoPedidos = [
    {
        src: "/img/icons/CAPIN.svg",
    },
    {
        src: "/img/icons/WHATSPA.svg",
    },
    {
        src: "/img/icons/visa-logo.svg",
    },
    {
        src: "/img/icons/Mastercard.svg",
    },
    {
        src: "/img/icons/american-eex.svg",
    },
    {
        src: "/img/icons/DinersClub.svg",
    },
]


export default function Footer() {
    return (
        <footer className="min-h-[70vh] flex flex-col bg-radial from-[var(--footer-bluedark)] from-2% to-black to-90% pt-16 pb-0">
            <div className="max-w-full mx-10">

                {/* Columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 lg:px-20">
                    <div className="flex flex-col">
                        <img 
                            src="/img/health-logo-white.png" 
                            alt="Infinity Health Logo" 
                            className="mb-6 mt-2 w-40 h-auto md:w-48 lg:w-56 " 
                        />
                        <p className="text-sm text-white">
Bienestar físico, libertad financiera y propósito, todo en un solo lugar. </p>
                    </div>
                    <div className="md:pl-4">
                        <h2 className="text-lg text-white font-semibold mb-4">Tienda</h2>
                        <ul className="space-y-2 ">
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Productos</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Merch Health</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Packs Health</a></li>
                        </ul>
                    </div>
                    <div className="md:pl-4">
                        <h2 className="text-lg text-white font-semibold mb-4">Servicios</h2>
                        <ul className="space-y-2 ">
                            <li className="flex items-center gap-2"><CiCalculator1 className="h-6 w-6 text-[var(--color-primary)]" /> <a href="#" className="text-white">Calculadora de Macros</a></li>
                            <li className="flex items-center gap-2"><LiaDumbbellSolid className="h-6 w-6 text-[var(--color-primary)]" /> <a href="#" className="text-white">Biblioteca de Entrenamiento</a></li>
                            <li className="flex items-center gap-2"><TbApple className="h-6 w-6 text-[var(--color-primary)]" /> <a href="#" className="text-white">Academia de Nutrición</a></li>
                        </ul>
                    </div>
                    <div className="md:pl-4">
                        <h2 className="text-lg text-white font-semibold mb-4">Contacto</h2>
                        <ul className="space-y-2 ">
                            <li className="text-white">+ 51 912 252 528</li>
                            <li className="text-white">info@infinityhealth.fit</li>
                            <div className="flex items-center gap-3 mt-2">
                               
                                <a href="https://www.facebook.com/infinityhealth.fit" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-[#1877F2] transition-colors">
                                    <FaFacebook className="h-5 w-5 text-white" />
                                </a>
                                <a href="https://www.youtube.com/@infinityhealth.fit" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-[#FF0000] transition-colors">
                                    <FaYoutube className="h-5 w-5 text-white" />
                                </a>
                                <a href="https://www.linkedin.com/company/infinityhealth-fit" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-[#0A66C2] transition-colors">
                                    <FaLinkedin className="h-5 w-5 text-white" />
                                </a>
                            </div>
                        </ul>
                    </div>
                  
                </div>

            

                <div className="pt-14 px-8 lg:px-40 w-full mt-4">
                    <ul className="flex flex-wrap justify-center md:justify-between gap-4 text-white text-sm md:text-base"> 
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Nosotros</a></li>
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Atención al Cliente</a></li>
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Términos y Condiciones</a></li>
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Envíos</a></li>
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Política de Privacidad</a></li>
                    </ul>
                    
                </div>

            </div>


 <div className="mx-auto">
                <div className="flex items-center gap-2 xl:px-40 mb-12 pt-12">
                <GiOpenBook className="h-12 w-12 text-white" />
                <span className="text-white">Libro de Reclamaciones</span>
            </div>
            </div>
        
            <div className="pb-12">
                <div className="flex justify-center xl:gap-5 gap-2 mx-auto">
                    {logosoPedidos.map((logo, index) => (
                        <div className="w-14 h-10 p-2 rounded-lg bg-white">
                        <img key={index} src={logo.src} className="w-full h-full p-0.6"/>
                        </div>
                    ))}
                </div>
            </div>

           


            <div className="mt-auto">
                <div className="text-center text-black py-3 bg-[var(--color-primary)] w-full text-xs sm:text-sm">
                    &copy; {new Date().getFullYear()} | Todos los derechos reservados por Infinity Health.
                </div>
            </div>
        </footer>
    );
}