import { LiaDotCircleSolid } from "react-icons/lia";
import { MdSend } from "react-icons/md";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";


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
                            className="mb-6 w-40 h-auto md:w-48 lg:w-56" 
                        />
                        <p className="text-sm text-white">
                            Lorem ipsum aliquet laoreet mi adipiscing lectus aliquam tortor sit posuere mauris sit sed vulputate consequat duis faucibus facilisis tincidunt.
                        </p>
                    </div>
                    <div className="md:pl-4">
                        <h2 className="text-lg text-white font-semibold mb-4">Productos</h2>
                        <ul className="space-y-2 ">
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Antiestrés</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Bebida Refrescante</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Energizante Limón</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Café</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Capuchino</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Colágeno</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Detox</a></li>
                            <li className="flex items-center gap-2"><LiaDotCircleSolid className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Potenciador Masculino</a></li>
                        </ul>
                    </div>
                    <div className="md:pl-4">
                        <h2 className="text-lg text-white font-semibold mb-4">Servicios</h2>
                        <ul className="space-y-2 ">
                            <li className="flex items-center gap-2"><MdSend className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Calculador de Macros</a></li>
                            <li className="flex items-center gap-2"><MdSend className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Biblioteca de entrenamiento</a></li>
                            <li className="flex items-center gap-2"><MdSend className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Academia de Nutrición</a></li>
                        </ul>
                    </div>
                    <div className="md:pl-4">
                        <h2 className="text-lg text-white font-semibold mb-4">Contacto</h2>
                        <ul className="space-y-2 ">
                            <li className="text-white">+ 51 999 999 999</li>
                            <li className="text-white">Hola@infinityhealth.fit</li>
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
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Embajadores</a></li>
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Envíos</a></li>
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Soporte</a></li>
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Términos y Condiciones</a></li>
                        <li className="hover:text-[var(--color-primary)] transition-colors"><a href="#">Política de Privacidad</a></li>
                    </ul>
                </div>

            </div>
            <div className="pt-12 pb-12">
                <h3 className="text-white text-center mb-4">Método de Pago</h3>
                <div className="flex justify-center gap-6">
                    <img src="/img/mujer.png" alt="Payment method 1" className="w-12 h-12" />
                    <img src="/img/mujer.png" alt="Payment method 2" className="w-12 h-12" />
                    <img src="/img/mujer.png" alt="Payment method 3" className="w-12 h-12" />
                </div>
            </div>
            <div className="mt-auto">
                <div className="text-center text-white py-3 bg-gray-300/20 w-full text-xs sm:text-sm">
                    &copy; {new Date().getFullYear()} Todos los derechos reservados por Infinity Health.
                </div>
            </div>
        </footer>
    );
}