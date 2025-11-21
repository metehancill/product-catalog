const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/api';

export type Product = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

export type CatalogPDF = {
  id: number;
  file_url: string;
  uploaded_at: string;
};

export const api = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products.php`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/products.php?id=${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async getCatalogPDF(): Promise<CatalogPDF | null> {
    const response = await fetch(`${API_URL}/catalog.php`);
    if (!response.ok) throw new Error('Failed to fetch catalog');
    const data = await response.json();
    return data.catalog || null;
  }
};
