import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import Admin from "./pages/Admin";
import { Language } from "./translations";

type Page = "home" | "products" | "product" | "about" | "contact" | "catalog" | "admin";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [productSlug, setProductSlug] = useState<string>("");
  const [language, setLanguage] = useState<Language>('tr');

  const handleNavigate = (page: string, slug?: string) => {
    setCurrentPage(page as Page);
    if (slug) {
      setProductSlug(slug);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} language={language} />;
      case "products":
        return <Products onNavigate={handleNavigate} language={language} />;
      case "product":
        return (
          <ProductDetail productSlug={productSlug} onNavigate={handleNavigate} language={language} />
        );
      case "about":
        return <About language={language} />;
      case "contact":
        return <Contact language={language} />;
      case "catalog":
        return <Catalog language={language} />;
      case "admin":
        return <Admin />;
      default:
        return <Home onNavigate={handleNavigate} language={language} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} language={language} />
    </div>
  );
}

export default App;
