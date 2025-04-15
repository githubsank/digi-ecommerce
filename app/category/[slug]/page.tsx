"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/product-card";
import { type Product, supabase } from "@/lib/supabaseClient";

// Sample category data mapping
const categoryData: Record<string, { title: string; description: string }> = {
  televisions: {
    title: "Televisions",
    description:
      "Shop the latest TVs from top brands like Samsung, LG, Sony and more.",
  },
  "mobiles-tablets": {
    title: "Mobiles & Tablets",
    description:
      "Explore the newest smartphones and tablets from Apple, Samsung, and more.",
  },
  computers: {
    title: "Computers",
    description: "Find laptops, desktops, and accessories from leading brands.",
  },
  "kitchen-appliances": {
    title: "Kitchen Appliances",
    description:
      "Discover premium kitchen appliances to enhance your cooking experience.",
  },
  audio: {
    title: "Audio",
    description:
      "Experience superior sound with our range of headphones, speakers and more.",
  },
  "home-appliances": {
    title: "Home Appliances",
    description:
      "Shop for washing machines, refrigerators, air conditioners and more.",
  },
  accessories: {
    title: "Accessories",
    description:
      "Find the perfect accessories for all your electronic devices.",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const category = categoryData[slug] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
    description: "Explore our range of products.",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      // In a real app, you would filter by category
      // This is a simplified example
      const { data, error } = await supabase
        .from("products")
        .select("*")
        // .eq("category", slug) // Uncomment when you have category field in your database
        .limit(12);

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-6">
        <ul className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-500">/</span>
            <span>{category.title}</span>
          </li>
        </ul>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.title}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      {/* Category Banner */}
      {/* <div className="relative rounded-lg overflow-hidden mb-8">
        <Image
          src="/hero.jpg"
          alt={`${category.title} Banner`}
          width={1200}
          height={300}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8">
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">
            {category.title} Sale
          </h2>
          <p className="text-white text-lg mb-6 max-w-md">
            Up to 40% off on selected {category.title.toLowerCase()}
          </p>
          <Button className="bg-red-600 hover:bg-red-700 text-white w-fit">
            Shop Now
          </Button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Mobile Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Filters Sidebar */}
        <div
          className={`${showFilters ? "block" : "hidden"} lg:block lg:w-1/4`}
        >
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <Button variant="ghost" size="sm">
                Clear All
              </Button>
            </div>

            <Separator className="my-4" />

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 5000]}
                  max={10000}
                  step={100}
                  onValueChange={(value) => setPriceRange(value as number[])}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Brands */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Brands</h4>
              <div className="space-y-2">
                {["Samsung", "LG", "Sony", "Apple", "Philips"].map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={`brand-${brand.toLowerCase()}`} />
                    <label
                      htmlFor={`brand-${brand.toLowerCase()}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Rating</h4>
              <RadioGroup defaultValue="all">
                {["all", "4+", "3+", "2+", "1+"].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={rating} id={`rating-${rating}`} />
                    <Label htmlFor={`rating-${rating}`}>
                      {rating === "all"
                        ? "All Ratings"
                        : `${rating} Stars & Above`}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator className="my-4" />

            {/* Availability */}
            <div>
              <h4 className="font-medium mb-3">Availability</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="in-stock" />
                  <label
                    htmlFor="in-stock"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    In Stock
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="out-of-stock" />
                  <label
                    htmlFor="out-of-stock"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Out of Stock
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sort Options */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="text-sm text-gray-500">
              Showing {products.length} products
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort by:</span>
              <select className="border rounded-md p-2 text-sm">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Rating</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="grid place-items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p>Loading products...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => {
                // Calculate a discount between 10-30%
                const discountPercent = Math.floor(Math.random() * 20) + 10;
                const originalPrice = Math.round(
                  product.price / (1 - discountPercent / 100)
                );

                return (
                  <ProductCard
                    key={String(product.product_id)}
                    title={product.name}
                    price={product.price}
                    originalPrice={originalPrice}
                    rating={4.0 + Math.random() * 0.8}
                    image="https://www.bhphotovideo.com/images/images2500x2500/lg_55lh5750_lh5750_55_1080p_fhd_1221079.jpg"
                    badge={
                      Math.random() > 0.7
                        ? `${discountPercent}% OFF`
                        : undefined
                    }
                    href={`/product/${product.product_id}`}
                  />
                );
              })}{" "}
            </div>
          )}

          {/* Pagination */}
          {products.length > 0 && (
            <div className="flex justify-center mt-10">
              <div className="flex space-x-1">
                <Button variant="outline" size="icon" disabled>
                  &lt;
                </Button>
                <Button variant="default" size="icon">
                  1
                </Button>
                <Button variant="outline" size="icon">
                  2
                </Button>
                <Button variant="outline" size="icon">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  &gt;
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
