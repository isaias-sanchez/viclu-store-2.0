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
