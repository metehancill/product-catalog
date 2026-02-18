# Ürün Kataloğu Uygulaması

Modern, responsive ürün kataloğu uygulaması. React + TypeScript + Vite frontend ve .NET 8 + SQL Server backend.

## Özellikler

- Ürün listeleme ve detay sayfaları
- E-Katalog (PDF) görüntüleme
- Yönetim paneli (PDF yükleme/yönetim)
- Türkçe/İngilizce dil desteği
- Responsive tasarım
- RESTful API

## Hızlı Başlangıç

### Gereksinimler

- .NET 8.0 SDK
- SQL Server 2019+
- Node.js 18+
- npm

### Backend Kurulumu

1. **Veritabanı oluştur:**
   ```bash
   sqlcmd -S localhost -U sa -P YourPassword -i backend/database_schema.sql
   ```

2. **Veritabanı bağlantısı ayarla:**
   - `backend/appsettings.Development.json` dosyasını düzenle
   - Connection string'i güncelle

3. **Backend başlat:**
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```
   - API: `http://localhost:5000`
   - Swagger: `http://localhost:5000/swagger`

### Frontend Kurulumu

1. **Bağımlılıkları kur:**
   ```bash
   npm install
   ```

2. **Environment ayarı:**
   - `.env` dosyasını kontrol et
   - `VITE_API_URL=http://localhost:5000/api`

3. **Frontend başlat:**
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`

## Proje Yapısı

```
project/
├── backend/                 # .NET Core API
│   ├── Controllers/         # API endpoints
│   │   ├── ProductsController.cs
│   │   ├── CategoriesController.cs
│   │   └── CatalogsController.cs
│   ├── Models/              # Veri modelleri
│   ├── Data/                # Database context
│   ├── database_schema.sql  # SQL şeması
│   └── appsettings.*.json   # Ayar dosyaları
├── src/                     # React frontend
│   ├── components/          # React bileşenleri
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── pages/               # Sayfa bileşenleri
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Catalog.tsx
│   │   ├── Admin.tsx
│   │   └── ...
│   ├── lib/                 # Yardımcı modüller
│   │   └── api.ts           # API istemcisi
│   └── assets/              # Statik dosyalar
├── .env                     # Environment değişkenleri
└── package.json             # Frontend bağımlılıkları
```

## API Endpoints

### Products
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/{id}` - Ürün detayını getir
- `GET /api/products/category/{categoryId}` - Kategoriye göre ürünleri listele

### Categories
- `GET /api/categories` - Tüm kategorileri listele
- `GET /api/categories/{id}` - Kategori ve ürünlerini getir

### Catalogs
- `GET /api/catalogs` - Tüm katalogları listele
- `GET /api/catalogs/{id}` - Katalog detayını getir
- `POST /api/catalogs` - Yeni katalog yükle
- `DELETE /api/catalogs/{id}` - Katalog sil

## Geliştirme Akışı

1. SQL Server'ı başlat
2. Backend'i başlat: `cd backend && dotnet run`
3. Frontend'i başlat: `npm run dev`
4. Tarayıcı: `http://localhost:5173`

## Production Build

### Backend
```bash
cd backend
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
npm run build
```

Build çıkışı `dist/` klasöründe oluşturulur.

## Admin Paneli

Sayfanın altında "Admin" linkinden erişebilirsiniz.

**Özellikler:**
- PDF Katalog yükleme
- Katalog listeleme
- Katalog silme

PDF dosyaları veritabanına base64 formatında saklanır.

## Dil Desteği

- Türkçe (TR)
- İngilizce (EN)

Dil seçim butonu header'da bulunur.

## Teknoloji Stack

- **Frontend:** React 18, TypeScript, TailwindCSS, Vite
- **Backend:** .NET 8, ASP.NET Core, Entity Framework Core
- **Database:** SQL Server
- **Icons:** Lucide React
