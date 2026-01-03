import { cn } from '../lib/utils.ts';


interface FilterBarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
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
                    {cat === 'All' ? 'TODOS' : cat}
                </button>
            ))}
        </div>
    );
}
