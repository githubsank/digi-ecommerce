"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase, type Category } from "@/lib/supabaseClient";

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const categoryId = parseInt(params.id);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategory = async () => {
      if (isNaN(categoryId)) {
        router.push("/admin/categories");
        return;
      }

      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", categoryId)
        .single();

      if (error) {
        console.error("Error fetching category:", error);
        alert("Failed to load category");
        router.push("/admin/categories");
        return;
      }

      if (data) {
        setCategory(data);
        setName(data.name);
        setSlug(data.slug || "");
        setImageUrl(data.image_url || "");
      }

      setLoading(false);
    };

    fetchCategory();
  }, [categoryId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      alert("Category name is required");
      return;
    }
    
    setSaving(true);
    
    // Generate slug if not provided
    const finalSlug = slug || name.toLowerCase().replace(/\s+/g, "-");
    
    const { data, error } = await supabase
      .from("categories")
      .update({
        name,
        slug: finalSlug,
        image_url: imageUrl || null
      })
      .eq("id", categoryId)
      .select();
    
    setSaving(false);
    
    if (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category");
    } else {
      router.push("/admin/categories");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
        <div className="text-center py-8">Loading category...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug (optional - will be generated from name if empty)
          </Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. televisions"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL (optional)</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img
                src={imageUrl}
                alt="Category preview"
                className="h-40 w-40 object-cover rounded border"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200";
                }}
              />
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Link href="/admin/categories">
            <Button type="button">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}