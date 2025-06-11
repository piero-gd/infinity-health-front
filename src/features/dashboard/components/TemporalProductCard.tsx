import { mockProductCatalog } from '../data/mockProductCatalog';
import type { Product } from '../types';

interface TemporalProductCardProps {
    product?: Product[];
}

export default function TemporalProductCard({ product=mockProductCatalog }: TemporalProductCardProps) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.map((item) => (
                <li key={item.id} className="flex items-center gap-4 p-8  mb-5 border-2 border-gray-100 rounded-xl">
                    <div className="rounded-xl w-15 h-80 overflow-hidden">
                        <img src={item.imagen} alt={item.nombre} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{item.nombre}</h3>
                        <p className="text-sm">Precio: ${item.precionuevo}</p>
                        <p className="text-sm">Precio Anterior: ${item.precioanterior}</p>
                        <p className="text-sm">Valoracion: {item.valoracion}</p>
                        <p className="text-sm">Cantidad: {item.cantidades}</p>
                        <p className="text-sm">Favorito: {item.favorito ? 'Si' : 'No'}</p>
                    </div>
                </li>
            ))}

            <li className="flex items-center gap-4 p-8  mb-5 border-2 border-gray-100 rounded-xl">
                <div >
                    
                </div>
            </li>
        </ul>
        
    );
}