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
      // Insert sample data for categories
      const { error: insertError } = await supabase
        .from("categories")
        .insert([
          {
            name: "Televisions",
            slug: "televisions",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            name: "Laptops",
            slug: "laptops",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            name: "Smartphones",
            slug: "smartphones",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            name: "Refrigerators",
            slug: "refrigerators",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            name: "Washing Machines",
            slug: "washing-machines",
            image_url: "/placeholder.svg?height=200&width=200",
          },
          {
            name: "Air Conditioners",
            slug: "air-conditioners",
            image_url: "/placeholder.svg?height=200&width=200",
          },
        ])
        .select();

      if (insertError && insertError.code !== '23505') { // Ignore unique constraint violations
        console.log("Error inserting categories:", insertError);
      } else {
        console.log("Categories inserted or already exist");
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

      if (insertProductsError && insertProductsError.code !== '23505') {
        console.log("Error inserting products:", insertProductsError);
      } else {
        console.log("Products inserted or already exist");
      }

      setMessage("Database setup completed successfully! You can now use the admin dashboard to manage products and categories.");
    } catch (err) {
      console.error("Setup error:", err);
      setError("An error occurred during setup. Please check the console for details.");
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
            This will create sample data in your Supabase database.
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
