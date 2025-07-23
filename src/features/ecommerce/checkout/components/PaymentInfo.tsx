import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { PaymentInfoType, DropdownType } from "../types";

export default function PaymentInfo() {
  const [formData, setFormData] = useState<PaymentInfoType>({
    nombre: "",
    apellidos: "",
    telefono: "",
    correo: "",
    tipoComprobante: "",
    tipoDocumento: "",
    numeroDocumento: "",
    ruc: "",
    razonSocial: "",
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
  };

  const toggleDropdown = (dropdown: keyof DropdownType) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const selectOption = (dropdown: keyof DropdownType, field: keyof PaymentInfoType, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setDropdowns(prev => ({ ...prev, [dropdown]: false }));
  };

  const shouldShowRucFields = formData.tipoComprobante === "factura";
  const shouldShowDocumentFields = formData.tipoDocumento !== "" && formData.tipoDocumento !== null;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl ">
      <h2 className="text-xl font-bold text-gray-900 mb-8">Datos de Facturación</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-8">
        {/* Nombre */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-left">Nombre</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => handleInputChange("nombre", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            placeholder="Ingresa tu nombre"
          />
        </div>

        {/* Apellidos */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-left">Apellidos</label>
          <input
            type="text"
            value={formData.apellidos}
            onChange={(e) => handleInputChange("apellidos", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            placeholder="Ingresa tus apellidos"
          />
        </div>

        {/* Teléfono / WhatsApp */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-left">Teléfono / Celular</label>
          <input
            type="tel"
            value={formData.telefono}
            onChange={(e) => handleInputChange("telefono", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            placeholder="Número de teléfono"
          />
        </div>

        {/* Correo electrónico */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-left">Correo Electrónico</label>
          <input
            type="email"
            value={formData.correo}
            onChange={(e) => handleInputChange("correo", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            placeholder="ejemplo@correo.com"
          />
        </div>

        {/* Tipo de comprobante */}
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 text-left">Tipo de Comprobante</label>
          <div className="relative" ref={tipoComprobanteRef}>
            <button
              type="button"
              onClick={() => toggleDropdown("tipoComprobante")}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white text-left flex items-center justify-between"
            >
              <span className={formData.tipoComprobante ? "text-gray-900 ml-2" : "text-gray-500 ml-2"}>
                {formData.tipoComprobante ? 
                  tiposComprobante.find(t => t.value === formData.tipoComprobante)?.label : 
                  "Selecciona tipo de comprobante"
                }
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdowns.tipoComprobante ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdowns.tipoComprobante && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-3xl shadow-lg">
                {tiposComprobante.map((tipo) => (
                  <button
                    key={tipo.value}
                    type="button"
                    onClick={() => selectOption("tipoComprobante", "tipoComprobante", tipo.value)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-3xl last:rounded-b-3xl transition-colors"
                  >
                    <span className="ml-2 text-gray-500 text-sm">{tipo.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Campos adicionales para factura - Aparecen justo debajo del tipo de comprobante */}
        {shouldShowRucFields ? (
          <>
            {/* RUC */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">RUC</label>
              <input
                type="text"
                value={formData.ruc}
                onChange={(e) => handleInputChange("ruc", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                placeholder="Número de RUC"
              />
            </div>

            {/* Razón social */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">Razón Social</label>
              <input
                type="text"
                value={formData.razonSocial}
                onChange={(e) => handleInputChange("razonSocial", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                placeholder="Nombre de la empresa"
              />
            </div>
          </>
        ) : (
          <>
          </>
        )}

        {/* Tipo de documento y N° de documento en la misma fila */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-left">Tipo de Documento</label>
          <div className="relative" ref={tipoDocumentoRef}>
            <button
              type="button"
              onClick={() => toggleDropdown("tipoDocumento")}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white text-left flex items-center justify-between"
            >
              <span className={formData.tipoDocumento ? "text-gray-900 ml-2" : "text-gray-500 ml-2"}>
                {formData.tipoDocumento ? 
                  tiposDocumento.find(t => t.value === formData.tipoDocumento)?.label :
                  "Selecciona tipo de documento"
                }
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdowns.tipoDocumento ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdowns.tipoDocumento && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-3xl shadow-lg">
                {tiposDocumento.map((tipo) => (
                  <button
                    key={tipo.value}
                    type="button"
                    onClick={() => selectOption("tipoDocumento", "tipoDocumento", tipo.value)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-3xl last:rounded-b-3xl transition-colors"
                  >
                    <span className="ml-2 text-gray-500 text-sm">{tipo.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* N° de documento - Solo aparece cuando hay tipo de documento seleccionado */}
        {shouldShowDocumentFields ? (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">N° de documento</label>
            <input
              type="text"
              value={formData.numeroDocumento}
              onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
              placeholder={`Ingresa tu ${tiposDocumento.find(t => t.value === formData.tipoDocumento)?.label}`}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>

    </div>
  );
}