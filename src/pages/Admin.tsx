import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { APP_CONFIG } from '../lib/constants';
import { Trash2, Eye, EyeOff, Plus } from 'lucide-react';

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

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-[#1A1A1A] p-8 rounded border border-white/10 w-full max-w-md">
                    <h1 className="text-2xl text-[#E5E4E2] font-display mb-6">Acceso Dueño</h1>
                    <input
                        type="password"
                        placeholder="Contraseña..."
                        className="w-full bg-black border border-white/20 p-3 text-white mb-4 rounded focus:outline-none focus:border-[#E5E4E2]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-[#E5E4E2] text-black font-bold py-3 rounded hover:bg-white transition">
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-[#E5E4E2] p-6 font-body">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-display">Panel de Control</h1>
                    <button onClick={() => setIsAuthenticated(false)} className="text-sm underline text-red-400">Cerrar Sesión</button>
                </div>

                {/* Formulario de Añadir */}
                <div className="bg-[#1A1A1A] p-6 rounded border border-white/10 mb-10">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5" /> Añadir Producto Nuevo</h2>
                    <ProductForm onSubmit={addProduct} buttonText="Guardar en Inventario" />
                </div>

                {/* Lista de Productos */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/20 text-white/50 text-sm uppercase">
                                <th className="p-4">Producto</th>
                                <th className="p-4">Marca</th>
                                <th className="p-4">Precio</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Estado</th>
                                <th className="p-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="p-4 font-bold">{product.name}</td>
                                    <td className="p-4 text-white/70">{product.brand}</td>
                                    <td className="p-4">${product.price.toLocaleString()}</td>
                                    <td className="p-4">{product.stock} unds.</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs rounded ${product.active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                            {product.active ? 'Activo' : 'De Baja'}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-end gap-3">
                                        <button
                                            onClick={() => toggleStatus(product.id)}
                                            title={product.active ? "Dar de baja" : "Activar"}
                                            className="p-2 hover:bg-white/10 rounded text-[#E5E4E2] transition-colors"
                                        >
                                            {product.active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                        </button>
                                        <button
                                            onClick={() => { if (confirm('¿Eliminar permanentemente?')) removeProduct(product.id) }}
                                            className="p-2 hover:bg-red-900/50 rounded text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
