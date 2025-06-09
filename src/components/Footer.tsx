import { FaceSmileIcon } from "@heroicons/react/24/solid";
import { LiaDotCircleSolid } from "react-icons/lia";
import { MdSend } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="py-25 bg-radial from-[var(--footer-bluedark)] from-2% to-black to-90%">
            <div className="max-w-full mx-10">

                {/* Columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col mx-18">
                        <img src="/img/health-logo-white.png" alt="" className="mb-8" />
                        <p className="text-sm text-white">
                            Lorem ipsum aliquet laoreet mi adipiscing lectus aliquam tortor sit posuere mauris sit sed vulputate consequat duis faucibus facilisis tincidunt.
                        </p>
                    </div>
                    <div className="pl-18">
                        <h2 className="text-lg text-white font-semibold mb-2 ">Productos</h2>
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
                    <div className="pl-10">
                        <h2 className="text-lg text-white font-semibold mb-2">Servicios</h2>
                        <ul className="space-y-2 ">
                            <li className="flex items-center gap-2"><MdSend className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Calculador de Macros</a></li>
                            <li className="flex items-center gap-2"><MdSend className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Biblioteca de entrenamiento</a></li>
                            <li className="flex items-center gap-2"><MdSend className="h-4 w-4 text-[var(--color-primary)]" /> <a href="#" className="text-white">Academia de Nutrición</a></li>
                        </ul>
                    </div>
                    <div className="pl-15">
                        <h2 className="text-lg text-white font-semibold mb-2">Contacto</h2>
                        <ul className="space-y-2 ">
                            <li className="text-white">+ 51 999 999 999</li>
                            <li className="text-white">Hola@infinityhealth.fit</li>
                            <div className="flex items-center gap-2">
                                <a href="https://www.instagram.com/infinityhealth.fit/"><FaInstagram className="h-8 w-8 text-[var(--color-primary)]" /></a>
                                <a href="#"><FaFacebook className="h-8 w-8 text-[var(--color-primary)]" /></a>
                                <a href="#"><FaTwitter className="h-8 w-8 text-[var(--color-primary)]" /></a>
                            </div>
                        </ul>
                    </div>
                </div>

                <div className="gap-6 mx-45 pt-12">
                    <ul className="flex items-center justify-between text-white"> 
                        <li>Embajadores</li>
                        <li>Envíos</li>
                        <li>Soporte</li>
                        <li>Terminos y Condiciones</li>
                        <li>Política de Privacidad</li>
                    </ul>
                </div>

            </div>
            <div className="pt-12">
                    <h3 className="text-white text-center">Método de Pago</h3>
                    <div className="grid grid-cols-3">
                        <img src="/img/mujer.png" alt="" className="w-12 h-12" />
                        <img src="/img/mujer.png" alt="" className="w-12 h-12" />
                        <img src="/img/mujer.png" alt="" className="w-12 h-12" />
                    </div>
            </div>
            <div className="text-center text-white py-3 bg-[var(--color-gray)] bottom-0 w-full z-50 ">
                &copy; {new Date().getFullYear()} Todos los derechos reservados por Infinity Health.
            </div>
        </footer>
    );
}