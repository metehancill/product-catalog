-- Database Schema for Catalog Application
-- MySQL Database: catalog_db

CREATE DATABASE IF NOT EXISTS catalog_db;
USE catalog_db;

-- Categories Table
CREATE TABLE IF NOT EXISTS Categories (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description VARCHAR(500),
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_categories_isactive (IsActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products Table
CREATE TABLE IF NOT EXISTS Products (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    ShortDescription VARCHAR(500),
    FullDescription TEXT,
    Price DECIMAL(18,2) NOT NULL DEFAULT 0,
    ImageUrl VARCHAR(500),
    CategoryId INT NOT NULL,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE,
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id) ON DELETE RESTRICT,
    INDEX idx_products_categoryid (CategoryId),
    INDEX idx_products_isactive (IsActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Data for Categories
INSERT INTO Categories (Name, Description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Furniture', 'Home and office furniture'),
('Clothing', 'Apparel and accessories');

-- Sample Data for Products
INSERT INTO Products (Name, ShortDescription, FullDescription, Price, ImageUrl, CategoryId) VALUES
('Wireless Headphones', 'Premium wireless headphones with noise cancellation', 'High-quality wireless headphones featuring active noise cancellation, 30-hour battery life, and premium sound quality.', 199.99, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
('Smart Watch', 'Feature-rich smartwatch for fitness tracking', 'Advanced smartwatch with heart rate monitoring, GPS tracking, waterproof design, and 7-day battery life.', 299.99, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
('Office Chair', 'Ergonomic office chair with lumbar support', 'Professional ergonomic office chair with adjustable height, lumbar support, and breathable mesh back.', 349.99, 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
('Standing Desk', 'Adjustable height standing desk', 'Electric standing desk with memory presets, sturdy construction, and cable management system.', 599.99, 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 'Premium quality cotton t-shirt available in multiple colors and sizes. Soft, breathable, and durable.', 29.99, 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800', 3),
('Denim Jeans', 'Classic fit denim jeans', 'Timeless denim jeans with classic fit, reinforced stitching, and comfortable stretch fabric.', 79.99, 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800', 3);
