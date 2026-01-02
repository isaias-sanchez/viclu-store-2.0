import { useState, type ChangeEvent } from 'react';
import type { Product } from '../types/product';
import { convertToBase64 } from '../lib/utils';
import { Image as ImageIcon, Upload, X } from 'lucide-react';

interface ProductFormProps {
    onSubmit: (product: Product) => void;
    initialData?: Partial<Product>;
    buttonText?: string;
}

const ProductForm = ({ onSubmit, initialData = {}, buttonText = "Guardar Producto" }: ProductFormProps) => {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        brand: '',
        price: 0,
        stock: 1,
        description: '',
        color: '',
        image: null,
        active: true,
        ...initialData
    });

    const [loadingImage, setLoadingImage] = useState(false);

    // Manejo de carga de imagen
    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validación de Tamaño (Máx 500KB para no saturar LocalStorage)
        if (file.size > 500 * 1024) {
            alert("⚠️ La imagen es muy pesada. Por favor usa una imagen menor a 500KB.");
            return;
        }

        setLoadingImage(true);
        try {
            const base64 = await convertToBase64(file);
            setFormData(prev => ({ ...prev, image: base64 }));
        } catch (error) {
            console.error("Error al procesar imagen", error);
            alert("Error al subir la imagen");
        } finally {
            setLoadingImage(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.price) return;

        // Crear objeto completo
        const newProduct = {
            id: formData.id || crypto.randomUUID(),
            name: formData.name,
            brand: formData.brand || 'Viclu',
            price: Number(formData.price),
            stock: Number(formData.stock),
            description: formData.description || '',
            color: formData.color || 'N/A',
            active: formData.active ?? true,
            image: formData.image || null,
            category: formData.category || 'Hoodie'
        } as Product;

        onSubmit(newProduct);

        // Limpiar formulario si es una creación nueva
        if (!initialData.id) {
            setFormData({ name: '', brand: '', price: 0, stock: 1, description: '', color: '', image: null });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* --- SECCIÓN DE IMAGEN --- */}
            <div className="flex flex-col items-center justify-center mb-6">
                <div className="w-full max-w-[200px] aspect-[4/5] bg-[#1A1A1A] border-2 border-dashed border-[#E5E4E2]/20 rounded-lg overflow-hidden relative group">

                    {formData.image ? (
                        <>
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            {/* Botón para quitar imagen */}
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-[#E5E4E2]/50">
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <span className="text-xs text-center px-2">Subir Foto (Max 500KB)</span>
                        </div>
                    )}

                    {/* Input invisible que cubre el área */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={loadingImage}
                    />
                </div>
                {loadingImage && <span className="text-xs text-[#E5E4E2] mt-2 animate-pulse">Procesando imagen...</span>}
            </div>

            {/* --- CAMPOS DE TEXTO --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    placeholder="Nombre del Producto"
                    className="p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                />

                <input
                    placeholder="Marca"
                    className="p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none"
                    value={formData.brand}
                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Precio (COP)"
                    className="p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none"
                    value={formData.price || ''}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                />

                <input
                    placeholder="Color"
                    className="p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none"
                    value={formData.color}
                    onChange={e => setFormData({ ...formData, color: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Unidades Disponibles"
                    className="p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none md:col-span-2"
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                />

                <textarea
                    placeholder="Descripción Corta"
                    className="p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none md:col-span-2 min-h-[80px]"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <button className="w-full bg-[#E5E4E2] text-black font-display font-bold text-lg py-3 rounded hover:bg-white transition-colors flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                {buttonText}
            </button>
        </form>
    );
};

export default ProductForm;
