export default function AboutProduct() {
    return (
        <div className="mt-16 w-full gap-4">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-4">Sobre este Producto</h2>
            <div className="grid grid-cols-3 gap-4 bg-sky-50 rounded-3xl border-1 border-[var(--color-primary)] p-6">
                <div className="p-6">
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Beneficios</h3>
                   <ul>
                    <li> ● </li>
                    <li> ● </li>
                    <li> ● </li>
                    <li> ● </li>
                   </ul>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sugerencias</h3>
                    <ul>
                        <li> dfefe </li>
                        <li> efefef </li>
                        <li> efefefe </li>
                        <li> efefefef </li>
                        <li> efefefefef </li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl p-6 py-10">
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Tabla Nutricional</h3>
                    <img src="/img/modelo.png" className="w-full h-full object-cover" alt="" />
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Ingredientes</h3>
                    <ul>
                        <li> dfefe </li>
                        <li> efefef </li>
                        <li> efefefe </li>
                        <li> efefefef </li>
                        <li> efefefefef </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}