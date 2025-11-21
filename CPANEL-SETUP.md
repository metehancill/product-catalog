# cPanel + MySQL Setup Guide

## Complete Setup Instructions

### Step 1: Create MySQL Database

1. **Log in to cPanel**
2. **Go to MySQL Databases**
3. **Create New Database:**
   - Database name: `catalog` (or any name you prefer)
   - Click "Create Database"

4. **Create MySQL User:**
   - Username: Choose a username
   - Password: Create a strong password
   - Click "Create User"

5. **Add User to Database:**
   - Select the user and database
   - Check "ALL PRIVILEGES"
   - Click "Make Changes"

### Step 2: Import Database Schema

1. **Go to phpMyAdmin** in cPanel
2. **Select your database** from the left sidebar
3. **Click the "SQL" tab**
4. **Copy and paste this SQL:**

```sql
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `catalog_pdf` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `file_url` VARCHAR(500) NOT NULL,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `products` (`name`, `description`, `image_url`) VALUES
('Sample Product 1', 'This is a sample product description', 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'),
('Sample Product 2', 'Another sample product description', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'),
('Sample Product 3', 'Third sample product description', 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg');
```

5. **Click "Go"** to execute

### Step 3: Upload API Files

1. **In cPanel, go to File Manager**
2. **Navigate to public_html**
3. **Create a folder named "api"**
4. **Upload these 3 PHP files to the api folder:**

**File: api/config.php**
```php
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

define('DB_HOST', 'localhost');
define('DB_USER', 'your_mysql_username');  // CHANGE THIS
define('DB_PASS', 'your_mysql_password');  // CHANGE THIS
define('DB_NAME', 'your_database_name');   // CHANGE THIS

function getConnection() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }
        $conn->set_charset("utf8mb4");
        return $conn;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed']);
        exit();
    }
}
```

**File: api/products.php**
```php
<?php
require_once 'config.php';

$conn = getConnection();

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT id, name, description, image_url FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Product not found']);
    }
    $stmt->close();
} else {
    $result = $conn->query("SELECT id, name, description, image_url FROM products ORDER BY id DESC");
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
}
$conn->close();
```

**File: api/catalog.php**
```php
<?php
require_once 'config.php';

$conn = getConnection();
$result = $conn->query("SELECT id, file_url, uploaded_at FROM catalog_pdf ORDER BY uploaded_at DESC LIMIT 1");

if ($row = $result->fetch_assoc()) {
    echo json_encode(['catalog' => $row]);
} else {
    echo json_encode(['catalog' => null]);
}
$conn->close();
```

### Step 4: Configure API

Edit `api/config.php` and update:
- `DB_USER`: Your MySQL username
- `DB_PASS`: Your MySQL password
- `DB_NAME`: Your database name

### Step 5: Test API

Visit these URLs to test:
- `https://yourdomain.com/api/products.php` - Should show products JSON
- `https://yourdomain.com/api/catalog.php` - Should show catalog JSON

### Step 6: Build Frontend

On your computer:

1. Update `.env` file:
```
VITE_API_URL=https://yourdomain.com/api
```

2. Install and build:
```bash
npm install
npm run build
```

3. A `dist` folder will be created

### Step 7: Upload Frontend

1. **In cPanel File Manager**
2. **Go to public_html**
3. **Upload all files from the `dist` folder**
4. Make sure `index.html` is in the root of public_html

### Step 8: Upload Files (Images & PDFs)

1. **Create uploads folder:** `/public_html/uploads/`
2. **Create subfolders:**
   - `/public_html/uploads/images/`
   - `/public_html/uploads/pdfs/`

3. **Set permissions to 755**

### Adding Products

**Via phpMyAdmin:**
1. Go to phpMyAdmin → your database → products table
2. Click "Insert"
3. Fill in:
   - name: Product name
   - description: Product description
   - image_url: `https://yourdomain.com/uploads/images/yourimage.jpg`

**Example:**
```sql
INSERT INTO products (name, description, image_url) VALUES
('My Product', 'Product description here', 'https://yourdomain.com/uploads/images/product1.jpg');
```

### Adding Catalog PDF

1. Upload your PDF to `/uploads/pdfs/catalog.pdf`
2. In phpMyAdmin, run:
```sql
INSERT INTO catalog_pdf (file_url) VALUES
('https://yourdomain.com/uploads/pdfs/catalog.pdf');
```

## Troubleshooting

**API returns errors:**
- Check database credentials in `api/config.php`
- Verify database tables exist
- Check PHP error logs in cPanel

**Images not showing:**
- Verify file uploaded correctly
- Check file permissions (644 for files, 755 for folders)
- Ensure URL in database is correct

**Frontend not loading:**
- Clear browser cache
- Check that `index.html` is in public_html root
- Verify API URL in built files

## Database Structure

**products table:**
- id (int, auto_increment)
- name (varchar 255)
- description (text)
- image_url (varchar 500)
- created_at (timestamp)
- updated_at (timestamp)

**catalog_pdf table:**
- id (int, auto_increment)
- file_url (varchar 500)
- uploaded_at (timestamp)

## Support

For issues, check:
1. PHP error logs in cPanel
2. Browser console for frontend errors
3. Database connection in phpMyAdmin
