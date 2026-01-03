import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WHATSAPP_PHONE } from './constants';
import type { Product } from '../types/product';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

export function generateWhatsAppLink(product: Product) {
    const text = encodeURIComponent(`Hola, estoy interesado en: ${product.name} - ${formatPrice(product.price)}`);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

/**
 * Convierte un archivo de imagen a cadena Base64
 * para almacenamiento local.
 */
export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};
