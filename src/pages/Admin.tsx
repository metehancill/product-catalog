import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Trash2, FileText, CheckCircle, XCircle } from 'lucide-react';

type CatalogPDF = {
  id: string;
  title: string;
  file_url: string;
  file_name: string;
  file_size: number;
  is_active: boolean;
  created_at: string;
};

export default function Admin() {
  const [pdfs, setPdfs] = useState<CatalogPDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadPDFs();
  }, []);

  const loadPDFs = async () => {
    try {
      const { data, error } = await supabase
        .from('catalog_pdfs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPdfs(data || []);
    } catch (error) {
      console.error('PDFler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setMessage(null);
    } else {
      setMessage({ type: 'error', text: 'Lütfen geçerli bir PDF dosyası seçin' });
      setSelectedFile(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !title.trim()) {
      setMessage({ type: 'error', text: 'Lütfen başlık ve dosya seçin' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `catalogs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('catalog-files')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('catalog-files')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('catalog_pdfs')
        .insert({
          title: title.trim(),
          file_url: publicUrl,
          file_name: selectedFile.name,
          file_size: selectedFile.size,
          is_active: true,
        });

      if (dbError) throw dbError;

      setMessage({ type: 'success', text: 'PDF başarıyla yüklendi!' });
      setTitle('');
      setSelectedFile(null);
      loadPDFs();
    } catch (error: any) {
      console.error('Yükleme hatası:', error);
      setMessage({ type: 'error', text: error.message || 'Yükleme sırasında hata oluştu' });
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (pdf: CatalogPDF) => {
    try {
      const { error } = await supabase
        .from('catalog_pdfs')
        .update({ is_active: !pdf.is_active })
        .eq('id', pdf.id);

      if (error) throw error;
      loadPDFs();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
    }
  };

  const handleDelete = async (pdf: CatalogPDF) => {
    if (!confirm('Bu kataloğu silmek istediğinize emin misiniz?')) return;

    try {
      const filePath = pdf.file_url.split('/').slice(-2).join('/');

      await supabase.storage
        .from('catalog-files')
        .remove([filePath]);

      const { error } = await supabase
        .from('catalog_pdfs')
        .delete()
        .eq('id', pdf.id);

      if (error) throw error;
      loadPDFs();
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Katalog Yönetimi</h1>
          <p className="text-gray-600">E-Katalog PDF dosyalarını yükleyin ve yönetin</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Yeni Katalog Yükle</h2>

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Katalog Başlığı
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Örn: 2024 Ürün Kataloğu"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF Dosyası
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-600 transition-colors">
                    <div className="text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : 'PDF dosyası seçin'}
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
              {selectedFile && (
                <p className="text-sm text-gray-500 mt-2">
                  Boyut: {formatFileSize(selectedFile.size)}
                </p>
              )}
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !selectedFile || !title.trim()}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Yükleniyor...</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Yükle</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">Yüklenen Kataloglar</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : pdfs.length > 0 ? (
            <div className="divide-y">
              {pdfs.map((pdf) => (
                <div key={pdf.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center space-x-4 flex-1">
                    <FileText className="h-10 w-10 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{pdf.title}</h3>
                      <p className="text-sm text-gray-600">
                        {pdf.file_name} • {formatFileSize(pdf.file_size)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(pdf.created_at).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleActive(pdf)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center space-x-2 ${
                        pdf.is_active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {pdf.is_active ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <span>Aktif</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" />
                          <span>Pasif</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(pdf)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Henüz katalog yüklenmemiş</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
