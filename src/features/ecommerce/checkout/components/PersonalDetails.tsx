import { useCheckoutStore } from "../stores/useCheckoutStore";

export default function PersonalDetails() {
    const { shippingAddress } = useCheckoutStore();
    
    const getDeliveryOptionName = (option?: string) => {
        switch(option) {
            case 'lima': return 'Lima Metropolitana';
            case 'shalom': return 'Agencia SHALOM';
            case 'capital': return 'Sede Capital Infinity';
            default: return 'No especificado';
        }
    };
    
    return (
        <div className="bg-white rounded-2xl p-5 w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen de información</h2>
            
            <div className="space-y-3">
                <div className="text-gray-700">
                    <div className="font-medium">{shippingAddress.firstName} {shippingAddress.lastName}</div>
                </div>
                
                <div className="text-gray-700">
                    <div>{shippingAddress.phone || 'No especificado'}</div>
                </div>
                
                <div className="text-gray-700">
                    <div>{shippingAddress.email || 'No especificado'}</div>
                </div>
                
                {shippingAddress.documentType && (
                    <div className="text-gray-700">
                        <div className="text-sm text-gray-500">{shippingAddress.documentType}</div>
                        <div>{shippingAddress.documentNumber || 'No especificado'}</div>
                    </div>
                )}
                
                {shippingAddress.invoiceType === 'factura' && (
                    <>
                        <div className="text-gray-700">
                            <div className="text-sm text-gray-500">RUC</div>
                            <div>{shippingAddress.ruc || 'No especificado'}</div>
                        </div>
                        <div className="text-gray-700">
                            <div className="text-sm text-gray-500">Razón Social</div>
                            <div>{shippingAddress.companyName || 'No especificado'}</div>
                        </div>
                    </>
                )}
            </div>

            {/* Delivery Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Detalles de envío</h2>
                
                <div className="space-y-2 text-gray-700">
                    <div className="font-medium">
                        {getDeliveryOptionName(shippingAddress.deliveryOption)}
                    </div>
                    
                    {shippingAddress.deliveryOption === 'lima' && (
                        <>
                            <div>{shippingAddress.state || 'No especificado'}</div>
                            <div>{shippingAddress.city || 'No especificado'}</div>
                            <div>{shippingAddress.address || 'No especificado'}</div>
                        </>
                    )}
                    
                    {shippingAddress.deliveryOption === 'shalom' && (
                        <>
                            <div>Departamento: {shippingAddress.shalomDepartment ? shippingAddress.shalomDepartment.charAt(0).toUpperCase() + shippingAddress.shalomDepartment.slice(1) : 'No especificado'}</div>
                            <div>Agencia: {
                                shippingAddress.shalomAgency 
                                ? (shippingAddress.shalomAgency.includes('_') 
                                   ? shippingAddress.shalomAgency.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
                                   : shippingAddress.shalomAgency.charAt(0).toUpperCase() + shippingAddress.shalomAgency.slice(1))
                                : 'No especificado'
                            }</div>
                        </>
                    )}
                    
                    {shippingAddress.deliveryOption === 'capital' && (
                        <>
                            <div>Sede: {shippingAddress.capitalBranch || 'No especificado'}</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
