import { useEffect, useState } from 'react';
import { api, Product } from '../lib/api';
import ProductCard from '../components/ProductCard';

type ProductsProps = {
  onNavigate: (page: string, productSlug?: string) => void;
};

export default function Products({ onNavigate }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ürünlerimiz</h1>
          <p className="text-xl text-red-100">
            Geniş ürün yelpazemizi keşfedin
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onNavigate('product', product.id.toString())}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">Ürün bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
