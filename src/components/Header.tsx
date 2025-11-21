// src/components/Header.tsx

import { useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import logo from "../assets/logo.png";
import { Language, translations } from '../translations'; // PNG versiyonun

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
};

const navItems = [
  { nameKey: "home", path: "home" },
  { nameKey: "products", path: "products" },
  { nameKey: "catalog", path: "catalog" },
  { nameKey: "about", path: "about" },
  { nameKey: "contact", path: "contact" },
];

export default function Header({ currentPage, onNavigate, language, onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].header;
  const red = "rgba(226, 6, 18, 1)";

  const toggleLanguage = () => {
    onLanguageChange(language === 'tr' ? 'en' : 'tr');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-center h-20">
          {/* LOGO ALANI — ORJİNAL PNG BOYUTU */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <img
              src={logo}
              alt="Beş Yıldızlar"
              className="object-contain"
              style={{
                height: "200px", // PNG’nin orijinal yüksekliğiyle orantılı kalır
                width: "300px",
              }}
            />
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`text-base font-medium transition-colors ${
                  currentPage === item.path
                    ? `text-[${red}]`
                    : "text-gray-700 hover:text-red-600"
                }`}
                style={{
                  color:
                    currentPage === item.path
                      ? red
                      : undefined,
                }}
              >
                {t[item.nameKey as keyof typeof t]}
              </button>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title={language === 'tr' ? 'Switch to English' : 'Türkçeye Geç'}
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7 text-gray-700" />
            ) : (
              <Menu className="h-7 w-7 text-gray-700" />
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-base text-gray-700 hover:text-red-600 transition-colors"
                  style={{
                    color:
                      currentPage === item.path ? red : undefined,
                  }}
                >
                  {t[item.nameKey as keyof typeof t]}
                </button>
              ))}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors w-fit"
              >
                <Languages className="h-4 w-4" />
                <span className="text-sm font-medium">{language === 'tr' ? 'EN' : 'TR'}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
