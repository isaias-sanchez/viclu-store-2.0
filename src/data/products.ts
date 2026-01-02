export interface Product {
    id: string;
    name: string;
    price: number;
    category: 'Hoodie' | 'Cap';
}

export const PRODUCTS: Product[] = [
    { id: '1', name: 'Platinum Hoodie V1', price: 850, category: 'Hoodie' },
    { id: '2', name: 'Platinum Hoodie V2', price: 850, category: 'Hoodie' },
    { id: '3', name: 'Platinum Hoodie V3', price: 900, category: 'Hoodie' },
    { id: '4', name: 'Viclu Cap Basic', price: 400, category: 'Cap' },
    { id: '5', name: 'Viclu Cap Pro', price: 450, category: 'Cap' },
    { id: '6', name: 'Viclu Cap Ltd', price: 500, category: 'Cap' },
];
