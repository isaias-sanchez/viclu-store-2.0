import { cn } from '../lib/utils.ts';
import type { Product } from '../data/products.ts';

interface FilterBarProps {
    categories: Product['category'][];
    selectedCategory: Product['category'] | 'All';
    onSelectCategory: (category: Product['category'] | 'All') => void;
}

export function FilterBar({ categories, selectedCategory, onSelectCategory }: FilterBarProps) {
    const allCategories = ['All', ...categories];

    return (
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide justify-center">
            {allCategories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelectCategory(cat as any)}
                    className={cn(
                        "text-xl font-display tracking-widest uppercase transition-colors whitespace-nowrap",
                        selectedCategory === cat
                            ? "text-brand-platinum border-b-2 border-brand-platinum"
                            : "text-brand-platinum/40 hover:text-brand-platinum/70"
                    )}
                >
                    {cat === 'All' ? 'TODOS' : cat === 'Hoodie' ? 'HOODIES' : 'GORRAS'}
                </button>
            ))}
        </div>
    );
}
