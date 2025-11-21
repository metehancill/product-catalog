import { useEffect, useState } from 'react';
import { api, Product } from '../lib/api';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, translations } from '../translations';

type HomeProps = {
  onNavigate: (page: string, productSlug?: string) => void;
  language: Language;
};

export default function Home({ onNavigate, language }: HomeProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = translations[language].home;

  const slides = [
    {
      image: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: t.hero1Title,
      description: t.hero1Desc,
    },
    {
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: t.hero2Title,
      description: t.hero2Desc,
    },
    {
      image: 'https://images.pexels.com/photos/5632380/pexels-photo-5632380.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: t.hero3Title,
      description: t.hero3Desc,
    },
    {
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: t.hero4Title,
      description: t.hero4Desc,
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
      const data = await api.getProducts();
      setFeaturedProducts(data.slice(0, 3));
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
              <span>{t.viewAll}</span>
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
              {t.featuredTitle}
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
                  onClick={() => onNavigate('product', product.id.toString())}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{t.noProducts}</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {translations[language].header.about}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                {translations[language].about.story1.substring(0, 200)}...
              </p>
            </div>
            <div className="md:w-auto">
              <button
                onClick={() => onNavigate('about')}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>{t.learnMore}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
