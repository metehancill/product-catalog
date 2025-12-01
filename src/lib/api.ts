const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export type Product = {
  id: number;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  category?: {
    id: number;
    name: string;
    description?: string;
  };
};

export type Category = {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  products?: Product[];
};

export type CatalogPDF = {
  id: number;
  title: string;
  description?: string;
  pdfBase64: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
};

export const api = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category'>): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async updateProduct(id: number, product: Omit<Product, 'createdAt' | 'category'>): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  async deleteProduct(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getCategory(id: number): Promise<Category> {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch category: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  },

  async getCatalogs(): Promise<CatalogPDF[]> {
    try {
      const response = await fetch(`${API_URL}/catalogs`);
      if (!response.ok) {
        throw new Error(`Failed to fetch catalogs: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching catalogs:', error);
      throw error;
    }
  },

  async getCatalog(id: number): Promise<CatalogPDF> {
    try {
      const response = await fetch(`${API_URL}/catalogs/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch catalog: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching catalog:', error);
      throw error;
    }
  },

  async uploadCatalog(formData: FormData): Promise<CatalogPDF> {
    try {
      const response = await fetch(`${API_URL}/catalogs`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Failed to upload catalog: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading catalog:', error);
      throw error;
    }
  },

  async deleteCatalog(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/catalogs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete catalog: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting catalog:', error);
      throw error;
    }
  },
};
