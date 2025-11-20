import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

type FooterProps = {
  onNavigate: (page: string) => void;
};

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  123 Innovation Street<br />
                  Tech District, City 12345<br />
                  Country
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <p className="text-sm">info@futuresolutions.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <button
                onClick={() => onNavigate('home')}
                className="block text-sm hover:text-blue-400 transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('products')}
                className="block text-sm hover:text-blue-400 transition-colors text-left"
              >
                Products
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="block text-sm hover:text-blue-400 transition-colors text-left"
              >
                About Us
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="block text-sm hover:text-blue-400 transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631531654!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1589787567403!5m2!1sen!2sau"
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
          <p>&copy; 2025 FutureSolutions. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <button className="hover:text-blue-400 transition-colors">Privacy Policy</button>
            <span>|</span>
            <button className="hover:text-blue-400 transition-colors">KVKK</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
