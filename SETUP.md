# Kurulum Rehberi

## Ön Gereksinimler

Aşağıdaki yazılımları yükleyin:

1. **.NET 8.0 SDK**
   - https://dotnet.microsoft.com/download/dotnet/8.0
   - Kontrol: `dotnet --version`

2. **SQL Server 2019 veya üstü**
   - https://www.microsoft.com/en-us/sql-server/sql-server-downloads
   - Windows: SQL Server Express (free) uygun
   - Linux/Mac: Docker kullanarak `docker run -e ACCEPT_EULA=Y -e SA_PASSWORD=YourPassword -p 1433:1433 -d mcr.microsoft.com/mssql/server`

3. **Node.js 18+**
   - https://nodejs.org/ (LTS version)
   - Kontrol: `node --version` ve `npm --version`

4. **Git (opsiyonel)**
   - https://git-scm.com/

## Backend Kurulumu

### 1. Veritabanı Ayarı

**SQL Server'a bağlan (SSMS veya sqlcmd):**

```bash
# Windows
sqlcmd -S (localdb)\mssqlocaldb -U sa -P YourPassword

# veya
sqlcmd -S localhost -U sa -P YourPassword
```

**Veritabanı şemasını import et:**

```bash
sqlcmd -S (localdb)\mssqlocaldb -U sa -P YourPassword -i backend\database_schema.sql
```

### 2. Bağlantı Stringi Ayarla

`backend/appsettings.Development.json` dosyasını aç:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqlocaldb;Database=YILDIZLAR;Trusted_Connection=true;"
  }
}
```

Veya SQL Server Authentication kullanıyorsan:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=YILDIZLAR;User Id=sa;Password=YourPassword;"
  }
}
```

### 3. Backend'i Başlat

```bash
cd backend
dotnet restore
dotnet run
```

**Çıkış:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
```

**API Swagger UI:** http://localhost:5000/swagger

## Frontend Kurulumu

### 1. Bağımlılıkları Kur

```bash
npm install
```

### 2. Environment Ayarı

`.env` dosyasını kontrol et:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Development Server Başlat

```bash
npm run dev
```

**Çıkış:**
```
  VITE v5.4.2  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Frontend: http://localhost:5173

## Bilgisayarı Kontrol Et

Tüm sistem başladıktan sonra:

1. ✅ SQL Server çalışıyor
2. ✅ Backend: http://localhost:5000 erişilebilir
3. ✅ Swagger UI: http://localhost:5000/swagger
4. ✅ Frontend: http://localhost:5173 erişilebilir

## İlk Kullanım

1. Tarayıcıda: http://localhost:5173
2. Sayfayı gezin, ürünleri görüntüleyin
3. Sayfanın alt kısmında "Admin" linkine tıklayın
4. PDF katalog yükleyin
5. "Katalog" sayfasında PDF'i görüntüleyin

## Sorun Giderme

### Backend başlamıyor
```
❌ "Cannot connect to SQL Server"
```

**Çözüm:**
- SQL Server çalışıyor mu? SQL Server Management Studio ile kontrol et
- Connection string doğru mu? `appsettings.Development.json` kontrol et
- Veritabanı var mı? `SELECT * FROM sys.databases WHERE name='YILDIZLAR'`

### Frontend başlamıyor
```
❌ "Port 5173 already in use"
```

**Çözüm:**
```bash
# Port 5173'ü kullanıyor olan işlemi kapat
# Windows: netstat -ano | findstr :5173
# Veya npm run dev -- --port 5174 ile farklı port kullan
```

### Frontend, Backend'e bağlanamıyor
```
❌ "CORS error" veya "Cannot reach API"
```

**Çözüm:**
- Backend çalışıyor mu? http://localhost:5000/swagger açıp kontrol et
- `.env` dosyasında `VITE_API_URL` doğru mu?
- Tarayıcı DevTools'ta konsol hatasını kontrol et

### PDF yüklenemiyor
```
❌ "Failed to upload catalog"
```

**Çözüm:**
- Dosya PDF mi?
- Dosya boyutu 50MB'dan küçük mü?
- Backend konsol hatasını kontrol et

## Production Deployment

### 1. Build Et

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
cd backend
dotnet publish -c Release -o ./publish
```

### 2. Deploy Et

Hosting sağlayıcıdan sunucuya yükle (IIS, Linux, Azure, vb.)

### 3. Environment Ayarları

Production için `appsettings.json` güncelle:
- Connection string
- CORS politikası
- HTTPS zorunlu kılma

## Özel Notlar

- **Veritabanı Adı:** `YILDIZLAR`
- **Backend Port:** `5000` (değiştirilebilir)
- **Frontend Port:** `5173` (değiştirilebilir)
- **PDF Storage:** Base64 formatında SQL Server'da saklanır
- **Admin Password:** Yok (açık erişim)

## Bağlantılar

- [.NET Documentation](https://docs.microsoft.com/dotnet/)
- [React Documentation](https://react.dev/)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/)
- [Vite Documentation](https://vitejs.dev/)
