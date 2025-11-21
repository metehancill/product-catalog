# Quick Start Guide - 5 Minutes Setup

## What You Need
- ✅ cPanel access
- ✅ phpMyAdmin access
- ✅ This project folder

---

## Step 1: Database Setup (2 min)

### A. Create Database in cPanel
1. cPanel → **MySQL Databases**
2. Create database (name it: `catalog`)
3. Create user with strong password
4. Add user to database with **ALL PRIVILEGES**
5. **WRITE DOWN:** Database name, username, password

### B. Import Database in phpMyAdmin
1. cPanel → **phpMyAdmin**
2. Select your database from left
3. Click **SQL** tab
4. Open `database.sql` file from project
5. **Copy ALL text** → Paste in SQL box
6. Click **Go**
7. ✅ Success! You should see 2 tables with 3 sample products

---

## Step 2: Upload PHP API (2 min)

1. cPanel → **File Manager**
2. Go to `public_html`
3. Create folder: `api`
4. Upload these 3 files to the `api` folder:
   - `config.php`
   - `products.php`
   - `catalog.php`

5. Edit `api/config.php`:
   - Replace `your_username` with your DB username
   - Replace `your_password` with your DB password
   - Replace `your_database` with your DB name

---

## Step 3: Test API (30 sec)

Visit in browser (replace yourdomain.com):
- `https://yourdomain.com/api/products.php`

Should show JSON with 3 products ✅

---

## Step 4: Build Frontend (1 min)

On your computer:

1. Edit `.env` file:
```
VITE_API_URL=https://yourdomain.com/api
```

2. Run:
```bash
npm install
npm run build
```

---

## Step 5: Upload Website (1 min)

1. In cPanel File Manager → `public_html`
2. Open `dist` folder on your computer
3. Upload **ALL files** from inside `dist` to `public_html`
4. Make sure `index.html` is in root

---

## ✅ DONE!

Visit: `https://yourdomain.com`

Your website is live!

---

## Next Steps

### Add Your Products
1. phpMyAdmin → `products` table → **Insert**
2. Fill: name, description, image_url
3. Click **Go**

### Add PDF Catalog
1. Upload PDF to `/public_html/uploads/pdfs/catalog.pdf`
2. In phpMyAdmin:
```sql
INSERT INTO catalog_pdf (file_url) VALUES
('https://yourdomain.com/uploads/pdfs/catalog.pdf');
```

---

## Troubleshooting

**Problem:** API shows error
- **Fix:** Check credentials in `api/config.php`

**Problem:** Website is blank
- **Fix:** Clear browser cache, check `.env` was set correctly

**Problem:** Images don't load
- **Fix:** Check image URLs are complete with `https://`

---

## Need More Help?

See `DEPLOY-INSTRUCTIONS.md` for detailed explanations.
