import { useState } from 'react';
import { StarIcon } from "@heroicons/react/24/outline";
import { RxLightningBolt } from "react-icons/rx";
import { PiShoppingCartLight } from "react-icons/pi";
import { RiHeart3Line } from "react-icons/ri";
import { HiMiniHeart } from "react-icons/hi2";

export const InfoDetail = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [quantity, setQuantity] = useState(1);
    
    const toggleFavorite = () => {
        setIsSelected(!isSelected);
    };
    
    return (
        <div className=" p-5 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-2 ">
                <h1 className="text-3xl font-bold text-gray-800">Bebida Energética</h1> 
                <div className="flex bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-accent)] rounded-full text-white items-center gap-2 px-4 py-1 shadow-xs">
                    <RxLightningBolt className="h-5 w-5" />
                    <span>Energía</span>
                </div>
            </div>

            {/* PRECIOS + RESEÑAS */}
            <div className="flex items-center gap-3 justify-between pt-8">
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-blue-600">$5.50</span>
                    <span className="text-lg text-gray-500 line-through">$7.50 </span>
                    <span className="bg-gray-500 text-white px-2 ml-5 py-1 rounded-full text-sm font-medium">
                        -50%
                    </span>
                </div>
                <div className='items-right'>
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="text-yellow-500">
                                <StarIcon className="h-4 w-4" />
                            </button>
                        ))}
                    </div>
                    <span className="ml-3 text-sm text-gray-600">12 reseñas</span>
                </div>
            </div>
            {/* DESCRIPCION */}
            <div className="mt-4 mb-4">
                <span className="text-sm text-gray-600">lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</span>
            </div>


            {/* CANTIDAD Y AGREGAR AL CARRITO */}
            <div className="mt-4 mb-4 flex items-center gap-2 justify-between">
                {/*cantidad*/}
           <div className="flex items-center border border-gray-300 rounded-full gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-1 py-2 hover:bg-gray-100 transition-colors "
          >
            -
          </button>
          <span className="px-1 py-2 min-w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-1 py-2 hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>

        {/*agregar al carrito*/}
        <div className="flex items-center gap-2 text-sm">
                <button className="flex items-center gap-2 rounded-full px-6 py-2 bg-gray-300 font-semibold ">Agregar al carrito
                    <PiShoppingCartLight />
                </button>
        </div>
        {/*agregar a favoritos*/}
        <div className="flex items-center gap-2 text-sm">
                <button 
                    onClick={toggleFavorite}
                    className="flex items-center gap-2 cursor-pointer rounded-full border border-gray-300 px-6"
                >
                    {isSelected ? <HiMiniHeart className="text-red-500" /> : <RiHeart3Line />}
                    {isSelected ? "Favorito" : "Agregar a favoritos"}
                </button>
                </div>
            </div>


            {/* DELIVERY */}
            <div className="mt-4 mb-4 border-b border-gray-300 pb-4 ">
           <h3 className="font-semibold text-gray-900 mb-3">Delivery</h3>
        <p className="text-sm text-gray-600 mb-4">
          Lorem ipsum proin accumsan nibh lacus vitae lobortis nunc ultricies.
        </p>
        
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700 pb-2 border-b">
            <span>Zona</span>
            <span>Tiempo</span>
            <span>Costo Aprox</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm py-2 border-b">
            <span>Lima Metropolitana</span>
            <span>4-5 días hábiles</span>
            <span>$4.50</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm py-2 border-b">
            <span>Delivery a Provincias</span>
            <span>4-5 días hábiles</span>
            <span>$10.00</span>
          </div>
        </div>
            </div>
        </div>
        );
    };