import { useState, useRef, useEffect } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";
import type { PlacesCalculationType } from "../types";

const options: PlacesCalculationType[] = [
    { option: "lima", place: "Lima Metropolitana", days: "2-3 días hábiles", description: "Delivery a domicilio" },
    { option: "shalom", place: "Recoger en Agencia SHALOM", days: "4-5 días hábiles", description: "Entrega en agencia a nivel nacional" },
    { option: "capital", place: "Recoger en Sede Capital Infinity", days: "1 día hábil", description: "Nuestras sedes en Lima, Arequipa y Cusco" }
];

export default function Delivery() {
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
  const [showLimaDetails, setShowLimaDetails] = useState(false);

  // Opciones para sedes
  const sedesInfinity = ["Lima", "Arequipa", "Cusco"];

  // Estados para selects custom
  const [dropdowns, setDropdowns] = useState({
    sedeInfinity: false,
  });
  const [selectedSedeInfinity, setSelectedSedeInfinity] = useState("");

  // Refs para cerrar al hacer click fuera
  const sedeInfinityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdowns.sedeInfinity && sedeInfinityRef.current && !sedeInfinityRef.current.contains(event.target as Node)) {
        setDropdowns(prev => ({ ...prev, sedeInfinity: false }));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdowns.sedeInfinity]);

  const handleDeliveryOptionChange = (option: string) => {
    setSelectedDeliveryOption(option);
    if (option === 'lima') {
      setShowLimaDetails(true);
    } else {
      setShowLimaDetails(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl">
      {/* Sección Delivery / Entrega */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Delivery / Entrega</h3>
        <div className="mb-4">
          <span className="text-sm text-gray-600 underline">Perú</span>
        </div>
        
        <div className="space-y-4">
          {/* Lima Metropolitana */}
          <div className="border border-[var(--color-primary)] rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="lima-metro"
                  className="w-5 h-5 text-blue-600 accent-[var(--color-primary)] border-2 border-gray-300 rounded focus:ring-blue-500"
                  checked={selectedDeliveryOption === 'lima'}
                  onChange={() => handleDeliveryOptionChange('lima')}
                />
                <div>
                  <label htmlFor="lima-metro" className="font-medium text-gray-900 cursor-pointer">
                    {options[0].place}
                  </label>
                  <p className="text-sm text-gray-400 mt-1 mr-5">{options[0].description}</p>
                </div>
              </div>
              <span className="text-sm text-gray-600">{options[0].days}</span>
            </div>

            {/* Panel que se despliega debajo de Lima Metropolitana */}
            <div className={`transition-all duration-500 overflow-hidden ${showLimaDetails ? 'max-h-screen opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
              <div >
                <div className="bg-white p-2 ">
                  
                  {/* Campos de dirección */}
                  <div className="space-y-4">
                    {/* Selects de ubicación */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <div className="block text-sm text-gray-600 mb-1">Departamento</div>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                          <option value="">Seleccionar</option>
                        </select>
                      </div>
                      <div>
                        <div className="block text-sm text-gray-600 mb-1">Provincia</div>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                          <option value="">Seleccionar</option>
                        </select>
                      </div>
                      <div>
                        <div className="block text-sm text-gray-600 mb-1">Zona de Lima Metropolitana</div>
                        <div className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm bg-gray-50 text-gray-400 cursor-not-allowed text-left">
                          (Las zonas se cargarán automáticamente)
                        </div>
                      </div>
                    </div>

                    {/* Dirección completa */}
                    <div>
                      <div className="block text-sm text-gray-600 mb-1">Dirección completa</div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Apartamento, Casa, etc */}
                    <div>
                      <div className="block text-sm text-gray-600 mb-1">Apartamento, Casa, etc</div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Referencia */}
                    <div>
                      <div className="block text-sm text-gray-600 mb-1">Referencia ( Opcional )</div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Agencia SHALOM */}
            <div className="border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="agencia-shalom"
                    className="w-5 h-5 text-blue-600 accent-[var(--color-primary)] border-2 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedDeliveryOption === 'shalom'}
                    onChange={() => handleDeliveryOptionChange('shalom')}
                  />
                  <div>
                    
                    <label htmlFor="agencia-shalom" className="mr-10 font-medium text-gray-900 cursor-pointer">
                      {options[1].place}
                    </label>
                    <p className="text-sm text-gray-400 mt-1 mr-5">{options[1].description}</p>
                    
                  </div>
                </div>
                <span className="text-sm text-gray-600">{options[1].days}</span>
              </div>
              
              <div className="ml-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-primary)] w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Ingresa la calle, Ciudad o Distrito"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
            </div>

            {/* Sede Capital Infinity */}
            <div className="border border-gray-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="sede-capital"
                    className="w-5 h-5 text-blue-600 accent-[var(--color-primary)] border-2 border-gray-400 rounded focus:ring-[var(--color-primary)]"
                    checked={selectedDeliveryOption === 'capital'}
                    onChange={() => handleDeliveryOptionChange('capital')}
                  />
                  <div>
                    <label htmlFor="sede-capital" className="mr-15 font-mediumm text-gray-900 cursor-pointer">
                        {options[2].place}
                    </label>
                    <p className="text-sm text-gray-400 mt-1 mr-5">{options[2].description}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">{options[2].days}</span>
              </div>
              
              <div className="ml-8">
                <div className="relative" ref={sedeInfinityRef}>
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-primary)] w-4 h-4" />
                  <button
                    type="button"
                    onClick={() => setDropdowns(prev => ({ ...prev, sedeInfinity: !prev.sedeInfinity }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white text-left flex items-center justify-between"
                  >
                    <span className={selectedSedeInfinity ? "text-gray-900 ml-2" : "text-gray-500 ml-2"}>
                      {selectedSedeInfinity || "Sedes"}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdowns.sedeInfinity ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdowns.sedeInfinity && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-3xl shadow-lg">
                      {sedesInfinity.map((sede) => (
                        <button
                          key={sede}
                          type="button"
                          onClick={() => { setSelectedSedeInfinity(sede); setDropdowns(prev => ({ ...prev, sedeInfinity: false })); }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-3xl last:rounded-b-3xl transition-colors"
                        >
                          <span className="ml-2 text-gray-500 text-sm">{sede}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}