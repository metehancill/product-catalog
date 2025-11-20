// src/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ENV değişkenlerini al
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Güvenli Supabase oluşturucu
let supabase: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "%c[Supabase Disabled] %cVITE_SUPABASE_URL veya VITE_SUPABASE_ANON_KEY tanımlı değil. Supabase devre dışı.",
    "color: orange; font-weight: bold;",
    "color: inherit;"
  );
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Default export yerine "named" export kullanıyoruz
export { supabase };

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};
