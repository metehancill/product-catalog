import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Download, FileText } from 'lucide-react';

type CatalogPDF = {
  id: string;
  title: string;
  file_url: string;
  file_name: string;
  file_size: number;
  is_active: boolean;
  created_at: string;
};

export default function Catalog() {
  const [pdf, setPdf] = useState<CatalogPDF | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      const { data, error } = await supabase
        .from('catalog_pdfs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setPdf(data);
    } catch (error) {
      console.error('Katalog yüklenirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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
            <div className="bg-gray-100 px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-red-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{pdf.title}</h2>
                  <p className="text-sm text-gray-600">{pdf.file_name} • {formatFileSize(pdf.file_size)}</p>
                </div>
              </div>
            </div>

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
