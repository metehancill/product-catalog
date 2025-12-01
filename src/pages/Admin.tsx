import { useState, useEffect } from 'react';
import { FileText, Upload, Trash2, AlertCircle } from 'lucide-react';
import { api, CatalogPDF } from '../lib/api';

export default function Admin() {
  const [catalogs, setCatalogs] = useState<CatalogPDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadCatalogs();
  }, []);

  const loadCatalogs = async () => {
    try {
      setLoading(true);
      const data = await api.getCatalogs();
      setCatalogs(data);
    } catch (err) {
      setError('Kataloglar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUploading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await api.uploadCatalog(formData);
      setSuccess('Katalog başarıyla yüklendi!');
      e.currentTarget.reset();
      loadCatalogs();
    } catch (err) {
      setError('Katalog yüklenirken hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu kataloğu silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await api.deleteCatalog(id);
      setSuccess('Katalog silindi');
      loadCatalogs();
    } catch (err) {
      setError('Katalog silinirken hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Yönetim Paneli</h1>
          <p className="text-gray-600">E-Katalog yükleyin ve yönetin</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Upload className="h-8 w-8 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Yeni E-Katalog Yükle</h2>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Katalog Başlığı *
              </label>
              <input
                type="text"
                name="Title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Örn: 2024 Ürün Kataloğu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                name="Description"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Katalog hakkında kısa açıklama..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF Dosyası *
              </label>
              <input
                type="file"
                name="PdfFile"
                accept=".pdf"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">Maksimum dosya boyutu: 50MB</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Önizleme Görseli (Opsiyonel)
              </label>
              <input
                type="file"
                name="ThumbnailFile"
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? 'Yükleniyor...' : 'Kataloğu Yükle'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="h-8 w-8 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900">Mevcut Kataloglar</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : catalogs.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Henüz katalog yüklenmemiş</p>
          ) : (
            <div className="space-y-4">
              {catalogs.map((catalog) => (
                <div
                  key={catalog.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-10 w-10 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{catalog.title}</h3>
                      {catalog.description && (
                        <p className="text-sm text-gray-600 mt-1">{catalog.description}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Yüklenme: {new Date(catalog.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(catalog.id)}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
