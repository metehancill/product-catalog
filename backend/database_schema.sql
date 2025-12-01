-- Database Schema for Catalog Application
-- SQL Server Database: YILDIZLAR

-- Note: Database will be created automatically by LocalDB
-- USE YILDIZLAR;

-- Categories Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categories')
BEGIN
    CREATE TABLE Categories (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500),
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
    );
    CREATE INDEX idx_categories_isactive ON Categories(IsActive);
END
GO

-- Products Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Products')
BEGIN
    CREATE TABLE Products (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL,
        ShortDescription NVARCHAR(500),
        FullDescription NVARCHAR(MAX),
        Price DECIMAL(18,2) NOT NULL DEFAULT 0,
        ImageUrl NVARCHAR(500),
        CategoryId INT NOT NULL,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
        UpdatedAt DATETIME2,
        CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
    );
    CREATE INDEX idx_products_categoryid ON Products(CategoryId);
    CREATE INDEX idx_products_isactive ON Products(IsActive);
END
GO

-- Sample Data for Categories
IF NOT EXISTS (SELECT * FROM Categories)
BEGIN
    INSERT INTO Categories (Name, Description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Furniture', 'Home and office furniture'),
    ('Clothing', 'Apparel and accessories');
END
GO

-- Sample Data for Products
IF NOT EXISTS (SELECT * FROM Products)
BEGIN
    INSERT INTO Products (Name, ShortDescription, FullDescription, Price, ImageUrl, CategoryId) VALUES
    ('Wireless Headphones', 'Premium wireless headphones with noise cancellation', 'High-quality wireless headphones featuring active noise cancellation, 30-hour battery life, and premium sound quality.', 199.99, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
    ('Smart Watch', 'Feature-rich smartwatch for fitness tracking', 'Advanced smartwatch with heart rate monitoring, GPS tracking, waterproof design, and 7-day battery life.', 299.99, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
    ('Office Chair', 'Ergonomic office chair with lumbar support', 'Professional ergonomic office chair with adjustable height, lumbar support, and breathable mesh back.', 349.99, 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
    ('Standing Desk', 'Adjustable height standing desk', 'Electric standing desk with memory presets, sturdy construction, and cable management system.', 599.99, 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
    ('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 'Premium quality cotton t-shirt available in multiple colors and sizes. Soft, breathable, and durable.', 29.99, 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800', 3),
    ('Denim Jeans', 'Classic fit denim jeans', 'Timeless denim jeans with classic fit, reinforced stitching, and comfortable stretch fabric.', 79.99, 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800', 3);
END
GO
