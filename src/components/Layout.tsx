import { type ReactNode } from 'react';
import { Instagram } from 'lucide-react';
import { APP_CONFIG } from '../lib/constants';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-brand-black selection:bg-brand-platinum selection:text-brand-black">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-brand-black/90 backdrop-blur-sm border-b border-white/5">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="font-display text-2xl tracking-widest text-brand-platinum">
                        VICLU<span className="text-brand-platinum/50">.STORE</span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-brand-platinum/20" /> {/* Avatar placeholder */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4">
                {children}
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 mt-20">
                <div className="text-center space-y-2">
                    <p className="font-display text-xl tracking-widest text-brand-platinum/40">VICLU STORE © 2024</p>
                    <a href={APP_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-brand-platinum/40 hover:text-brand-platinum transition-colors">
                        <span className="text-xs uppercase tracking-widest">Síguenos en Instagram</span>
                        <Instagram className="w-4 h-4" />
                    </a>
                    <p className="text-xs text-brand-platinum/20 uppercase tracking-widest mt-4">Designed by ACTA</p>
                </div>
            </footer>
        </div>
    );
}
