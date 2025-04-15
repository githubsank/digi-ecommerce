"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import ProductList from "@/components/admin/product-list"
import ProductForm from "@/components/admin/product-form"
import CategoryList from "@/components/admin/category-list"
import CategoryForm from "@/components/admin/category-form"

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)

    // Simple check if user is logged in - in a real app, use proper authentication
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn")
    if (!isLoggedIn) {
      router.push("/admin")
    } else {
      sessionStorage.setItem("adminLoggedIn", "true")
    }
  }, [router])

  if (!isClient) {
    return null
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => {
            sessionStorage.removeItem("adminLoggedIn")
            router.push("/admin")
          }}
        >
          Logout
        </Button>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-8">
          <ProductForm />
          <ProductList />
        </TabsContent>

        <TabsContent value="categories" className="space-y-8">
          <CategoryForm />
          <CategoryList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
