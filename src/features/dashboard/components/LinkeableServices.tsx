import { mockLinkableServices } from '../data/mockLinkeableServices';
import type { Service } from '../types';
import TemporalProductCard from './TemporalProductCard';

interface LinkeableServicesProps {
  services?: Service[];
}

export default function LinkeableServices({ services = mockLinkableServices }: LinkeableServicesProps) {
  return (
    <div>

      {/* Sección productos de catálogo*/}
      <div className="bg-white pb-4">
        <div className="flex">
          <TemporalProductCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <a
            key={service.id}
            href={service.link}
            className="group bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              {/* Contenido */}
              <div className="space-y-2">
                <h3 className={`font-semibold hover:${service.textColor}`}>
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
              
              {/* Acción */}
              <div className={`flex items-center text-sm text-white font-medium ${service.bgColor} p-3 rounded-full `}>
                <span>Acceder</span>
                <svg 
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}