# Complete cPanel Deployment Guide

## Prerequisites
- cPanel hosting account
- Access to phpMyAdmin
- Access to File Manager or FTP

---

## STEP 1: Setup MySQL Database (5 minutes)

### A. Create Database
1. Login to **cPanel**
2. Find and click **MySQL Databases**
3. Under "Create New Database":
   - Database name: `catalog` (or your choice)
   - Click **Create Database**
4. Write down your full database name (usually: `username_catalog`)

### B. Create Database User
1. Scroll to "MySQL Users"
2. Under "Add New User":
   - Username: `catalog_user` (or your choice)
   - Password: Generate strong password
   - Click **Create User**
3. Write down username and password

### C. Add User to Database
1. Scroll to "Add User To Database"
2. Select:
   - User: The user you just created
   - Database: The database you just created
3. Click **Add**
4. On privileges page, check **ALL PRIVILEGES**
5. Click **Make Changes**

---

## STEP 2: Import Database Structure (3 minutes)

### Option A: Using phpMyAdmin SQL Tab (Recommended)
1. In cPanel, click **phpMyAdmin**
2. From left sidebar, select your database
3. Click the **SQL** tab at the top
4. Open `database.sql` file from project
5. **Copy entire contents** of the file
6. **Paste** into the SQL text box
7. Click **Go** button
8. You should see "Success" messages

### Option B: Using phpMyAdmin Import Tab
1. In cPanel, click **phpMyAdmin**
2. From left sidebar, select your database
3. Click **Import** tab
4. Click **Choose File**
5. Select `database.sql` from your computer
6. Scroll down and click **Go**
7. Wait for success message

### Verify Database Setup
1. In phpMyAdmin, click your database name
2. You should see 2 tables:
   - `products` (with 3 sample products)
   - `catalog_pdf` (empty)

---

## STEP 3: Upload PHP API Files (5 minutes)

### A. Create API Folder
1. In cPanel, open **File Manager**
2. Navigate to `public_html`
3. Click **+ Folder** button
4. Name it `api`
5. Click **Create New Folder**

### B. Create config.php
1. Open the `api` folder
2. Click **+ File** button
3. Name it `config.php`
4. Right-click the file → **Edit**
5. Copy this code and **REPLACE THE VALUES**:

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
define('DB_USER', 'username_catalog_user');     // CHANGE THIS
define('DB_PASS', 'your_database_password');    // CHANGE THIS
define('DB_NAME', 'username_catalog');          // CHANGE THIS

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

6. Click **Save Changes**

### C. Create products.php
1. In the `api` folder, click **+ File**
2. Name it `products.php`
3. Right-click → **Edit**
4. Paste this code:

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

5. Click **Save Changes**

### D. Create catalog.php
1. In the `api` folder, click **+ File**
2. Name it `catalog.php`
3. Right-click → **Edit**
4. Paste this code:

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

5. Click **Save Changes**

---

## STEP 4: Test API (2 minutes)

Open these URLs in your browser (replace `yourdomain.com`):

1. **Test Products List:**
   `https://yourdomain.com/api/products.php`

   Should show JSON with 3 sample products

2. **Test Single Product:**
   `https://yourdomain.com/api/products.php?id=1`

   Should show JSON for product #1

3. **Test Catalog:**
   `https://yourdomain.com/api/catalog.php`

   Should show `{"catalog":null}` (because no PDF uploaded yet)

**If you see errors:**
- Check database credentials in `config.php`
- Verify database name is correct
- Make sure tables exist in phpMyAdmin

---

## STEP 5: Build & Upload Frontend (10 minutes)

### A. Update Configuration
On your **local computer**:

1. Open `.env` file in project root
2. Update with your domain:
```
VITE_API_URL=https://yourdomain.com/api
```

### B. Install Dependencies & Build
In your terminal/command prompt:

```bash
npm install
npm run build
```

This creates a `dist` folder with your website files.

### C. Upload Frontend Files
1. In cPanel **File Manager**
2. Go to `public_html`
3. **Delete** any existing `index.html` (if present)
4. Open the `dist` folder on your computer
5. **Select ALL files and folders** inside `dist`
6. **Upload** them to `public_html`
   - Or use FTP client (FileZilla, etc.)
7. Make sure `index.html` is in the root of `public_html`

---

## STEP 6: Setup File Uploads (Optional)

### A. Create Upload Folders
1. In `public_html`, create folder: `uploads`
2. Inside `uploads`, create:
   - `images` folder (for product images)
   - `pdfs` folder (for catalog PDFs)

### B. Set Permissions
1. Right-click each folder → **Change Permissions**
2. Set to `755`

---

## STEP 7: Add Your Products

### Via phpMyAdmin:
1. Go to phpMyAdmin
2. Select your database
3. Click `products` table
4. Click **Insert** tab
5. Fill in:
   - `name`: Your product name
   - `description`: Product description
   - `image_url`: Full URL to image
6. Click **Go**

### Example SQL:
```sql
INSERT INTO products (name, description, image_url) VALUES
('My Product Name',
 'Complete product description here',
 'https://yourdomain.com/uploads/images/product1.jpg');
```

---

## STEP 8: Add Catalog PDF

1. Upload your PDF to `/public_html/uploads/pdfs/`
2. In phpMyAdmin, run this SQL:

```sql
INSERT INTO catalog_pdf (file_url) VALUES
('https://yourdomain.com/uploads/pdfs/catalog.pdf');
```

---

## Testing Your Website

Visit: `https://yourdomain.com`

You should see:
- ✅ Homepage with carousel
- ✅ Products page with your products
- ✅ Product detail pages
- ✅ Catalog page (if PDF uploaded)
- ✅ Navigation working

---

## Troubleshooting

### Website shows blank page:
- Clear browser cache
- Check browser console (F12) for errors
- Verify all files uploaded correctly

### API returns errors:
- Check `config.php` credentials
- Test database connection in phpMyAdmin
- Check PHP error logs in cPanel

### Images not loading:
- Verify image URLs are correct
- Check file permissions (755 for folders, 644 for files)
- Make sure images are uploaded

### Build fails locally:
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Make sure Node.js version is 16 or higher

---

## Updating Content

### Add New Product:
1. Upload image to `/uploads/images/`
2. In phpMyAdmin → products table → Insert
3. Fill name, description, and image URL

### Update Product:
1. phpMyAdmin → products table
2. Click **Edit** icon next to product
3. Modify fields
4. Click **Go**

### Change Catalog PDF:
1. Upload new PDF to `/uploads/pdfs/`
2. phpMyAdmin → catalog_pdf table
3. Update the file_url

---

## Security Tips

- ✅ Use strong database passwords
- ✅ Keep phpMyAdmin access secure
- ✅ Regular backups of database
- ✅ Don't share database credentials
- ✅ Use HTTPS (SSL certificate)

---

## Need Help?

Check these in order:
1. Browser Console (F12 → Console tab)
2. API URLs directly in browser
3. PHP error logs in cPanel
4. Database connection in phpMyAdmin

---

**🎉 Congratulations! Your website is now live!**
