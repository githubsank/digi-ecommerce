"use server";

import { supabase, type Product, type Category } from "@/lib/supabaseClient";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data as Product[];
}

export async function getProductsByCategory(category: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }

  return data as Product[];
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("title", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data as Category[];
}

export async function getFeaturedProducts(limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("rating", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data as Product[];
}

export async function getDeals(limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .not("original_price", "is", null)
    .order("original_price", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching deals:", error);
    return [];
  }

  return data as Product[];
}

// Admin actions
export async function createProduct(
  product: Omit<Product, "id" | "created_at">
) {
  const { data, error } = await supabase
    .from("products")
    .insert([product])
    .select();

  if (error) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function updateProduct(id: number, product: Partial<Product>) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function deleteProduct(id: number) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function createCategory(category: Omit<Category, "id">) {
  const { data, error } = await supabase
    .from("categories")
    .insert([category])
    .select();

  if (error) {
    console.error("Error creating category:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
