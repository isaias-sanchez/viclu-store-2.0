import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import AdminPage from './pages/Admin';
import { useProducts } from './hooks/useProducts';
import { type Product } from './types/product';

// Componente para la Home (Catálogo)
const Catalog = () => {
  const { products } = useProducts();
  const [category, setCategory] = useState<string>('All');

  // Solo mostramos productos ACTIVOS y con STOCK en la tienda
  const availableProducts = products.filter(p => p.active && p.stock > 0);

  const visibleProducts = category === 'All'
    ? availableProducts
    : availableProducts.filter(p => p.category === category);

  // Obtener categorías únicas solo de los productos disponibles
  const categories = Array.from(new Set(availableProducts.map(p => p.category))).sort();

  return (
    <Layout>
      <Hero />
      <FilterBar
        categories={categories}
        selectedCategory={category}
        onSelectCategory={setCategory}
      />
      <main className="container mx-auto px-4 py-16" id="catalogo">
        <h2 className="text-3xl font-display text-[#E5E4E2] mb-8 text-center uppercase tracking-wider">
          Colección Disponible
        </h2>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-20">No hay productos disponibles en este momento.</p>
        )}
      </main>
    </Layout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
