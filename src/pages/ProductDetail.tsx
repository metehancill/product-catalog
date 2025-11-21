import { useEffect, useState } from 'react';
import { api, Product } from '../lib/api';
import { ArrowLeft, Package } from 'lucide-react';
import { Language } from '../translations';

type ProductDetailProps = {
  productSlug: string;
  onNavigate: (page: string) => void;
  language: Language;
};

export default function ProductDetail({ productSlug, onNavigate, language }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [productSlug]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProduct(parseInt(productSlug));
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{language === 'tr' ? 'Ürün Bulunamadı' : 'Product Not Found'}</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {language === 'tr' ? 'Ürünlere Dön' : 'Return to Products'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('products')}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="h-32 w-32 text-gray-400" />
              )}
            </div>

            <div className="p-8 lg:p-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description || 'No description available.'}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Request More Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
