import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { APP_CONFIG } from '../lib/constants';
import { Trash2, Eye, EyeOff, Plus, LogOut } from 'lucide-react';
import type { Product } from '../types/product'; // Importar el tipo

import ProductForm from '../components/ProductForm';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const { products, addProduct, removeProduct, toggleStatus } = useProducts();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === APP_CONFIG.adminPassword) setIsAuthenticated(true);
        else alert("Contraseña incorrecta");
    };

    // --- NUEVA FUNCIÓN PARA GUARDAR CON CONFIRMACIÓN ---
    const handleSaveProduct = async (newProduct: Product) => {
        const success = await addProduct(newProduct);
        if (success) {
            alert("✅ ¡Producto guardado en el inventario!");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-[#1A1A1A] p-8 rounded border border-white/10 w-full max-w-md shadow-2xl">
                    <h1 className="text-3xl text-[#E5E4E2] font-display text-center mb-2">VICLU ADMIN</h1>
                    <p className="text-white/40 text-center mb-6 text-sm">Acceso Propietario</p>

                    <input
                        type="password"
                        placeholder="Contraseña..."
                        className="w-full bg-black border border-white/20 p-4 text-white mb-4 rounded focus:outline-none focus:border-[#E5E4E2] text-center tracking-widest"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-[#E5E4E2] text-black font-bold py-4 rounded hover:bg-white transition uppercase tracking-wider">
                        Ingresar
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-[#E5E4E2] font-body pb-20">
            {/* Header Sticky */}
            <div className="sticky top-0 z-50 bg-[#0F0F0F]/95 backdrop-blur border-b border-white/10 mb-8">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-display tracking-wide">Panel de Control</h1>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Salir
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* COLUMNA IZQUIERDA: FORMULARIO */}
                <div className="lg:col-span-1">
                    <div className="bg-[#1A1A1A] p-6 rounded border border-white/10 sticky top-24">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white/90">
                            <Plus className="w-5 h-5" /> Nuevo Producto
                        </h2>
                        {/* Conectamos la nueva función handleSaveProduct */}
                        <ProductForm onSubmit={handleSaveProduct} buttonText="Guardar en Inventario" />
                    </div>
                </div>

                {/* COLUMNA DERECHA: LISTA DE PRODUCTOS */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 text-white/90">Inventario Actual ({products.length})</h2>

                    <div className="overflow-hidden rounded border border-white/10 bg-[#1A1A1A]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-black/40 text-white/50 text-xs uppercase tracking-wider">
                                    <th className="p-4 w-20">Img</th>
                                    <th className="p-4">Detalle</th>
                                    <th className="p-4 text-right">Precio</th>
                                    <th className="p-4 text-center">Estado</th>
                                    <th className="p-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map(product => (
                                    <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="w-12 h-12 bg-white/5 rounded overflow-hidden">
                                                {product.image ? (
                                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-white/20">N/A</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-[#E5E4E2]">{product.name}</div>
                                            <div className="text-xs text-white/50">{product.brand} • {product.stock} unds.</div>
                                        </td>
                                        <td className="p-4 text-right font-mono text-sm">
                                            ${product.price.toLocaleString()}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${product.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {product.active ? 'Activo' : 'Baja'}
                                            </span>
                                        </td>
                                        <td className="p-4 flex justify-end gap-2">
                                            <button
                                                onClick={() => toggleStatus(product.id)}
                                                title={product.active ? "Dar de baja" : "Activar"}
                                                className="p-2 hover:bg-white/10 rounded text-[#E5E4E2] transition-colors"
                                            >
                                                {product.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => { if (confirm('¿Eliminar permanentemente?')) removeProduct(product.id) }}
                                                className="p-2 hover:bg-red-500/20 rounded text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {products.length === 0 && (
                            <div className="p-8 text-center text-white/30 text-sm">
                                No hay productos en el inventario.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
