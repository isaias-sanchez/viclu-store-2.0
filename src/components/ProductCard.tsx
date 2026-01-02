import { Package } from 'lucide-react';
import type { Product } from '../types/product';
import { getWhatsAppLink, cn } from '../lib/utils.ts';
import { CURRENCY } from '../lib/constants.ts';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="flex flex-col gap-3 group">
            {/* Image Placeholder */}
            <div className="aspect-square bg-brand-gray flex items-center justify-center rounded-sm overflow-hidden relative">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <Package className="w-12 h-12 text-brand-platinum/50" strokeWidth={1} />
                )}
            </div>

            {/* Info */}
            <div className="space-y-1">
                <h3 className="text-lg font-medium tracking-tight text-white">{product.name}</h3>
                <p className="text-brand-platinum/80 text-sm">
                    {CURRENCY} ${product.price.toFixed(2)}
                </p>
            </div>

            {/* Button */}
            <a
                href={getWhatsAppLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "mt-2 block w-full text-center py-2.5 px-4",
                    "border border-brand-platinum text-brand-platinum uppercase text-sm font-semibold tracking-wider",
                    "hover:bg-brand-platinum hover:text-brand-black transition-colors duration-200"
                )}
            >
                Consultar
            </a>
        </div>
    );
}
