export type PaymentInfoType = {
    nombre: string;
    apellidos: string;
    telefono: string;
    correo: string;
    tipoComprobante: string;
    tipoDocumento: string;
    numeroDocumento: string;
    ruc: string;
    razonSocial: string;
    pais: string;
    tipoDocumentoEntrega: string;
};

export type DropdownType = {
    tipoComprobante: boolean;
    tipoDocumento: boolean;
    tipoDocumentoEntrega: boolean;
};