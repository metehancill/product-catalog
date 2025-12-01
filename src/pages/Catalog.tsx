import { useEffect, useState } from 'react';
import { api, CatalogPDF } from '../lib/api';
import { Download, FileText } from 'lucide-react';
import { Language, translations } from '../translations';

type CatalogProps = {
  language: Language;
};

export default function Catalog({ language }: CatalogProps) {
  const [catalogs, setCatalogs] = useState<CatalogPDF[]>([]);
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogPDF | null>(null);
  const [loading, setLoading] = useState(true);
  const t = translations[language].catalog;

  useEffect(() => {
    loadCatalogs();
  }, []);

  const loadCatalogs = async () => {
    try {
      const data = await api.getCatalogs();
      setCatalogs(data);
      if (data.length > 0) {
        setSelectedCatalog(data[0]);
      }
    } catch (error) {
      console.error('Katalog yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (selectedCatalog) {
      const pdfBlob = base64ToBlob(selectedCatalog.pdfBase64, 'application/pdf');
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${selectedCatalog.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
            {selectedCatalog && (
              <button
                onClick={handleDownload}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>{t.download}</span>
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
        ) : catalogs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {language === 'tr' ? 'Kataloglar' : 'Catalogs'}
                </h3>
                <div className="space-y-2">
                  {catalogs.map((catalog) => (
                    <button
                      key={catalog.id}
                      onClick={() => setSelectedCatalog(catalog)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCatalog?.id === catalog.id
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{catalog.title}</p>
                          {catalog.description && (
                            <p className={`text-sm truncate ${
                              selectedCatalog?.id === catalog.id ? 'text-red-100' : 'text-gray-600'
                            }`}>
                              {catalog.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              {selectedCatalog && (
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedCatalog.title}</h2>
                    {selectedCatalog.description && (
                      <p className="text-gray-600 mt-1">{selectedCatalog.description}</p>
                    )}
                  </div>
                  <div className="w-full" style={{ height: 'calc(100vh - 350px)' }}>
                    <iframe
                      src={`data:application/pdf;base64,${selectedCatalog.pdfBase64}#toolbar=1&navpanes=1&view=FitH`}
                      className="w-full h-full"
                      title={selectedCatalog.title}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {language === 'tr' ? 'Katalog Bulunamadı' : 'Catalog Not Found'}
            </h3>
            <p className="text-gray-600">{t.noCatalogs}</p>
          </div>
        )}
      </div>
    </div>
  );
}
