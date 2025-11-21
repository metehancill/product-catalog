/*
  # Create Catalog PDFs Table

  1. New Tables
    - `catalog_pdfs`
      - `id` (uuid, primary key)
      - `title` (text) - PDF title/name
      - `file_url` (text) - URL to the PDF file in storage
      - `file_name` (text) - Original file name
      - `file_size` (bigint) - File size in bytes
      - `is_active` (boolean) - Whether this PDF should be displayed
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `catalog_pdfs` table
    - Add policy for public read access (catalog is public)
    - Add policy for authenticated users to manage PDFs (admin functionality)
*/

CREATE TABLE IF NOT EXISTS catalog_pdfs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size bigint DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE catalog_pdfs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active catalog PDFs"
  ON catalog_pdfs
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert catalog PDFs"
  ON catalog_pdfs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update catalog PDFs"
  ON catalog_pdfs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete catalog PDFs"
  ON catalog_pdfs
  FOR DELETE
  TO authenticated
  USING (true);