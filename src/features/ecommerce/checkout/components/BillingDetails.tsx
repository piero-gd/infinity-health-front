import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { PaymentInfoType, DropdownType } from "../types";
import { useCheckoutStore } from "../stores/useCheckoutStore";

export default function BillingDetails() {
  // Usar el estado global para la información de contacto
  const { shippingAddress, setShippingAddress } = useCheckoutStore();

  const [formData, setFormData] = useState<PaymentInfoType>({
    nombre: shippingAddress.firstName || "",
    apellidos: shippingAddress.lastName || "",
    telefono: shippingAddress.phone || "",
    correo: shippingAddress.email || "",
    tipoComprobante: shippingAddress.invoiceType || "",
    tipoDocumento: shippingAddress.documentType || "",
    numeroDocumento: shippingAddress.documentNumber || "",
    ruc: shippingAddress.ruc || "",
    razonSocial: shippingAddress.companyName || "",
    tipoDocumentoEntrega: ""
  });

  const [dropdowns, setDropdowns] = useState<DropdownType>({
    tipoComprobante: false,
    tipoDocumento: false,
    tipoDocumentoEntrega: false
  });

  const tiposComprobante = [
    { value: "boleta", label: "Boleta" },
    { value: "factura", label: "Factura" }
  ];

  const tiposDocumento = [
    { value: "DNI", label: "DNI" },
    { value: "carnet", label: "Carnet de Extranjería" }
  ];

  // Ref para los dropdowns
  const tipoDocumentoRef = useRef<HTMLDivElement>(null);
  const tipoComprobanteRef = useRef<HTMLDivElement>(null);

  // Cerrar los dropdowns si se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdowns.tipoDocumento && tipoDocumentoRef.current && !tipoDocumentoRef.current.contains(event.target as Node)) {
        setDropdowns(prev => ({ ...prev, tipoDocumento: false }));
      }
      if (dropdowns.tipoComprobante && tipoComprobanteRef.current && !tipoComprobanteRef.current.contains(event.target as Node)) {
        setDropdowns(prev => ({ ...prev, tipoComprobante: false }));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdowns.tipoDocumento, dropdowns.tipoComprobante]);

  const handleInputChange = (field: keyof PaymentInfoType, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Actualizar también el estado global según el campo
    switch(field) {
      case 'nombre':
        setShippingAddress({ ...shippingAddress, firstName: value });
        break;
      case 'apellidos':
        setShippingAddress({ ...shippingAddress, lastName: value });
        break;
      case 'telefono':
        setShippingAddress({ ...shippingAddress, phone: value });
        break;
      case 'correo':
        setShippingAddress({ ...shippingAddress, email: value });
        break;
      case 'tipoComprobante':
        setShippingAddress({ ...shippingAddress, invoiceType: value as 'boleta' | 'factura' });
        break;
      case 'tipoDocumento':
        setShippingAddress({ ...shippingAddress, documentType: value });
        break;
      case 'numeroDocumento':
        setShippingAddress({ ...shippingAddress, documentNumber: value });
        break;
      case 'ruc':
        setShippingAddress({ ...shippingAddress, ruc: value });
        break;
      case 'razonSocial':
        setShippingAddress({ ...shippingAddress, companyName: value });
        break;
    }
  };

  const toggleDropdown = (dropdown: keyof DropdownType) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Datos de facturación</h2>
      <p className="text-sm text-gray-500 mb-4">Los campos marcados con <span className="text-red-500">*</span> son obligatorios</p>
      <form className="space-y-4">
        {/* Nombres y apellidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombres <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Ingresa tus nombres"
            />
          </div>

          <div>
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="apellidos"
              value={formData.apellidos}
              onChange={(e) => handleInputChange("apellidos", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Ingresa tus apellidos"
            />
          </div>
        </div>

        {/* Teléfono y correo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="telefono"
              value={formData.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Ingresa tu número telefónico"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
              Correo <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="correo"
              value={formData.correo}
              onChange={(e) => handleInputChange("correo", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
        </div>

        {/* Tipo de comprobante */}
        <div className="relative" ref={tipoComprobanteRef}>
          <label htmlFor="tipoComprobante" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de comprobante <span className="text-red-500">*</span>
          </label>
          <div
            onClick={() => toggleDropdown("tipoComprobante")}
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm flex justify-between items-center cursor-pointer"
          >
            <span>{formData.tipoComprobante ? 
              tiposComprobante.find(tipo => tipo.value === formData.tipoComprobante)?.label : 
              "Seleccionar tipo de comprobante"}
            </span>
            <ChevronDown size={16} className={`transition-transform ${dropdowns.tipoComprobante ? 'rotate-180' : ''}`} />
          </div>

          {/* Dropdown para tipo de comprobante */}
          {dropdowns.tipoComprobante && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {tiposComprobante.map((tipo) => (
                <div
                  key={tipo.value}
                  onClick={() => {
                    handleInputChange("tipoComprobante", tipo.value);
                    toggleDropdown("tipoComprobante");
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {tipo.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mostrar campos según el tipo de comprobante */}
        {formData.tipoComprobante === "boleta" && (
          <div className="space-y-4">
            {/* Tipo de documento */}
            <div className="relative" ref={tipoDocumentoRef}>
              <label htmlFor="tipoDocumento" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de documento
              </label>
              <div
                onClick={() => toggleDropdown("tipoDocumento")}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm flex justify-between items-center cursor-pointer"
              >
                <span>{formData.tipoDocumento ? 
                  tiposDocumento.find(tipo => tipo.value === formData.tipoDocumento)?.label : 
                  "Seleccionar tipo de documento"}
                </span>
                <ChevronDown size={16} className={`transition-transform ${dropdowns.tipoDocumento ? 'rotate-180' : ''}`} />
              </div>

              {/* Dropdown para tipo de documento */}
              {dropdowns.tipoDocumento && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  {tiposDocumento.map((tipo) => (
                    <div
                      key={tipo.value}
                      onClick={() => {
                        handleInputChange("tipoDocumento", tipo.value);
                        toggleDropdown("tipoDocumento");
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {tipo.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Número de documento */}
            <div>
              <label htmlFor="numeroDocumento" className="block text-sm font-medium text-gray-700 mb-1">
                Número de documento
              </label>
              <input
                type="text"
                id="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Ingresa tu número de documento"
              />
            </div>
          </div>
        )}

        {formData.tipoComprobante === "factura" && (
          <div className="space-y-4">
            {/* RUC */}
            <div>
              <label htmlFor="ruc" className="block text-sm font-medium text-gray-700 mb-1">
                RUC
              </label>
              <input
                type="text"
                id="ruc"
                value={formData.ruc}
                onChange={(e) => handleInputChange("ruc", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Ingresa tu número de RUC"
              />
            </div>

            {/* Razón Social */}
            <div>
              <label htmlFor="razonSocial" className="block text-sm font-medium text-gray-700 mb-1">
                Razón Social
              </label>
              <input
                type="text"
                id="razonSocial"
                value={formData.razonSocial}
                onChange={(e) => handleInputChange("razonSocial", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                placeholder="Ingresa la razón social"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
