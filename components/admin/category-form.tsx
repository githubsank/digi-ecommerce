"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { Category } from "@/lib/supabase"
import { createCategory } from "@/app/actions"

interface CategoryFormProps {
  category?: Category
  onSuccess?: () => void
}

export default function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    title: category?.title || "",
    slug: category?.slug || "",
    image_url: category?.image_url || "/placeholder.svg?height=200&width=200",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Auto-generate slug from title if slug field is empty
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const result = await createCategory(formData)

      if (result.success) {
        setSuccess("Category created successfully!")
        if (onSuccess) {
          onSuccess()
        } else {
          // Reset form if not editing
          if (!category) {
            setFormData({
              title: "",
              slug: "",
              image_url: "/placeholder.svg?height=200&width=200",
            })
          }
        }
      } else {
        setError(result.error || "An error occurred")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category ? "Edit Category" : "Add New Category"}</CardTitle>
        <CardDescription>
          {category ? "Update the category details below" : "Fill in the details to add a new category"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Category Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
            <p className="text-sm text-muted-foreground">Used in URLs, auto-generated from title if left empty</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input id="image_url" name="image_url" value={formData.image_url} onChange={handleChange} required />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : category ? "Update Category" : "Add Category"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
