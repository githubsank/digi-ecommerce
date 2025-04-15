import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
import Link from 'next/link'
import CategoryCard from '@/components/category-card';
import { useState, useEffect } from 'react'
import { Category } from '@/lib/supabaseClient';

export default function CategoriesPage() {
  // Define the state with the correct type
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from('categories').select('*')
        
        if (error) {
          throw error
        }
        
        // Now TypeScript knows that data should be cast to Category[]
        setCategories(data || [])
      } catch (err: any) {
        console.error('Error fetching categories:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link href="/categories/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Category
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading categories...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.name}
                image={category.image_url || "/placeholder.svg?height=200&width=200"}
                href={`/category/${category.slug || category.id}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">No categories found</div>
          )}
        </div>
      )}
    </div>
  )
}
