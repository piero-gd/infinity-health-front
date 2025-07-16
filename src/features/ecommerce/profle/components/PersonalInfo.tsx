export default function PersonalInfo() {
    return (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-md">
            <form className="flex flex-col gap-4">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="lastName">Apellido</label>
                <input type="text" id="lastName" name="lastName" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="phone">Telefono</label>
                <input type="tel" id="phone" name="phone" />
            </form>
        </div>
    )
}