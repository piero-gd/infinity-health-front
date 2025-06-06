export interface Product {
    id: number;
    nombre: string;
    precio: number;
    precioAnterior: number;
    categoria: string;
    descripcion: string;
    imagenes: string[];
    stock: number;
    resena:string;
    calificacion:number;
}

export interface Delivery {
    id:number;
    zona:string;
    tiempo:string;
    costoaprox:number;
}

export interface Cart {
    id:number;
    sabor:string;
    cantidad:number;
    favorito:boolean;

}