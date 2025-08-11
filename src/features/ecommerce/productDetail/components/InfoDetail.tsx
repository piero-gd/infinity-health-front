import { useState, useEffect, useMemo } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";
import { CategoriesTag } from '../../../../components/CategoriesTag';
import type { InfoDetailProps } from '../../shared/types';
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { BiHomeAlt2 } from "react-icons/bi";
import { ColorSelector } from './ColorSelector';
import { SizeSelector } from './SizeSelector';
import type { ColorOption, SizeOption } from '../../shared/types/product.model';
import { showToast } from '../../../../utils/toastConfig';

export const InfoDetail: React.FC<InfoDetailProps> = ({ 
    product,
    onAddToCart = () => {},
}) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    
    // Extraer colores únicos de las especificaciones
    const availableColors = useMemo(() => {
        if (!product.specifications) return [];
        
        const uniqueColors = new Map<string, boolean>();
        const colors: ColorOption[] = [];
        
        product.specifications.forEach(spec => {
            if (spec.color && !uniqueColors.has(spec.color)) {
                uniqueColors.set(spec.color, true);
                const colorOption: ColorOption = {
                    value: spec.color, // Usamos el color directamente del backend
                    available: spec.is_available !== false
                };
                colors.push(colorOption);
            }
        });
        
        return colors;
    }, [product.specifications]);
    
    // Obtener todas las tallas únicas con su disponibilidad
    const availableSizes = useMemo(() => {
        if (!product.specifications) return [];
        
        const sizeMap = new Map<string, SizeOption>();
        
        // Recorrer todas las especificaciones para recopilar tallas
        product.specifications.forEach(spec => {
            if (!spec.size) return;
            
            // Si hay un color seleccionado, solo considerar las especificaciones de ese color
            if (selectedColor && spec.color !== selectedColor) return;
            
            const isAvailable = spec.is_available && (spec.stock > 0);
            
            if (sizeMap.has(spec.size)) {
                // Actualizar la talla existente
                const existing = sizeMap.get(spec.size)!;
                existing.stock += spec.stock || 0;
                existing.available = existing.available || isAvailable;
            } else {
                // Agregar nueva talla
                sizeMap.set(spec.size, {
                    value: spec.size,
                    stock: spec.stock || 0,
                    available: isAvailable
                });
            }
        });
        
        // Convertir a array y ordenar
        return Array.from(sizeMap.values()).sort((a, b) => {
            const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
            const indexA = sizeOrder.indexOf(a.value);
            const indexB = sizeOrder.indexOf(b.value);
            
            if (indexA === -1 && indexB === -1) return a.value.localeCompare(b.value);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            
            return indexA - indexB;
        });
    }, [product.specifications, selectedColor]);
    
    // Resetear la talla seleccionada cuando cambia el color
    useEffect(() => {
        setSelectedSize('');
    }, [selectedColor]);
    
    // Seleccionar el primer color por defecto si solo hay uno
    useEffect(() => {
        if (availableColors.length === 1 && !selectedColor) {
            setSelectedColor(availableColors[0].value);
        }
    }, [availableColors, selectedColor]);
    
    // Seleccionar la primera talla por defecto si solo hay una
    useEffect(() => {
        if (availableSizes.length === 1 && !selectedSize) {
            setSelectedSize(availableSizes[0].value);
        }
    }, [availableSizes, selectedSize]);
    
    const [error, setError] = useState<string | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    
    const handleAddToCart = async () => {
        try {
            setError(null);
            
            // Validar selección de color si hay colores disponibles
            if (availableColors.length > 0 && !selectedColor) {
                showToast.error('Por favor selecciona un color');
                return;
            }
            
            // Validar selección de talla si hay tallas disponibles
            if (availableSizes.length > 0 && !selectedSize) {
                showToast.error('Por favor selecciona una talla');
                return;
            }
            
            // Verificar disponibilidad de stock
            const selectedSpec = product.specifications?.find(spec => 
                spec.color === selectedColor && spec.size === selectedSize
            );
            
            if (selectedSpec && selectedSpec.stock < quantity) {
                showToast.error(`Producto agotado`);
                return;
            }
            
            setIsAddingToCart(true);
            
            // Preparar los datos para el carrito
            const cartItem = {
                ...product,
                quantity,
                selectedColor,
                selectedSize,
                // Incluir la imagen principal o la del color seleccionado
                image: product.images?.[0]?.image_url || product.featured_image,
                // Incluir el precio actual (con descuento si aplica)
                price: product.price_amb,
                // Incluir información de la especificación seleccionada
                specification: selectedSpec
            };
            
            // Llamar a la función para agregar al carrito
            await onAddToCart(cartItem, quantity);
            
            // Mostrar mensaje de éxito (puedes implementar un toast o notificación)
            console.log('Producto agregado al carrito');
            
        } catch (err) {
            console.error('Error al agregar al carrito:', err);
            showToast.error('Ocurrió un error al agregar el producto al carrito');
        } finally {
            setIsAddingToCart(false);
        }
    };

    const formatPrice = (price: string) => {
        return `$ ${parseFloat(price).toFixed(2)}`;
    };
    
    //calcular descuento
    const calculateDiscount = (): number => {
        if (!product.price) return 0;
        const priceNum = parseFloat(product.price);
        const priceAmbNum = parseFloat(product.price_amb);
        return Math.round(((priceNum - priceAmbNum) / priceNum) * 100);
    };

    const discount = calculateDiscount();
    
    return (
        <div className="xl:p-5 p-0 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-3 pb-2">
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                
                <div className="xl:block hidden">
                    <CategoriesTag categoryName={product.category_info?.name || 'Producto'} className="text-sm" />
                </div>
            </div>

            {/* SLOGAN + RATING */}
            <div className="inline-flex items-center gap-1 w-full justify-between text-md text-gray-500">
                <div>
                {product.slogan}
                </div>
            <div className="flex items-center text-yellow-400 gap-1">
                            <svg
                                className="w-4 h-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-md font-medium text-gray-700">
                                {product.rating}
                            </span>
            
             <span className="text-md text-gray-500 ml-1">
                        12 reseñas
                    </span>
            </div> 
                   
            </div>

            {/* PRECIOS */}
            <div className="flex items-center gap-3 justify-between pt-3">
            <div className="flex items-center gap-3">
                    {product.price !== product.price_amb && (
                        <span className="xl:text-lg text-md text-gray-500">
                            {formatPrice(product.price)}
                        </span>
                    )}
                    <div className="flex items-center gap-3">
                        <span className="xl:text-lg text-md font-bold text-[var(--color-primary)] flex items-center gap-1">
                            {formatPrice(product.price_amb)}
                            {product.price !== product.price_amb && (
                                <img src="../../img/payInfinity.svg" className="w-5 h-5 mb-0.5" />
                            )}
                        </span>
                        {discount > 0 && (
                            <span className="ml-12 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-sm font-medium">
                                -{discount}%
                            </span>
                        )}
                    </div>
                </div>
                
            </div>

            <div className="mt-3 mb-2">
                <div 
                    className="text-gray-600 text-sm product-description"
                    dangerouslySetInnerHTML={{ __html: product.description || '' }}
                />
            </div>

            {/* Selector de color */}
            {availableColors.length > 0 && (
                <div className="mt-6">
                    <ColorSelector 
                        colors={availableColors}
                        selectedColor={selectedColor}
                        onColorSelect={setSelectedColor}
                    />
                </div>
            )}

            {/* Selector de talla */}
            {availableSizes.length > 0 && (
                <div className="mt-6">
                    <SizeSelector 
                        sizes={availableSizes}
                        selectedSize={selectedSize}
                        onSizeSelect={setSelectedSize}
                        showStock={true}
                    />
                </div>
            )}

            {/* Mensaje de error */}
            {error && (
                <div>
                    {error}
                </div>
            )}

            {/* BOTONES */}
            <div className="flex flex-col gap-4 mt-8 mb-0 xl:mb-10 xl:relative md:relative fixed bottom-0 left-0 right-0 xl:z-auto z-10 xl:p-0 p-8 xl:bg-transparent xl:rounded-none rounded-t-3xl xl:border-none border-2 border-white bg-white/89 md:bg-transparent md:border-none backdrop-blur-sm justify-center xl:justify-start">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center border border-gray-300 bg-gray-50 rounded-full">
                        <button 
                            type="button"
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            className="px-3 py-2 text-xl text-gray-600 hover:bg-gray-100 rounded-l-full transition-colors"
                            disabled={isAddingToCart}
                            aria-label="Reducir cantidad"
                        >
                            -
                        </button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <button 
                            type="button"
                            onClick={() => setQuantity(prev => prev + 1)}
                            className="px-3 py-2 text-xl text-gray-600 hover:bg-gray-100 rounded-r-full transition-colors"
                            disabled={isAddingToCart}
                            aria-label="Aumentar cantidad"
                        >
                            +
                        </button>
                    </div>
                    
                    <button 
                        type="button"
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                        className={`
                            flex-1 bg-gradient-to-b from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] 
                            text-white py-3 px-6 shadow-lg rounded-full font-semibold transition-all 
                            flex items-center justify-center gap-2 
                            ${isAddingToCart ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90'}
                        `}
                        aria-label="Agregar al carrito"
                    >
                        {isAddingToCart ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Agregando...
                            </>
                        ) : (
                            <>
                                <span>Añadir </span> 
                                <span className="xl:block hidden">al carrito</span>
                                <PiShoppingCartLight size={20} />
                            </>
                        )}
                    </button>
                </div>
            
            </div>


              {/* DELIVERY */}
              <div className="bg-white p-6 rounded-lg mt-6 xl:mb-1 mb-6">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><TbTruckDelivery className="text-[var(--color-primary)]" size={20} />Delivery a Lima Metropolitana</h4>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2"><HiOutlineArchiveBox className="text-[var(--color-primary)]" size={20} />Recojo en Agencia Shalom</h4>
              <h4 className="font-medium text-gray-900  flex items-center gap-2"><BiHomeAlt2 className="text-[var(--color-primary)]" size={20} />Recojo en Sede Infinity Capital</h4>
            </div>
        </div>
    );
};