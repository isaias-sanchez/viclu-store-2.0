import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Product } from '../types/product';
import { convertToBase64 } from '../lib/utils';
import { Image as ImageIcon, Upload, X, Save } from 'lucide-react';

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
        category: 'Camioneras', // Valor por defecto
        ...initialData
    });

    const [loadingImage, setLoadingImage] = useState(false);

    // Manejo de carga de imagen
    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validación de Tamaño (Máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("⚠️ La imagen es muy pesada. Máximo 5MB.");
            return;
        }

        setLoadingImage(true);
        try {
            const base64 = await convertToBase64(file);
            setFormData(prev => ({ ...prev, image: base64 }));
        } catch (error) {
            console.error("Error imagen:", error);
            alert("Error al procesar la imagen");
        } finally {
            setLoadingImage(false);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // --- VALIDACIÓN EXPLÍCITA (Corrección del error silencioso) ---
        if (!formData.name || !formData.name.trim()) {
            alert("❌ El nombre del producto es obligatorio.");
            return;
        }
        if (!formData.price || Number(formData.price) <= 0) {
            alert("❌ El precio debe ser mayor a 0.");
            return;
        }

        // Crear objeto limpio
        const newProduct: Product = {
            id: formData.id || Date.now().toString(),
            name: formData.name,
            brand: formData.brand || 'Viclu',
            price: Number(formData.price),
            stock: Number(formData.stock) || 0,
            description: formData.description || '',
            color: formData.color || 'N/A',
            active: formData.active ?? true,
            image: formData.image || null,
            category: formData.category || 'Camioneras'
        };

        // Enviar al padre
        onSubmit(newProduct);

        // Limpiar formulario solo si es nuevo producto
        if (!initialData.id) {
            setFormData({
                name: '', brand: '', price: 0, stock: 1,
                description: '', color: '', image: null, category: 'Camioneras'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* SECCIÓN IMAGEN */}
            <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-32 h-40 bg-[#0F0F0F] border-2 border-dashed border-white/20 rounded-lg overflow-hidden group hover:border-[#E5E4E2] transition-colors">
                    {formData.image ? (
                        <>
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-white/30">
                            <ImageIcon className="w-8 h-8 mb-2" />
                            <span className="text-[10px] uppercase text-center">Subir Foto<br />(Max 5MB)</span>
                        </div>
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={loadingImage}
                    />
                </div>
                {loadingImage && <span className="text-xs text-[#E5E4E2] mt-2 animate-pulse">Procesando...</span>}
            </div>

            {/* CAMPOS DE TEXTO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase ml-1">Nombre *</label>
                    <input
                        className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none transition-colors"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Gorra Nike"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase ml-1">Precio *</label>
                    <input
                        type="number"
                        className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none"
                        value={formData.price || ''}
                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                        placeholder="Ej: 85000"
                    />
                </div>

                {/* SELECTOR DE CATEGORÍA CON OPCIÓN DE CREAR */}
                <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase ml-1">Categoría</label>
                    <div className="flex gap-2">
                        <select
                            className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none"
                            value={['Camioneras', 'Beisboleras', 'Multimarca'].includes(formData.category || '') ? formData.category : 'Nueva'}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val !== 'Nueva') {
                                    setFormData({ ...formData, category: val });
                                } else {
                                    // Si selecciona 'Nueva', limpiamos para que escriba
                                    setFormData({ ...formData, category: '' });
                                }
                            }}
                        >
                            <option value="Camioneras">Camioneras</option>
                            <option value="Beisboleras">Beisboleras</option>
                            <option value="Multimarca">Multimarca</option>
                            <option value="Nueva">+ Crear Nueva...</option>
                        </select>
                    </div>
                </div>

                {/* CAMPO PARA NUEVA CATEGORÍA (Se muestra si selecciona 'Nueva' o escribe algo custom) */}
                {(!['Camioneras', 'Beisboleras', 'Multimarca'].includes(formData.category || '')) && (
                    <div className="space-y-1 animate-in fade-in slide-in-from-top-1">
                        <label className="text-xs text-[#E5E4E2] uppercase ml-1 font-bold">Escribe la Nueva Categoría</label>
                        <input
                            className="w-full p-3 bg-[#111] border border-[#E5E4E2] rounded text-white focus:outline-none"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                            placeholder="Ej: Gorros de lana"
                            autoFocus
                        />
                    </div>
                )}


                <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase ml-1">Marca</label>
                    <input
                        className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none"
                        value={formData.brand}
                        onChange={e => setFormData({ ...formData, brand: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs text-white/50 uppercase ml-1">Stock</label>
                    <input
                        type="number"
                        className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none"
                        value={formData.stock}
                        onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                    />
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-xs text-white/50 uppercase ml-1">Descripción</label>
                    <textarea
                        className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-[#E5E4E2] outline-none min-h-[80px]"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-[#E5E4E2] hover:bg-white text-black font-display font-bold text-lg py-3 rounded flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
            >
                <Save className="w-5 h-5" />
                {buttonText}
            </button>
        </form>
    );
};

export default ProductForm;
