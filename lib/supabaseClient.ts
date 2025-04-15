// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import { Key } from "readline";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for our database
export type Product = {
  name: string;
  product_id: Key | null | undefined;
  id: any;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  rating: number;
  image_url: string;
  category: string;
  badge?: string;
  created_at?: string;
};
export type Category = {
  id: number;
  name: string;
  title: string;
  image_url?: string;
  slug: string;
  created_at?: string;
};
