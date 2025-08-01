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
    tipoDocumentoEntrega: string;
};

export type DropdownType = {
    tipoComprobante: boolean;
    tipoDocumento: boolean;
    tipoDocumentoEntrega: boolean;
};
export type PlacesCalculationType = {
    option: string;
    place: string;
    days: string;
    description: string;
};

export type DetailedPlaceType = {
    option: PlacesCalculationType[];
    detailedplace: string[];
    address: string;
    locals: string;
};

export type OptionPlaceFeaturesType = {
    option: PlacesCalculationType[];
    detailedplace: DetailedPlaceType[];
    department: string;
    province: string;
    district: string;
    address: string;
    apartment: string;
    reference: string;
}


