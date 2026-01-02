import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WHATSAPP_PHONE } from './constants';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getWhatsAppLink(item: string) {
    const text = encodeURIComponent(`Hola, estoy interesado en: ${item}`);
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
