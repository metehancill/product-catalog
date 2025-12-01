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
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="h-32 w-32 text-gray-400" />
              )}
            </div>

            <div className="p-8 lg:p-12">
              <div className="mb-6">
                {product.category && (
                  <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                    {product.category.name}
                  </span>
                )}
                <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              </div>

              {product.price > 0 && (
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                </div>
              )}

              <div className="space-y-6">
                {product.shortDescription && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      {language === 'tr' ? 'Kısa Açıklama' : 'Overview'}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>
                )}

                {product.fullDescription && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      {language === 'tr' ? 'Detaylı Açıklama' : 'Description'}
                    </h2>
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {product.fullDescription}
                    </div>
                  </div>
                )}

                {!product.shortDescription && !product.fullDescription && (
                  <p className="text-gray-500 italic">
                    {language === 'tr' ? 'Açıklama mevcut değil.' : 'No description available.'}
                  </p>
                )}

                <div className="pt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    {language === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                  </button>
                  <button
                    onClick={() => onNavigate('catalog')}
                    className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    {language === 'tr' ? 'Kataloğu Görüntüle' : 'View Catalog'}
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
