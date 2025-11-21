import { useEffect, useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

type HomeProps = {
  onNavigate: (page: string, productSlug?: string) => void;
};

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Yüksek Kalite Ürünler',
      description: 'En iyi malzeme ve üretim standardları ile tasarlanmış',
    },
    {
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Hızlı ve Güvenli Teslimat',
      description: 'Siparişiniz zamanında ve güvenli şekilde teslim edilir',
    },
    {
      image: 'https://images.pexels.com/photos/5632380/pexels-photo-5632380.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Müşteri Memnuniyeti',
      description: 'Sizin tatmininiz bizim en büyük hedefimiz',
    },
    {
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Geniş Ürün Yelpazesi',
      description: 'Tüm ihtiyaçlarınızı karşılayan ürünler',
    },
  ];

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              {slides[currentSlide].description}
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Ürünleri Gör</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-50 w-2 hover:bg-opacity-75'
              }`}
            />
          ))}
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Ahşap Ürünlerimiz</h2>
            <p className="text-gray-600">Doğal ahşaptan yapılmış kaliteli ölçüm araçları</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-amber-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📏</div>
                  <p className="text-amber-900 font-semibold">Ahşap Cetvel</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Doğal Ahşap Cetvel</h3>
                <p className="text-gray-600 text-sm mb-4">Doğal ahşaptan üretilmiş, ergonomik tasarım ile konforlu kullanım</p>
                <button className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                  İncele
                </button>
              </div>
            </div>

            <div className="group relative bg-amber-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-amber-300 via-amber-100 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📐</div>
                  <p className="text-amber-900 font-semibold">Gönye</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ahşap Gönye</h3>
                <p className="text-gray-600 text-sm mb-4">Hassas açı ölçümü için geleneksel ahşap gönye modelleri</p>
                <button className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                  İncele
                </button>
              </div>
            </div>

            <div className="group relative bg-amber-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📏</div>
                  <p className="text-amber-900 font-semibold">Ölçü Cetveli</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ölçü Cetveli</h3>
                <p className="text-gray-600 text-sm mb-4">İnşaat ve tasarım için kaliteli ahşap ölçü araçları</p>
                <button className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                  İncele
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Klasik Cetvel</h2>
            <p className="text-gray-600">Zamansız tasarım, güvenilir ölçüm</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📏</div>
                  <p className="text-gray-700 font-semibold">Çelik Cetvel</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Çelik Cetvel 30cm</h3>
                <p className="text-gray-600 text-sm mb-4">Paslanmaz çelikten yapılmış dayanıklı cetvel, clear ölçülendirme</p>
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  İncele
                </button>
              </div>
            </div>

            <div className="group relative bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-slate-300 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📐</div>
                  <p className="text-gray-700 font-semibold">Plastik Gönye</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Plastik Gönye Seti</h3>
                <p className="text-gray-600 text-sm mb-4">Sağlam plastik gönye seti, okul ve ofis kullanımı için ideal</p>
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  İncele
                </button>
              </div>
            </div>

            <div className="group relative bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📏</div>
                  <p className="text-gray-700 font-semibold">Tahta Cetvel</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Tahta Cetvel 50cm</h3>
                <p className="text-gray-600 text-sm mb-4">Basit ve güvenilir, eğitim kurumları için uygun fiyatlı seçenek</p>
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  İncele
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Renkli Esnek Cetvel</h2>
            <p className="text-gray-600">Eğlenli tasarım, pratik kullanım</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group relative bg-red-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-red-400 to-red-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📏</div>
                  <p className="text-red-900 font-semibold">Kırmızı</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-2">Esnek Cetvel Kırmızı</h3>
                <p className="text-gray-600 text-sm mb-3">Yumuşak silikon, bükülür cetvel</p>
                <button className="w-full bg-red-600 text-white py-1.5 text-sm rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Sepete Ekle
                </button>
              </div>
            </div>

            <div className="group relative bg-blue-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📏</div>
                  <p className="text-blue-900 font-semibold">Mavi</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-2">Esnek Cetvel Mavi</h3>
                <p className="text-gray-600 text-sm mb-3">Yumuşak silikon, bükülür cetvel</p>
                <button className="w-full bg-blue-600 text-white py-1.5 text-sm rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Sepete Ekle
                </button>
              </div>
            </div>

            <div className="group relative bg-green-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-green-400 to-green-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📏</div>
                  <p className="text-green-900 font-semibold">Yeşil</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-2">Esnek Cetvel Yeşil</h3>
                <p className="text-gray-600 text-sm mb-3">Yumuşak silikon, bükülür cetvel</p>
                <button className="w-full bg-green-600 text-white py-1.5 text-sm rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Sepete Ekle
                </button>
              </div>
            </div>

            <div className="group relative bg-yellow-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-yellow-400 to-yellow-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">📏</div>
                  <p className="text-yellow-900 font-semibold">Sarı</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900 mb-2">Esnek Cetvel Sarı</h3>
                <p className="text-gray-600 text-sm mb-3">Yumuşak silikon, bükülür cetvel</p>
                <button className="w-full bg-yellow-500 text-white py-1.5 text-sm rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
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
