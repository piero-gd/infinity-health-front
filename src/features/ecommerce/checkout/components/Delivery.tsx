import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import type { PlacesCalculationType } from "../types";
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { useCartStore } from '../../cart/stores/useCartStore';

const options: PlacesCalculationType[] = [
    { option: "lima", place: "Lima Metropolitana", days: "2-3 días hábiles", description: "Delivery a domicilio" },
    { option: "shalom", place: "Recoger en Agencia SHALOM", days: "4-5 días hábiles", description: "Entrega en agencia a nivel nacional" },
    { option: "capital", place: "Recoger en Sede Capital Infinity", days: "1 día hábil", description: "Nuestras sedes en Lima, Arequipa y Cusco" }
];

export default function Delivery() {
  const { setShippingAddress, shippingAddress } = useCheckoutStore();
  const { setFreeShipping } = useCartStore();
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(shippingAddress.deliveryOption || '');
  const [showLimaDetails, setShowLimaDetails] = useState(selectedDeliveryOption === 'lima');

  // Opciones para sedes
  const sedesInfinity = ["Lima", "Arequipa", "Cusco"];

  // Estados para selects 
  const [dropdowns, setDropdowns] = useState({
    sedeInfinity: false,
    departamento: false,
    agenciaShalom: false
  });
  const [selectedSedeInfinity, setSelectedSedeInfinity] = useState(
    // Inicializar con la sede guardada si la opción de envío es 'capital'
    shippingAddress.deliveryOption === 'capital' && shippingAddress.capitalBranch ? shippingAddress.capitalBranch : ""
  );

  // Refs para cerrar al hacer click fuera
  const sedeInfinityRef = useRef<HTMLDivElement>(null);
  const departamentoRef = useRef<HTMLDivElement>(null);
  const agenciaShalomRef = useRef<HTMLDivElement>(null);

  // Configurar envío gratuito si ya está seleccionada la opción Capital al cargar
  useEffect(() => {
    if (shippingAddress.deliveryOption === 'capital') {
      setFreeShipping(true);
    }
  }, [shippingAddress.deliveryOption, setFreeShipping]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Cerrar dropdown de sede infinity
      if (dropdowns.sedeInfinity && sedeInfinityRef.current && !sedeInfinityRef.current.contains(event.target as Node)) {
        setDropdowns(prev => ({ ...prev, sedeInfinity: false }));
      }
      
      // Cerrar dropdown de departamento
      if (dropdowns.departamento && departamentoRef.current && !departamentoRef.current.contains(event.target as Node)) {
        setDropdowns(prev => ({ ...prev, departamento: false }));
      }
      
      // Cerrar dropdown de agencia shalom
      if (dropdowns.agenciaShalom && agenciaShalomRef.current && !agenciaShalomRef.current.contains(event.target as Node)) {
        setDropdowns(prev => ({ ...prev, agenciaShalom: false }));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdowns.sedeInfinity, dropdowns.departamento, dropdowns.agenciaShalom]);

  const handleDeliveryOptionChange = (option: string) => {
    setSelectedDeliveryOption(option);
    
    // Configurar el envío gratuito según la opción seleccionada
    const isCapitalOption = option === 'capital';
    setFreeShipping(isCapitalOption);
    
    // Limpiar datos específicos dependiendo de la opción seleccionada
    if (option === 'lima') {
      setShowLimaDetails(true);
      setSelectedSedeInfinity("");  // Limpiar la sede al cambiar de opción
      
      // Actualizar el estado global
      setShippingAddress({
        ...shippingAddress,
        deliveryOption: option as 'lima' | 'shalom' | 'capital',
        method_shipping: 'envio_puerta', // Método de envío a puerta para Lima
        // Mantener los datos de Lima si ya existen
        // Limpiar campos específicos de otras opciones
        shalomDepartment: '',
        shalomAgency: '',
        capitalBranch: ''
      });
    } else if (option === 'shalom') {
      setShowLimaDetails(false);
      setSelectedSedeInfinity(""); // Limpiar la sede al cambiar de opción
      
      // Actualizar el estado global
      setShippingAddress({
        ...shippingAddress,
        deliveryOption: option as 'lima' | 'shalom' | 'capital',
        method_shipping: 'recojo_shalom', // Método de recojo en Shalom
        // Mantener los datos de Shalom si ya existen
        // Limpiar campos específicos de otras opciones
        address: '', // Limpiar dirección de Lima
        city: '',    // Limpiar ciudad de Lima
        state: '',   // Limpiar estado de Lima
        capitalBranch: '' // Limpiar sede de Capital
      });
    } else if (option === 'capital') {
      setShowLimaDetails(false);
      
      // Actualizar el estado global
      setShippingAddress({
        ...shippingAddress,
        deliveryOption: option as 'lima' | 'shalom' | 'capital',
        method_shipping: 'recojo_oficina', // Método de recojo en oficina para Capital
        // Limpiar campos específicos de otras opciones
        address: '', // Limpiar dirección de Lima
        city: '',    // Limpiar ciudad de Lima
        state: '',   // Limpiar estado de Lima
        shalomDepartment: '', // Limpiar departamento Shalom
        shalomAgency: ''      // Limpiar agencia Shalom
      });
    }
    
    // Para fines de debugging
    console.log('Opción de entrega seleccionada:', option, 'Envío gratuito:', isCapitalOption);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl">
      {/* Sección Opciones de Envío */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">Opciones de Envío</h2>
        <div className="mb-4">
          <span className="text-sm text-gray-600 underline">Perú</span>
        </div>
        
        <div className="space-y-4">
          {/* Lima Metropolitana */}
          <div className={`border ${selectedDeliveryOption === 'lima' ? 'border-[var(--color-primary)]' : 'border-gray-200'} rounded-2xl p-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
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
                        <div className="block text-sm text-gray-600 mb-1 text-left">Departamento</div>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          onChange={(e) => {
                            setShippingAddress({
                              ...shippingAddress,
                              state: e.target.value
                            });
                            console.log('Departamento seleccionado:', e.target.value);
                          }}
                          value={shippingAddress.state || ''}
                        >
                          <option value="">Seleccionar</option>
                          <option value="lima">Lima</option>
                        </select>
                      </div>
                      <div>
                        <div className="block text-sm text-gray-600 mb-1 text-left">Provincia</div>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          onChange={(e) => {
                            setShippingAddress({
                              ...shippingAddress,
                              city: e.target.value
                            });
                            console.log('Provincia seleccionada:', e.target.value);
                          }}
                          value={shippingAddress.city || ''}
                        >
                          <option value="">Seleccionar</option>
                          <option value="lima">Lima</option>
                        </select>
                      </div>
                      <div>
                        <div className="block text-sm text-gray-600 mb-1 text-left">Zona de Lima Metropolitana</div>
                        <div className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm bg-gray-50 text-gray-400 cursor-not-allowed text-left">
                          (Las zonas se cargarán automáticamente)
                        </div>
                      </div>
                    </div>

                    {/* Dirección completa */}
                    <div>
                      <div className="block text-sm text-gray-600 mb-1 text-left">Dirección completa</div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                          setShippingAddress({
                            ...shippingAddress,
                            address: e.target.value
                          });
                          console.log('Dirección actualizada:', e.target.value);
                        }}
                        value={shippingAddress.address || ''}
                      />
                    </div>

                    {/* Apartamento, Casa, etc */}
                    <div>
                      <div className="block text-sm text-gray-600 mb-1 text-left">Apartamento, Casa, etc</div>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* El teléfono de contacto se captura en los datos de facturación */}
                    
                    {/* Referencia */}
                    <div>
                      <div className="block text-sm text-gray-600 mb-1 text-left">Referencia ( Opcional )</div>
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
            <div className={`border ${selectedDeliveryOption === 'shalom' ? 'border-[var(--color-primary)]' : 'border-gray-200'} rounded-2xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
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
              
              <div className="ml-8 space-y-4">
                {/* Grid de dos columnas para departamento y agencia */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Primer nivel de selección: Departamento con formato dropdown */}
                  <div className="relative" ref={departamentoRef}>
                    <div className="block text-sm text-gray-600 mb-1 text-left">Departamento <span className="text-red-500">*</span></div>
                    <button
                      type="button"
                      onClick={() => setDropdowns(prev => ({ ...prev, departamento: !prev.departamento }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white text-left flex items-center justify-between"
                    >
                      <span className={shippingAddress.shalomDepartment ? "text-gray-900 ml-2" : "text-gray-500 ml-2"}>
                        {shippingAddress.shalomDepartment ? shippingAddress.shalomDepartment.charAt(0).toUpperCase() + shippingAddress.shalomDepartment.slice(1) : "Seleccionar departamento"}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdowns.departamento ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {dropdowns.departamento && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-3xl shadow-lg max-h-60 overflow-y-auto">
                        <button
                          type="button"
                          onClick={() => { 
                            setShippingAddress({
                              ...shippingAddress,
                              shalomDepartment: 'amazonas',
                              shalomAgency: ''
                            });
                            setDropdowns(prev => ({ ...prev, departamento: false }));
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          Amazonas
                        </button>
                        <button
                          type="button"
                          onClick={() => { 
                            setShippingAddress({
                              ...shippingAddress,
                              shalomDepartment: 'ancash',
                              shalomAgency: ''
                            });
                            setDropdowns(prev => ({ ...prev, departamento: false }));
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          Áncash
                        </button>
                        <button
                          type="button"
                          onClick={() => { 
                            setShippingAddress({
                              ...shippingAddress,
                              shalomDepartment: 'apurimac',
                              shalomAgency: ''
                            });
                            setDropdowns(prev => ({ ...prev, departamento: false }));
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          Apurímac
                        </button>
                        <button
                          type="button"
                          onClick={() => { 
                            setShippingAddress({
                              ...shippingAddress,
                              shalomDepartment: 'arequipa',
                              shalomAgency: ''
                            });
                            setDropdowns(prev => ({ ...prev, departamento: false }));
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          Arequipa
                        </button>
                        <button
                          type="button"
                          onClick={() => { 
                            setShippingAddress({
                              ...shippingAddress,
                              shalomDepartment: 'lima',
                              shalomAgency: ''
                            });
                            setDropdowns(prev => ({ ...prev, departamento: false }));
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          Lima
                        </button>
                        <button
                          type="button"
                          onClick={() => { 
                            setShippingAddress({
                              ...shippingAddress,
                              shalomDepartment: 'cusco',
                              shalomAgency: ''
                            });
                            setDropdowns(prev => ({ ...prev, departamento: false }));
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                        >
                          Cusco
                        </button>
                        {/* Simplificado a algunos departamentos principales para el ejemplo */}
                      </div>
                    )}
                  </div>
                  
                  {/* Segundo nivel de selección: Agencia específica (siempre visible) */}
                  <div className="relative" ref={agenciaShalomRef}>
                    <div className="block text-sm text-gray-600 mb-1 text-left">Agencia Shalom <span className="text-red-500">*</span></div>
                    <button
                      type="button"
                      onClick={() => {
                        // Solo permitir clic si hay un departamento seleccionado
                        if (shippingAddress.shalomDepartment) {
                          setDropdowns(prev => ({ ...prev, agenciaShalom: !prev.agenciaShalom }));
                        }
                      }}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all flex items-center justify-between ${shippingAddress.shalomDepartment ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
                    >
                      <span className={shippingAddress.shalomAgency ? "text-gray-900 ml-2" : `text-gray-500 ml-2 ${!shippingAddress.shalomDepartment ? 'opacity-70' : ''}`}>
                        {shippingAddress.shalomAgency ? 
                          (shippingAddress.shalomAgency.includes('_') ? 
                            shippingAddress.shalomAgency.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 
                            shippingAddress.shalomAgency) : 
                          (shippingAddress.shalomDepartment ? "Seleccionar agencia" : "Seleccione un departamento primero")}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdowns.agenciaShalom ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {dropdowns.agenciaShalom && shippingAddress.shalomDepartment && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-3xl shadow-lg">
                          {/* Ejemplo de agencias para Lima */}
                          {shippingAddress.shalomDepartment === 'lima' && (
                            <>
                              <button
                                type="button"
                                onClick={() => { 
                                  setShippingAddress({
                                    ...shippingAddress,
                                    shalomAgency: 'lima_centro'
                                  });
                                  setDropdowns(prev => ({ ...prev, agenciaShalom: false }));
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-3xl"
                              >
                                Agencia Lima Centro
                              </button>
                              <button
                                type="button"
                                onClick={() => { 
                                  setShippingAddress({
                                    ...shippingAddress,
                                    shalomAgency: 'lima_norte'
                                  });
                                  setDropdowns(prev => ({ ...prev, agenciaShalom: false }));
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                              >
                                Agencia Lima Norte
                              </button>
                              <button
                                type="button"
                                onClick={() => { 
                                  setShippingAddress({
                                    ...shippingAddress,
                                    shalomAgency: 'lima_sur'
                                  });
                                  setDropdowns(prev => ({ ...prev, agenciaShalom: false }));
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors last:rounded-b-3xl"
                              >
                                Agencia Lima Sur
                              </button>
                            </>
                          )}
                          
                          {/* Para los demás departamentos, mostramos una agencia genérica por ahora */}
                          {shippingAddress.shalomDepartment !== 'lima' && (
                            <button
                              type="button"
                              onClick={() => { 
                                setShippingAddress({
                                  ...shippingAddress,
                                  shalomAgency: `${shippingAddress.shalomDepartment}_principal`
                                });
                                setDropdowns(prev => ({ ...prev, agenciaShalom: false }));
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-3xl"
                            >
                              Agencia Principal {shippingAddress.shalomDepartment.charAt(0).toUpperCase() + shippingAddress.shalomDepartment.slice(1)}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                </div>
              </div>
            </div>

            {/* Sede Capital Infinity */}
            <div className={`border ${selectedDeliveryOption === 'capital' ? 'border-[var(--color-primary)]' : 'border-gray-200'} rounded-2xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
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
              
              <div className="ml-8 space-y-4">
                <div className="relative" ref={sedeInfinityRef}>
                  <div className="block text-sm text-gray-600 mb-1 text-left">Seleccionar sede <span className="text-red-500">*</span></div>
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-primary)] w-4 h-4" />
                  <button
                    type="button"
                    onClick={() => setDropdowns(prev => ({ ...prev, sedeInfinity: !prev.sedeInfinity }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white text-left flex items-center justify-between"
                  >
                    <span className={selectedSedeInfinity ? "text-gray-900 ml-2" : "text-gray-500 ml-2"}>
                      {selectedSedeInfinity || "Selecciona una sede"}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdowns.sedeInfinity ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdowns.sedeInfinity && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-3xl shadow-lg">
                      {sedesInfinity.map((sede) => (
                        <button
                          key={sede}
                          type="button"
                          onClick={() => { 
                            setSelectedSedeInfinity(sede); 
                            setDropdowns(prev => ({ ...prev, sedeInfinity: false })); 
                            // Actualizar el estado global con la sede seleccionada
                            setShippingAddress({
                              ...shippingAddress,
                              capitalBranch: sede,
                              // Para la API, usamos capitalBranch como city en recojo_oficina
                              city: sede
                            });
                            // Para fines de debugging
                            console.log('Sede seleccionada:', sede);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-3xl last:rounded-b-3xl transition-colors"
                        >
                          <span className="ml-2 text-gray-500 text-sm">{sede}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* No necesitamos campo de teléfono aquí ya que se captura en los datos de facturación */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}