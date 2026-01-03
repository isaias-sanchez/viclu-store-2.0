export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    stock: number;
    description: string;
    color: string;
    active: boolean;
    image: string | null;
}
