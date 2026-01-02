import { useState, useEffect } from 'react';
import { type Product } from '../types/product';
import { products as initialData } from '../data/products'; // Datos semilla

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Cargar datos al iniciar
    useEffect(() => {
        const saved = localStorage.getItem('viclu_inventory');
        if (saved) {
            setProducts(JSON.parse(saved));
        } else {
            // Si es la primera vez, cargamos los datos de prueba
            setProducts(initialData);
        }
        setLoading(false);
    }, []);

    // Guardar en LocalStorage cada vez que cambian los productos
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('viclu_inventory', JSON.stringify(products));
        }
    }, [products, loading]);

    const addProduct = (product: Product) => {
        setProducts([...products, product]);
    };

    const removeProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const toggleStatus = (id: string) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, active: !p.active } : p
        ));
    };

    return { products, loading, addProduct, removeProduct, toggleStatus };
};
