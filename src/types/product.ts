export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    category: 'Hoodie' | 'Cap'; // Keeping strict category for now to match filtering
    stock: number;
    description: string;
    color: string;
    active: boolean;
    image: string | null;
}
