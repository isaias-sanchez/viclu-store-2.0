import type { Product } from '../types/product';

export const products: Product[] = [
    {
        id: '1',
        name: 'Platinum Hoodie V1',
        brand: 'Viclu',
        price: 850,
        category: 'Hoodie',
        active: true,
        stock: 10,
        description: 'Hoodie premium con acabado platinum.',
        color: 'Black',
        image: null
    },
    {
        id: '2',
        name: 'Platinum Hoodie V2',
        brand: 'Viclu',
        price: 850,
        category: 'Hoodie',
        active: true,
        stock: 5,
        description: 'Segunda edición de la serie Platinum.',
        color: 'Gray',
        image: null
    },
    {
        id: '3',
        name: 'Platinum Hoodie V3',
        brand: 'Viclu',
        price: 900,
        category: 'Hoodie',
        active: true,
        stock: 0,
        description: 'La versión definitiva.',
        color: 'White',
        image: null
    },
    {
        id: '4',
        name: 'Viclu Cap Basic',
        brand: 'Viclu',
        price: 400,
        category: 'Cap',
        active: true,
        stock: 15,
        description: 'Gorra básica ajustable.',
        color: 'Black',
        image: null
    },
    {
        id: '5',
        name: 'Viclu Cap Pro',
        brand: 'Viclu',
        price: 450,
        category: 'Cap',
        active: true,
        stock: 8,
        description: 'Gorra con materiales premium.',
        color: 'Blue',
        image: null
    },
    {
        id: '6',
        name: 'Viclu Cap Ltd',
        brand: 'Viclu',
        price: 500,
        category: 'Cap',
        active: false,
        stock: 2,
        description: 'Edición limitada.',
        color: 'Red',
        image: null
    },
];
