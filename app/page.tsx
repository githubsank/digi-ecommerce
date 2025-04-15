"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/product-card";
import CategoryCard from "@/components/category-card";
import PromoBanner from "@/components/promo-banner";
import { useEffect, useState } from "react";
import { type Product, supabase } from "@/lib/supabaseClient";
import { type Category } from "@/lib/supabaseClient";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

// Inside the Home component, add state for categories:
const [categories, setCategories] = useState<Category[]>([]);
 

// In the useEffect, update the fetchData function:
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    
    // Fetch products
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("*");

    // Fetch categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .select("*");

    if (productsError) {
      console.error("Error fetching products:", productsError);
    }

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
    }

    if (productsData) {
      setProducts(productsData);
      setFeaturedProducts(productsData.slice(0, 4));
      setDealsProducts(productsData.slice(4, 8));
    }

    if (categoriesData) {
      setCategories(categoriesData);
    }

    setLoading(false);
  };

  fetchData();
}, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <div className="bg-black text-white py-1 px-4">
        <div className="container mx-auto flex justify-between items-center text-xs">
          <div className="flex space-x-4">
            <span>Store Locator</span>
            <span>Buying Guide</span>
            <span>Contact Us</span>
          </div>
          <div className="flex space-x-4">
            <span>EMI Available</span>
            <span>Corporate Orders</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-8">
                <div className="absolute inset-0 bg-red-600 rounded-md flex items-center justify-center text-white font-bold text-xl px-2">
                  DiGi
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-8 relative">
              <Input
                type="search"
                placeholder="What are you looking for today?"
                className="w-full rounded-full pl-4 pr-10 border-gray-300"
              />
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="hidden md:block bg-gray-100 border-t">
          <div className="container mx-auto">
            <div className="flex items-center space-x-6 overflow-x-auto py-2 px-4 text-sm font-medium">
              <Link
                href="/category/televisions"
                className="flex items-center whitespace-nowrap hover:text-red-600"
              >
                Televisions <ChevronDown size={16} />
              </Link>
              <Link
                href="/category/mobiles-tablets"
                className="flex items-center whitespace-nowrap hover:text-red-600"
              >
                Mobiles & Tablets <ChevronDown size={16} />
              </Link>
              <Link
                href="/category/computers"
                className="flex items-center whitespace-nowrap hover:text-red-600"
              >
                Computers <ChevronDown size={16} />
              </Link>
              <Link
                href="/category/kitchen-appliances"
                className="flex items-center whitespace-nowrap hover:text-red-600"
              >
                Kitchen Appliances <ChevronDown size={16} />
              </Link>
              <Link
                href="/category/audio"
                className="flex items-center whitespace-nowrap hover:text-red-600"
              >
                Audio <ChevronDown size={16} />
              </Link>
              <Link
                href="/category/home-appliances"
                className="flex items-center whitespace-nowrap hover:text-red-600"
              >
                Home Appliances <ChevronDown size={16} />
              </Link>
              <Link
                href="/category/accessories"
                className="flex items-center whitespace-nowrap hover:text-red-600"
              >
                Accessories <ChevronDown size={16} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative">
          <div className="container mx-auto px-4 py-4">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/hero.jpg"
                alt="Special Offers"
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-8">
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                  Summer Sale
                </h1>
                <p className="text-white text-lg md:text-xl mb-6 max-w-md">
                  Up to 50% off on electronics and home appliances
                </p>
                <Button className="bg-red-600 hover:bg-red-700 text-white w-fit">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </section>


{/* Categories */}
<section className="py-8">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Shop by Category</h2>
      <Link
        href="/admin/categories"
        className="text-red-600 hover:underline"
      >
        Manage Categories
      </Link>
    </div>
    {loading ? (
      <div className="text-center py-8">Loading categories...</div>
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
          <>
            <CategoryCard
              title="Televisions"
              image="/placeholder.svg?height=200&width=200"
              href="/category/televisions"
            />
            <CategoryCard
              title="Laptops"
              image="/placeholder.svg?height=200&width=200"
              href="/category/computers"
            />
            <CategoryCard
              title="Smartphones"
              image="/placeholder.svg?height=200&width=200"
              href="/category/mobiles-tablets"
            />
            <CategoryCard
              title="Refrigerators"
              image="/placeholder.svg?height=200&width=200"
              href="/category/home-appliances"
            />
            <CategoryCard
              title="Washing Machines"
              image="/placeholder.svg?height=200&width=200"
              href="/category/home-appliances"
            />
            <CategoryCard
              title="Air Conditioners"
              image="/placeholder.svg?height=200&width=200"
              href="/category/home-appliances"
            />
          </>
        )}
      </div>
    )}
  </div>
</section>

        {/* Promo Banners */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PromoBanner
                title="New Arrivals"
                description="Check out the latest tech"
                image="/placeholder.svg?height=200&width=400"
                buttonText="Explore"
                href="/category/televisions"
              />
              <PromoBanner
                title="Clearance Sale"
                description="Up to 70% off"
                image="/placeholder.svg?height=200&width=400"
                buttonText="Shop Now"
                href="/category/accessories"
              />
              <PromoBanner
                title="Apple Products"
                description="Authorized reseller"
                image="/placeholder.svg?height=200&width=400"
                buttonText="View All"
                href="/category/mobiles-tablets"
              />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <Link
                href="/category/televisions"
                className="text-red-600 hover:underline"
              >
                View All
              </Link>
            </div>
            {loading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts.map((product: any) => (
                  <ProductCard
                    key={product.product_id}
                    title={product.name}
                    price={product.price}
                    originalPrice={Math.round(product.price * 1.15)} // Example: 15% higher as original price
                    rating={4.5} // Example rating
                    image="https://www.bhphotovideo.com/images/images2500x2500/lg_55lh5750_lh5750_55_1080p_fhd_1221079.jpg"
                    href={`/product/${product.product_id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Deals of the Day */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Deals of the Day</h2>
              <Link
                href="/category/accessories"
                className="text-red-600 hover:underline"
              >
                View All
              </Link>
            </div>
            {loading ? (
              <div className="text-center py-8">Loading deals...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {dealsProducts.map((product: any) => {
                  // Calculate a discount between 20-40%
                  const discountPercent = Math.floor(Math.random() * 20) + 20;
                  const originalPrice = Math.round(
                    product.price / (1 - discountPercent / 100)
                  );

                  return (
                    <ProductCard
                      key={product.product_id}
                      title={product.name}
                      price={product.price}
                      originalPrice={originalPrice}
                      rating={4.2 + Math.random() * 0.6} // Random rating between 4.2 and 4.8
                      image="https://www.bhphotovideo.com/images/images2500x2500/lg_55lh5750_lh5750_55_1080p_fhd_1221079.jpg"
                      badge={`${discountPercent}% OFF`}
                      href={`/product/${product.product_id}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* All Products */}
        {products.length > 8 && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">More Products</h2>
                <Link
                  href="/category/televisions"
                  className="text-red-600 hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.slice(8).map((product: any) => (
                  <ProductCard
                    key={product.product_id}
                    title={product.name}
                    price={product.price}
                    originalPrice={Math.round(product.price * 1.1)} // 10% higher as original price
                    rating={4.0 + Math.random() * 0.8} // Random rating between 4.0 and 4.8
                    image="https://www.bhphotovideo.com/images/images2500x2500/lg_55lh5750_lh5750_55_1080p_fhd_1221079.jpg"
                    href={`/product/${product.product_id}`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Free Delivery</h3>
                <p className="text-sm text-gray-500">On orders above ₹1000</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Secure Payments</h3>
                <p className="text-sm text-gray-500">100% secure checkout</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Easy Returns</h3>
                <p className="text-sm text-gray-500">10 day return policy</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">24/7 Support</h3>
                <p className="text-sm text-gray-500">Customer support</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About DiGi</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Corporate Information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    DiGi Stores
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Returns & Cancellations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Buying Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop By</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Offers & Promotions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Clearance Sale
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Gift Cards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <h3 className="text-lg font-semibold mb-4">Download App</h3>
              <div className="flex space-x-2">
                <Link href="#">
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    alt="App Store"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    alt="Google Play"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} DiGi. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Terms of Use
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
