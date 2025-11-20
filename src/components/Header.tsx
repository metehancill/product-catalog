// src/components/Header.tsx

import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png"; // PNG versiyonun

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

const navItems = [
  { name: "Anasayfa", path: "home" },
  { name: "Ürünler", path: "products" },
  { name: "Hakkımızda", path: "about" },
  { name: "İletişim", path: "contact" },
];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const red = "rgba(226, 6, 18, 1)";

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
                {item.name}
              </button>
            ))}
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
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
