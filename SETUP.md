# Setup Guide - Catalog Application

This application uses React for the frontend and .NET Core with MySQL for the backend.

## Quick Start

### Backend Setup

1. **Install .NET 8.0 SDK**
   - Download from: https://dotnet.microsoft.com/download/dotnet/8.0

2. **Install MySQL Server**
   - Download from: https://dev.mysql.com/downloads/mysql/

3. **Create Database**
   ```bash
   mysql -u root -p < backend/database_schema.sql
   ```

4. **Configure Connection**
   - Edit `backend/appsettings.json`
   - Update the connection string with your MySQL credentials

5. **Run Backend**
   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```
   - Backend will run on `http://localhost:5000`
   - API docs available at `http://localhost:5000/swagger`

### Frontend Setup

1. **Install Node.js**
   - Download from: https://nodejs.org/ (LTS version)

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Update `VITE_API_URL` if backend runs on different port

4. **Run Frontend**
   ```bash
   npm run dev
   ```
   - Frontend will run on `http://localhost:5173`

## Project Structure

```
project/
├── backend/              # .NET Core API
│   ├── Controllers/      # API endpoints
│   ├── Models/           # Data models
│   ├── Data/             # Database context
│   ├── database_schema.sql
│   └── README.md         # Backend documentation
├── src/                  # React frontend
│   ├── components/       # React components
│   ├── pages/            # Page components
│   └── lib/              # API client
├── .env                  # Environment variables
└── package.json          # Frontend dependencies
```

## API Endpoints

The backend provides RESTful endpoints:

- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/categories` - List all categories
- `GET /api/categories/{id}` - Get category with products

## Development Workflow

1. Start MySQL server
2. Start backend API: `cd backend && dotnet run`
3. Start frontend dev server: `npm run dev`
4. Open browser to `http://localhost:5173`

## Building for Production

### Backend
```bash
cd backend
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
npm run build
```

The build output will be in the `dist/` folder.

## Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify connection string in `appsettings.json`
- Ensure database `catalog_db` exists

### Frontend can't connect to API
- Verify backend is running on correct port
- Check `.env` file has correct `VITE_API_URL`
- Clear browser cache and hard refresh

### CORS errors
- Backend has CORS enabled for all origins in development
- For production, update CORS policy in `backend/Program.cs`

## Additional Resources

- .NET Core Documentation: https://docs.microsoft.com/dotnet/core/
- React Documentation: https://react.dev/
- MySQL Documentation: https://dev.mysql.com/doc/
