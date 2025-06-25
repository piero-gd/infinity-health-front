export default function AboutProduct() {
    return (
        <div className="mt-16 w-full gap-4">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-4">Sobre este Producto</h2>
            <div className="grid xl:grid-cols-3 grid-cols-1 gap-4 bg-sky-50 rounded-3xl border-1 border-[var(--color-primary)] p-6">
                <div className="xl:order-1 order-2 p-6">
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Beneficios</h3>
                   <ul>
                    <li> ● 0 azúcares añadidos </li>
                    <li> ● Vegano / Sin gluten (si aplica)</li>
                    <li> ● Apoya la digestión / antioxidantes</li>
                    <li> ● Energía natural sin crash</li>

                   </ul>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4">Sugerencias</h3>
                    <ul>
                        <li> Para ser consumido en cualquier momento del día. </li>
                        <li> Conservar en un lugar fresco, seco y alejado de la luz solar. </li>
                        <li> Conservar el envase herméticamente cerrado. </li>
                        <li> Una vez abierto consumir todo el contenido </li>
                        <li> Consumir helado de preferencia </li>
                    </ul>
                </div>

                <div className="xl:order-2 order-1 bg-white rounded-xl p-6 py-10">
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Tabla Nutricional</h3>
                    <img src="/img/modelo.png" className="w-full h-full object-cover" alt="" />
                </div>

                <div className="xl:order-3 order-2 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ingredientes</h3>
                    <ul className="space-y-1">
                        <li> Agua carbonatada </li>
                        <li> Fresa liofilizada </li>
                        <li> Cramberry liofilizado </li>
                        <li> Aloe vera liofilizado </li>
                        <li> Goma xhantan (SIN 415) </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}