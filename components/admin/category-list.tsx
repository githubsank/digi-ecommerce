"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import type { Category } from "@/lib/supabase"
import { getCategories } from "@/app/actions"
import CategoryForm from "./category-form"

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const fetchCategories = async () => {
    setLoading(true)
    const data = await getCategories()
    setCategories(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (loading) {
    return <div>Loading categories...</div>
  }

  if (editingCategory) {
    return (
      <div>
        <Button variant="outline" onClick={() => setEditingCategory(null)} className="mb-4">
          Back to Categories
        </Button>
        <CategoryForm
          category={editingCategory}
          onSuccess={() => {
            setEditingCategory(null)
            fetchCategories()
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Category List</h2>
      {categories.length === 0 ? (
        <p>No categories found. Add your first category above.</p>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.title}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setEditingCategory(category)}>
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
