-- Product Catalog Database Schema
-- MySQL Database Schema for cPanel hosting
-- Character Set: utf8mb4

-- ========================================
-- PRODUCTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- CATALOG_PDF TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS `catalog_pdf` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `file_url` VARCHAR(500) NOT NULL,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- SAMPLE DATA (Optional)
-- ========================================

-- Sample Products
INSERT INTO `products` (`name`, `description`, `image_url`) VALUES
('Sample Product 1', 'This is a sample product description', 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'),
('Sample Product 2', 'Another sample product description', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'),
('Sample Product 3', 'Third sample product description', 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg');

-- Sample Catalog PDF (Update with your actual PDF URL)
-- INSERT INTO `catalog_pdf` (`file_url`) VALUES ('https://yourdomain.com/uploads/catalog.pdf');
