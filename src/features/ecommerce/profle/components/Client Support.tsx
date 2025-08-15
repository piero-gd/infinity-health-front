import { IoMail } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiBuildingOffice } from "react-icons/hi2";
import { MdOutlineWatchLater } from "react-icons/md";


export default function ClientSupport() {
    const contactInfo = [
        { 
            icon: <IoMail/>, 
            title: 'Correo Electrónico', 
            value: 'soporte@infinityhealth.com',
            action: 'mailto:soporte@infinityhealth.com'
        },
        { 
            icon: <IoLogoWhatsapp/>, 
            title: 'WhatsApp', 
            value: '+1 234 567 8900',
            action: 'https://wa.me/12345678900'
        },
        { 
            icon: <HiBuildingOffice/>, 
            title: 'Oficina Principal', 
            value: 'Av. Circunvalación 123, Lima, Perú',
            action: 'https://maps.google.com'
        },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto  py-8 xl:mb-12 mb-6">
            <div className="relative">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Contact Info */}
                    <div className="lg:w-1/2 space-y-6 xl:px-0 px-6">
                        <div>
                            <div className="inline-block bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                Soporte de Lunes a Viernes
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                Soporte al <span className="text-[var(--color-primary)]">Cliente</span>
                            </h2>
                            <p className="text-gray-600">
                                Estamos aquí para ayudarte con cualquier consulta o problema que puedas tener. Nuestro equipo de soporte está listo para atenderte a través de nuestros canales de contacto.
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="bg-blue-50 p-3 rounded-full mr-4 text-[var(--color-primary)]">
                                        <span className="text-xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-600 text-sm">{item.title}</h3>
                                        <a 
                                            href={item.action} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-[var(--color-primary)] hover:underline text-base font-medium"
                                        >
                                            {item.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Right Column - Office Hours */}
                    <div className="lg:w-1/2">
                        <div className="bg-white p-6 rounded-2xl shadow-xl">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Horario de Atención</h2>
                            <div className="space-y-3">
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <MdOutlineWatchLater className="h-6 w-6 text-[var(--color-primary)] mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-800">Lunes a Viernes</p>
                                        <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <MdOutlineWatchLater className="h-6 w-6 text-[var(--color-primary)] mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-800">Sábados</p>
                                        <p className="text-gray-600">9:00 AM - 1:00 PM</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Horario de Perú (GMT-5)</p>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">¿Necesitas ayuda?</h3>
                                <p className="text-gray-600 mb-4">
                                    Nuestro equipo está listo para atenderte. No dudes en contactarnos a través de cualquiera de nuestros canales de atención.
                                </p>
                                <button className="bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md">
                                    Enviar Mensaje
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}