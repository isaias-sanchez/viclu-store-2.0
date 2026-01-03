export const Hero = () => {
    return (
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Fondo con degradado oscuro para que el texto resalte */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F0F]/50 to-[#0F0F0F] z-10" />

            {/* Imagen de fondo (Placeholder o real) */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-[#151515] animate-pulse opacity-20" />
                {/* Nota: Aquí iría tu <img src={heroImage} ... /> si decides poner una foto de fondo */}
            </div>

            {/* Contenido Editorial */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                <span className="block text-[#E5E4E2] text-sm md:text-base tracking-[0.3em] uppercase mb-4 fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Estilo Urbano Premium
                </span>

                <h1 className="text-7xl md:text-9xl font-display uppercase leading-[0.9] tracking-tighter mb-6 fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Viclu <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[#E5E4E2] to-gray-500">Store</span>
                </h1>

                <p className="text-gray-400 font-light text-lg md:text-xl max-w-xl mx-auto mb-10 fade-in-up" style={{ animationDelay: '0.3s' }}>
                    La colección definitiva de Gorras. Diseñada para destacar en las calles.
                </p>

                <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="#catalogo"
                        className="inline-block px-10 py-4 bg-[#E5E4E2] text-black font-bold uppercase tracking-wider text-sm hover:bg-white hover:scale-105 transition-all duration-300"
                    >
                        Ver Colección
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
