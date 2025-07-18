import { useState, useEffect } from 'react';
import type { CartProduct, UseCartReturn } from '../type';

export const useCart = (): UseCartReturn => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                // Simular API call with a timeout
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mock data - in a real app, this would be an API call
                const mockProducts: CartProduct[] = [
                    {
                        id: '00001',
                        product: {
                            name: 'Xgo!',
                            image: 'img/pruebapro.png',
                        },
                        status: 'Pendiente',
                        total: '$100.00',
                        date: '2023-06-01',
                    },
                    {
                        id: '00002',
                        product: {
                            name: 'Aloex',
                            image: 'img/pruebapro.png',
                        },
                        status: 'Completado',
                        total: '$200.00',
                        date: '2023-06-02',
                    },
                    {
                        id: '00003',
                        product: {
                            name: 'Potenciador Masculino',
                            image: 'img/pruebapro.png',
                        },
                        status: 'Pendiente',
                        total: '$300.00',
                        date: '2023-06-03',
                    },
                ];

                setProducts(mockProducts);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Error al cargar los productos'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchCartProducts();
    }, []);

    return {
        products,
        isLoading,
        error,
        isEmpty: !isLoading && products.length === 0 && !error
    };
};
