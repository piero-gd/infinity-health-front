export default function Advice() {
    return (
        <div className="p-6 flex flex-col items-center justify-center text-center md:p-12">
            <p className="text-md text-gray-800 mb-2 md:text-base md:mb-4">
            Si tienes alguna pregunta o necesita ayuda con tu pedido, no dudes en contactar con nuestro servicio de atención al cliente.
            ¡Estamos aquí para ayudarte!
            </p>
            <button className="bg-gradient-to-t from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] text-white px-4 py-1
            rounded-full transition-colors hover:from-[var(--color-btn-gradient-top)] hover:to-[var(--color-btn-gradient-bottom)] cursor-pointer md:px-6 md:py-2 mt-4">
                Ir a mi cuenta
            </button>
        </div>
    );
}