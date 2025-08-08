import { useCheckoutStore } from '../../stores/useCheckoutStore';

export default function InfoDetail() {
    const { shippingAddress } = useCheckoutStore();
    
    // Función para formatear el método de entrega
    const getDeliveryMethodText = () => {
        switch (shippingAddress.deliveryOption) {
            case 'lima':
                return 'Envío a domicilio - Lima Metropolitana';
            case 'shalom':
                return `Recojo en Agencia Shalom - ${shippingAddress.shalomDepartment ? shippingAddress.shalomDepartment.charAt(0).toUpperCase() + shippingAddress.shalomDepartment.slice(1) : ''}`;
            case 'capital':
                return `Recojo en Sede Capital Infinity - ${shippingAddress.capitalBranch || ''}`;
            default:
                return 'Método no especificado';
        }
    };
    
    // Función para obtener la dirección de entrega
    const getDeliveryAddress = () => {
        if (shippingAddress.deliveryOption === 'lima') {
            return [
                shippingAddress.address,
                `${shippingAddress.city}, ${shippingAddress.state}`,
                'Lima, Perú'
            ].filter(Boolean);
        } else if (shippingAddress.deliveryOption === 'shalom') {
            const department = shippingAddress.shalomDepartment 
                ? shippingAddress.shalomDepartment.charAt(0).toUpperCase() + shippingAddress.shalomDepartment.slice(1)
                : '';
            return [
                `Agencia: ${shippingAddress.shalomAgency?.replace('_', ' ') || 'No especificada'}`,
                `${department}, Perú`
            ].filter(Boolean);
        } else if (shippingAddress.deliveryOption === 'capital') {
            return [
                `Sede Capital Infinity`,
                `${shippingAddress.capitalBranch || ''}, Perú`
            ].filter(Boolean);
        }
        return ['Dirección no especificada'];
    };
    
    // Función para obtener el tipo de documento
    const getDocumentTypeText = () => {
        if (shippingAddress.invoiceType === 'boleta') {
            return shippingAddress.documentType?.toUpperCase() || 'Documento';
        } else if (shippingAddress.invoiceType === 'factura') {
            return 'RUC';
        }
        return 'Documento';
    };
    
    // Función para obtener el número de documento
    const getDocumentNumber = () => {
        if (shippingAddress.invoiceType === 'boleta') {
            return shippingAddress.documentNumber;
        } else if (shippingAddress.invoiceType === 'factura') {
            return shippingAddress.ruc;
        }
        return 'No especificado';
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm h-auto">
            {/* Personal Information */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Detalles personales
                </h2>
                <div className="space-y-1">
                    <p className="text-gray-700">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                    </p>
                    <p className="text-gray-600">{shippingAddress.phone || 'Teléfono no especificado'}</p>
                    <p className="text-gray-600">{shippingAddress.email || 'Email no especificado'}</p>
                    <p className="text-sm font-medium text-gray-500">{getDocumentTypeText()}</p>
                    <p className="text-gray-700">{getDocumentNumber()}</p>
                    {shippingAddress.invoiceType === 'factura' && (
                        <>
                            <p className="text-sm font-medium text-gray-500 mt-2">Razón Social</p>
                            <p className="text-gray-700">{shippingAddress.companyName || 'No especificada'}</p>
                        </>
                    )}
                </div>
            </div>
            
            {/* Delivery Information */}
            <div className="pt-3 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Delivery / Entrega
                </h2>
                <div className="space-y-1">
                    <p className="text-gray-700 font-medium">{getDeliveryMethodText()}</p>
                    <p className="text-gray-700">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                    </p>
                    {getDeliveryAddress().map((line, index) => (
                        <p key={index} className="text-gray-600">{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
