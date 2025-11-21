-- ============================================
-- Product Catalog Database Schema
-- For cPanel + MySQL + phpMyAdmin
-- ============================================
--
-- INSTRUCTIONS:
-- 1. Open phpMyAdmin in your cPanel
-- 2. Select your database from the left sidebar
-- 3. Click the "SQL" tab at the top
-- 4. Copy and paste this entire file
-- 5. Click "Go" button to execute
--
-- ============================================

-- Drop tables if they exist (for clean install)
DROP TABLE IF EXISTS `catalog_pdf`;
DROP TABLE IF EXISTS `products`;

-- ============================================
-- PRODUCTS TABLE
-- ============================================
-- Stores all product information
-- Fields: id, name, description, image_url, timestamps

CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CATALOG_PDF TABLE
-- ============================================
-- Stores PDF catalog file URL
-- Only one active catalog at a time

CREATE TABLE `catalog_pdf` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `file_url` VARCHAR(500) NOT NULL,
  `uploaded_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SAMPLE DATA
-- ============================================
-- Insert sample products for testing

INSERT INTO `products` (`name`, `description`, `image_url`) VALUES
('Sample Product 1', 'This is the first sample product with a detailed description. It demonstrates how products will appear in your catalog.', 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Sample Product 2', 'This is the second sample product. You can replace these sample products with your real products through phpMyAdmin.', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'),
('Sample Product 3', 'This is the third sample product. Each product can have a unique image URL pointing to your uploaded images.', 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Sample catalog PDF (uncomment and update with your actual PDF URL)
-- INSERT INTO `catalog_pdf` (`file_url`) VALUES ('https://yourdomain.com/uploads/catalog.pdf');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify the installation:

-- Check if tables were created
-- SHOW TABLES;

-- View products
-- SELECT * FROM products;

-- View catalog
-- SELECT * FROM catalog_pdf;

-- ============================================
-- SUCCESS!
-- Your database is now ready to use.
-- ============================================
