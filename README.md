# Product Catalog Website

A modern, responsive product catalog website built with React + TypeScript + Vite, designed for cPanel hosting with MySQL database.

## Features

- Product listing and detail pages
- PDF catalog viewer
- Responsive design
- Simple MySQL backend with PHP API
- Easy to deploy on any cPanel hosting

## Quick Start

### For Development
```bash
npm install
npm run dev
```

### For Production
See `DEPLOY-INSTRUCTIONS.md` for complete deployment guide.

## Tech Stack

- **Frontend:** React 18, TypeScript, TailwindCSS, Vite
- **Backend:** PHP 7.4+, MySQL 5.7+
- **Hosting:** cPanel compatible

## Files

- `database.sql` - Complete database structure
- `DEPLOY-INSTRUCTIONS.md` - Step-by-step deployment guide
- `CPANEL-SETUP.md` - Additional setup information
- `api/` - PHP API endpoints

## Database Structure

### Tables

**products**
- id, name, description, image_url
- Stores all product information

**catalog_pdf**
- id, file_url, uploaded_at
- Stores PDF catalog reference

## Deployment

1. Create MySQL database in cPanel
2. Import `database.sql` in phpMyAdmin
3. Upload PHP files to `/public_html/api/`
4. Configure database in `api/config.php`
5. Build frontend: `npm run build`
6. Upload `dist/` contents to `/public_html/`

Full instructions in `DEPLOY-INSTRUCTIONS.md`

## Support

For issues during deployment:
- Check PHP error logs in cPanel
- Verify database credentials
- Test API endpoints directly
- Check browser console for frontend errors
