import {useRef } from 'react';
import {FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {AiOutlineShop } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

//Slider Use
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useProducts } from '../../ecommerce/shared/hooks/useProducts';
import Loader from '../../../components/Loader';
import ProductCardDashboardSpecial from '../../../components/ProductCardDashboardSpecial';


// Custom arrow components
const SampleNextArrow = ({ onClick }: { onClick?: () => void }) => {
    return (
        <button 
            onClick={onClick}
            className="absolute xl:-right-2 -right-0 top-1/2 -translate-y-1/2 z-10 border border-[var(--color-primary)] bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-2xl hover:bg-blue-50 transition-colors duration-200 focus:outline-none"
          
        >
            <FaChevronRight className="text-[var(--color-primary)]" />
        </button>
    );
};

const SamplePrevArrow = ({ onClick }: { onClick?: () => void }) => {
    return (
        <button 
            onClick={onClick}
            className="absolute xl:-left-2 -left-0 top-1/2 -translate-y-1/2 z-10 border border-[var(--color-primary)] bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-2xl hover:bg-blue-50 transition-colors duration-200 focus:outline-none"
            
        >
            <FaChevronLeft className="text-[var(--color-primary)]" />
        </button>
    );
};

export default function SliderProductDashboard() {
    const navigate = useNavigate();
 
     // Usar React Query a través de nuestro hook personalizado
     const { 
        data, 
        isLoading, 
        isError
    } = useProducts();
    
    // Manejar los diferentes estados de la consulta
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-16">
                <h3 className="text-xl text-red-600">Error al cargar productos</h3>
                <p className="mt-2 text-gray-500">Ocurrió un error inesperado</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-background-2)]"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    const products = data?.data || [];

    const sliderRef = useRef<Slider>(null);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        arrows: true,
        centerMode: false,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className="w-full h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-medium ">Recomendados para ti</h3>
                <button className="flex items-center gap-2 px-2 py-2 p-2
                text-sm font-medium text-primary  shadow-lg rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
                onClick={() => navigate('/catalog')}
                >
                    <span className="xl:block hidden">Ver Tienda</span>
                    <AiOutlineShop className="xl:w-5 xl:h-5 w-6 h-6 " />
                </button>
            </div>

            
            <div className="relative xl:-mx-2 -mx-0 pt-2 pb-2">
                <Slider ref={sliderRef} {...sliderSettings} >
                    {products.map((product) => (
                        <div key={product.id} className="xl:px-2 px-0">
                            <ProductCardDashboardSpecial 
                                product={product} 
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}