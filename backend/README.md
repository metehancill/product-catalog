# Catalog API - .NET Core Backend

A RESTful API built with .NET Core 8.0 and SQL Server LocalDB for managing product catalogs.

## Prerequisites

- .NET 8.0 SDK or later
- SQL Server LocalDB (included with Visual Studio or can be installed separately)
- Your favorite IDE (Visual Studio, VS Code, or Rider)

## Setup Instructions

### 1. Install .NET 8.0 SDK

Download and install from: https://dotnet.microsoft.com/download/dotnet/8.0

### 2. Install SQL Server LocalDB

LocalDB comes with Visual Studio, or download separately:
https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb

Verify installation:
```bash
sqllocaldb info
```

### 3. Database Connection

The application is configured to use SQL Server LocalDB with the database name `YILDIZLAR`.

Connection string (already configured in `appsettings.json`):
```
Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=YILDIZLAR;Integrated Security=True
```

No password needed - Windows Authentication is used automatically.

### 4. Install Dependencies

```bash
cd backend
dotnet restore
```

### 5. Create Database Using Entity Framework Migrations

The easiest way to create the database is using Entity Framework migrations:

```bash
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
```

This will:
- Create the `YILDIZLAR` database automatically
- Create `Categories` and `Products` tables
- Add all necessary indexes and relationships

**Alternative: Use SQL Script**

If you prefer to use the SQL script directly, connect to LocalDB and run:
```bash
sqlcmd -S "(localdb)\MSSQLLocalDB" -i database_schema.sql
```

### 6. Run the API

```bash
dotnet run
```

The API will start on `http://localhost:5000` by default.

To run on a different port:

```bash
dotnet run --urls "http://localhost:5000"
```

### 7. Test the API

Open your browser and navigate to:
- API: `http://localhost:5000/api/products`
- Swagger UI: `http://localhost:5000/swagger`

## API Endpoints

### Products

- `GET /api/products` - Get all active products
- `GET /api/products/{id}` - Get a specific product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update an existing product
- `DELETE /api/products/{id}` - Soft delete a product (marks as inactive)

### Categories

- `GET /api/categories` - Get all active categories
- `GET /api/categories/{id}` - Get a specific category with its products
- `POST /api/categories` - Create a new category
- `PUT /api/categories/{id}` - Update an existing category
- `DELETE /api/categories/{id}` - Soft delete a category (marks as inactive)

## Project Structure

```
backend/
├── Controllers/          # API controllers
│   ├── ProductsController.cs
│   └── CategoriesController.cs
├── Data/                 # Database context
│   └── ApplicationDbContext.cs
├── Models/               # Entity models
│   ├── Product.cs
│   └── Category.cs
├── Program.cs            # Application entry point
├── CatalogApi.csproj     # Project file
├── appsettings.json      # Configuration
└── database_schema.sql   # Database schema
```

## Development

### Building the Project

```bash
dotnet build
```

### Running Tests

```bash
dotnet test
```

### Publishing for Production

```bash
dotnet publish -c Release -o ./publish
```

## Environment Variables

You can override the connection string using environment variables:

```bash
# Windows
set ConnectionStrings__DefaultConnection="Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=YILDIZLAR;Integrated Security=True"

# Linux/Mac (if using SQL Server on those platforms)
export ConnectionStrings__DefaultConnection="Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=YILDIZLAR;Integrated Security=True"
```

## CORS Configuration

The API is configured to allow all origins for development. For production, update the CORS policy in `Program.cs` to restrict origins:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins("https://yourdomain.com")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
```

## Troubleshooting

### Connection Issues

If you get a connection error:
1. Verify LocalDB is installed: `sqllocaldb info`
2. Start LocalDB instance if needed: `sqllocaldb start MSSQLLocalDB`
3. Check if database exists: `sqlcmd -S "(localdb)\MSSQLLocalDB" -Q "SELECT name FROM sys.databases"`
4. If database doesn't exist, run migrations: `dotnet ef database update`

### Port Already in Use

If port 5000 is already in use, specify a different port:

```bash
dotnet run --urls "http://localhost:5001"
```

And update the React frontend's `.env` file:

```
VITE_API_URL=http://localhost:5001/api
```

## License

MIT
