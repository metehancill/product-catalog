import { useEffect, useState } from 'react';
import { api, CatalogPDF } from '../lib/api';
import { Download, FileText } from 'lucide-react';

export default function Catalog() {
  const [pdf, setPdf] = useState<CatalogPDF | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      const data = await api.getCatalogPDF();
      setPdf(data);
    } catch (error) {
      console.error('Katalog yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (pdf) {
      window.open(pdf.file_url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">E-Katalog</h1>
              <p className="text-gray-600">Ürün kataloğumuzu görüntüleyin ve indirin</p>
            </div>
            {pdf && (
              <button
                onClick={handleDownload}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>İndir</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : pdf ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full" style={{ height: 'calc(100vh - 300px)' }}>
              <iframe
                src={`${pdf.file_url}#toolbar=1&navpanes=1&view=FitH`}
                className="w-full h-full"
                title="PDF Katalog"
              />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Katalog Bulunamadı</h3>
            <p className="text-gray-600">Şu anda görüntülenebilecek bir katalog bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  );
}
