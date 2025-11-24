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
    try {
      console.log('Fetching products from:', `${API_URL}/products.php`);
      const response = await fetch(`${API_URL}/products.php`);
      if (!response.ok) {
        console.error('API Response not OK:', response.status, response.statusText);
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const data = await response.json();
      console.log('Products fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProduct(id: number): Promise<Product> {
    try {
      console.log('Fetching product from:', `${API_URL}/products.php?id=${id}`);
      const response = await fetch(`${API_URL}/products.php?id=${id}`);
      if (!response.ok) {
        console.error('API Response not OK:', response.status, response.statusText);
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      const data = await response.json();
      console.log('Product fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async getCatalogPDF(): Promise<CatalogPDF | null> {
    try {
      console.log('Fetching catalog from:', `${API_URL}/catalog.php`);
      const response = await fetch(`${API_URL}/catalog.php`);
      if (!response.ok) {
        console.error('API Response not OK:', response.status, response.statusText);
        throw new Error(`Failed to fetch catalog: ${response.status}`);
      }
      const data = await response.json();
      console.log('Catalog fetched:', data);
      return data.catalog || null;
    } catch (error) {
      console.error('Error fetching catalog:', error);
      throw error;
    }
  }
};
