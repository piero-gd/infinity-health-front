import { CiCircleChevDown } from "react-icons/ci";

export default function Header() {
        return (
            <div className="relative bg-cover bg-no-repeat">
                <img src="img/bg_catalog.png" className="w-full h-full" />
                <h1 className="xl:text-6xl text-2xl font-bold md:text-4xl md:top-20 text-white absolute xl:top-1/3 top-1/2 xl:left-1/4 left-35 transform -translate-x-1/2 -translate-y-1/2">Jemima <p>Ipsum</p></h1>
                <CiCircleChevDown className="text-white absolute xl:bottom-10 bottom-1 xl:left-25 left-10 transform -translate-x-1/2 -translate-y-1/2 xl:size-20 size-10"/>
            </div>
        )
}