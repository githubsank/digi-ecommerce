"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const setupDatabase = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Create products table
      const { error: productsError } = await supabase.rpc(
        "create_products_table",
        {}
      );

      if (productsError) {
        // If RPC doesn't exist, create tables manually
        const { error: createProductsError } = await supabase.query(`
          CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            price NUMERIC NOT NULL,
            original_price NUMERIC,
            rating NUMERIC DEFAULT 4.0,
            image_url TEXT,
            category TEXT,
            badge TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )
        `);

        if (createProductsError) {
          throw createProductsError;
        }
      }

      // Create categories table
      const { error: categoriesError } = await supabase.rpc(
        "create_categories_table",
        {}
      );

      if (categoriesError) {
        // If RPC doesn't exist, create tables manually
        const { error: createCategoriesError } = await supabase.query(`
          CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            image_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          )
        `);

        if (createCategoriesError) {
          throw createCategoriesError;
        }
      }

      // Insert sample data
      const { error: insertError } = await supabase
        .from("categories")
        .insert([
          {
            title: "Televisions",
            slug: "televisions",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            title: "Laptops",
            slug: "laptops",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            title: "Smartphones",
            slug: "smartphones",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            title: "Refrigerators",
            slug: "refrigerators",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            title: "Washing Machines",
            slug: "washing-machines",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            title: "Air Conditioners",
            slug: "air-conditioners",
            image_url: "/placeholder.svg?height=200&width=200",
          },
        ])
        .select();

      if (insertError) {
        console.log("Categories may already exist, continuing...");
      }

      // Insert sample products
      const { error: insertProductsError } = await supabase
        .from("products")
        .insert([
          {
            title: "Samsung 55-inch 4K Smart TV",
            description: "Experience stunning 4K resolution and smart features",
            price: 49999,
            original_price: 59999,
            rating: 4.5,
            image_url: "/placeholder.svg?height=300&width=300",
            category: "televisions",
          },
          {
            title: "Apple iPhone 14 Pro",
            description: "The latest iPhone with advanced camera system",
            price: 119900,
            original_price: 129900,
            rating: 4.8,
            image_url: "/placeholder.svg?height=300&width=300",
            category: "smartphones",
          },
          {
            title: "Dell XPS 13 Laptop",
            description: "Powerful and portable laptop for professionals",
            price: 89990,
            original_price: 99990,
            rating: 4.6,
            image_url: "/placeholder.svg?height=300&width=300",
            category: "laptops",
          },
          {
            title: "Sony WH-1000XM5 Headphones",
            description: "Premium noise-cancelling headphones",
            price: 29990,
            original_price: 34990,
            rating: 4.7,
            image_url: "/placeholder.svg?height=300&width=300",
            category: "accessories",
          },
        ])
        .select();

      if (insertProductsError) {
        console.log("Products may already exist, continuing...");
      }

      setMessage(
        "Database setup completed successfully! You can now use the admin dashboard to manage products and categories."
      );
    } catch (err) {
      console.error("Setup error:", err);
      setError(
        "An error occurred during setup. Please check the console for details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Supabase Database Setup</CardTitle>
          <CardDescription>
            This will create the necessary tables and sample data in your
            Supabase database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Click the button below to set up your database. This should only be
            done once.
          </p>
          {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={setupDatabase} disabled={loading} className="w-full">
            {loading ? "Setting up..." : "Setup Database"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
