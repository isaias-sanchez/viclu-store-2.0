import { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { PRODUCTS, type Product } from './data/products.ts';

function App() {
  const [category, setCategory] = useState<Product['category'] | 'All'>('All');

  const filteredProducts = category === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === category);

  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  return (
    <Layout>
      <Hero />

      <div className="space-y-12 pb-20">
        <FilterBar
          categories={categories}
          selectedCategory={category}
          onSelectCategory={setCategory}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;
