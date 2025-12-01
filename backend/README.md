# Catalog API - .NET Core Backend

A RESTful API built with .NET Core 8.0 and MySQL for managing product catalogs.

## Prerequisites

- .NET 8.0 SDK or later
- MySQL Server 8.0 or later
- Your favorite IDE (Visual Studio, VS Code, or Rider)

## Setup Instructions

### 1. Install .NET 8.0 SDK

Download and install from: https://dotnet.microsoft.com/download/dotnet/8.0

### 2. Setup MySQL Database

1. Install MySQL Server if not already installed
2. Create the database and tables:

```bash
mysql -u root -p < database_schema.sql
```

Or manually create the database:
- Database name: `catalog_db`
- Run the SQL script in `database_schema.sql`

### 3. Configure Database Connection

Update the connection string in `appsettings.json` or `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=catalog_db;User=root;Password=yourpassword;"
  }
}
```

Replace:
- `localhost` with your MySQL server address
- `root` with your MySQL username
- `yourpassword` with your MySQL password

### 4. Install Dependencies

```bash
cd backend
dotnet restore
```

### 5. Run Database Migrations (Optional)

If you want to use Entity Framework migrations instead of the SQL script:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
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

You can also configure the connection string using environment variables:

```bash
export ConnectionStrings__DefaultConnection="Server=localhost;Database=catalog_db;User=root;Password=yourpassword;"
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
1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check your connection string credentials
3. Ensure the database exists: `mysql -u root -p -e "SHOW DATABASES;"`

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
