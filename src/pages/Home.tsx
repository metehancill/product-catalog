import { useEffect, useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Award, Shield, Truck } from 'lucide-react';

type HomeProps = {
  onNavigate: (page: string, productSlug?: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error('Popüler ürünler yüklenirken bir hata oluştu : ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative h-[300px] bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Ürünlerimizi Keşfedin...
            </h1>
            <p className="text-xl mb-8 text-red-100">
              Yüksek Kalite Uygun Maliyetiyle Ürünlerimizi inceleyin...
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center space-x-2"
            >
              <span>Hemen Keşfedin</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Yüksek Kalite</h3>
              <p className="text-gray-600">
                En kaliteli malzemeler ve üretim standartları ile sizlere hizmet sunuyoruz
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Güvenilir Hizmet</h3>
              <p className="text-gray-600">
                Yıllardır süregelen deneyimimiz ve müşteri memnuniyeti odaklı yaklaşımımız
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hızlı Teslimat</h3>
              <p className="text-gray-600">
                Zamanında ve güvenli teslimat ile ihtiyaçlarınızı karşılamak için buradayız
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popüler Ürünlerimiz
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onNavigate('product', product.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Popüler ürün yok...</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hakkımızda
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Hakkımızda bölümü kısa yazı
              </p>
            </div>
            <div className="md:w-auto">
              <button
                onClick={() => onNavigate('about')}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Daha Fazla</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
