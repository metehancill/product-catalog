import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Language, translations } from '../translations';

type FooterProps = {
  onNavigate: (page: string) => void;
  language: Language;
};

export default function Footer({ onNavigate, language }: FooterProps) {
  const t = translations[language];
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  Malkoçoğlu, Eski Edirne Asf.<br />
                  No: 917/3 , 34270<br />
                  Sultangazi / İSTANBUL
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-sm">+0 (212) 659 04 29</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-sm">bilgi@besyildizlar.com.tr</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
            <nav className="space-y-2">
              <button
                onClick={() => onNavigate('home')}
                className="block text-sm hover:text-red-400 transition-colors text-left"
              >
                {t.header.home}
              </button>
              <button
                onClick={() => onNavigate('products')}
                className="block text-sm hover:text-red-400 transition-colors text-left"
              >
                {t.header.products}
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="block text-sm hover:text-red-400 transition-colors text-left"
              >
                {t.header.about}
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="block text-sm hover:text-red-400 transition-colors text-left"
              >
                {t.header.contact}
              </button>
            </nav>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{t.footer.followUs}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-red-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.610844513667!2d28.841634275615863!3d41.1211893713349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caaf0042db6fd1%3A0x27681e598998de3e!2zQmXFnyBZxLFsZMSxemxhciBDZXR2ZWwgxLBtYWxhdCBTYW4uIFRpYy4gTHRkLiDFnnRpLg!5e0!3m2!1str!2str!4v1763644176499!5m2!1str!2str"
                width="100%"
                height="150"
                style={{ border: 0 }}
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 Beş Yıldızlar. {t.footer.rights}</p>
          <div className="mt-2 space-x-4">
            <button className="hover:text-blue-400 transition-colors">Gizlilik politikası</button>
            <span>|</span>
            <button className="hover:text-blue-400 transition-colors">KVKK</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
