"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/product-card";
import { type Product, supabase } from "@/lib/supabaseClient";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Sample product images
  const productImages = [
    "https://www.bhphotovideo.com/images/images2500x2500/lg_55lh5750_lh5750_55_1080p_fhd_1221079.jpg",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      // Fetch product details
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else if (data) {
        setProduct(data);

        // Fetch related products
        const { data: relatedData, error: relatedError } = await supabase
          .from("products")
          .select("*")
          .neq("product_id", productId)
          .limit(4);

        if (!relatedError && relatedData) {
          setRelatedProducts(relatedData);
        }
      }

      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    // Implement cart functionality
    alert(`Added ${quantity} item(s) to cart`);
  };

  const handleAddToWishlist = () => {
    // Implement wishlist functionality
    alert("Added to wishlist");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  // Calculate discount and original price
  const discountPercent = 15; // Example discount
  const originalPrice = Math.round(product.price / (1 - discountPercent / 100));

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
            <Link
              href="/category/televisions"
              className="text-gray-500 hover:text-red-600"
            >
              Televisions
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-gray-500">/</span>
            <span className="truncate max-w-[200px]">{product.name}</span>
          </li>
        </ul>
      </div>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative border rounded-lg overflow-hidden bg-white">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-contain aspect-square"
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border rounded-md overflow-hidden flex-shrink-0 ${
                  selectedImage === index ? "ring-2 ring-red-600" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 text-gray-300" />
                <span className="ml-2 text-sm text-gray-600">(24 reviews)</span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <span className="text-sm text-green-600">In Stock</span>
            </div>

            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-3xl font-bold">${product.price}</span>
              <span className="text-lg text-gray-500 line-through">
                ${originalPrice}
              </span>
              <span className="text-sm font-medium text-green-600">
                Save {discountPercent}%
              </span>
            </div>

            <p className="text-gray-600 mb-6">
              {product.description ||
                "Experience stunning picture quality and smart features with this premium television. Enjoy vibrant colors, deep blacks, and a sleek design that complements any living space."}
            </p>
          </div>

          {/* Color Options */}
          <div>
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
              <button className="w-10 h-10 rounded-full bg-gray-200"></button>
              <button className="w-10 h-10 rounded-full bg-gray-500"></button>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleAddToWishlist}
            >
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start space-x-3">
              <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Free Delivery</h4>
                <p className="text-sm text-gray-600">
                  Delivery by Tomorrow, Apr 13
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Share2 className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Return Policy</h4>
                <p className="text-sm text-gray-600">
                  Easy 10 days return and exchange
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (24)</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="prose max-w-none">
              <p>
                Experience stunning picture quality and smart features with this
                premium television. Enjoy vibrant colors, deep blacks, and a
                sleek design that complements any living space.
              </p>
              <p>
                This TV features advanced technology that delivers exceptional
                clarity and detail, making it perfect for watching movies,
                sports, and playing games. The built-in smart platform gives you
                access to all your favorite streaming services, while the
                intuitive interface makes navigation simple and enjoyable.
              </p>
              <p>
                With multiple HDMI and USB ports, you can connect all your
                devices with ease. The slim design and narrow bezels create an
                immersive viewing experience that will transform your
                entertainment setup.
              </p>
              <h3>Key Features:</h3>
              <ul>
                <li>4K Ultra HD resolution for stunning clarity</li>
                <li>Smart TV capabilities with built-in streaming apps</li>
                <li>Multiple connectivity options including HDMI and USB</li>
                <li>Sleek, modern design with narrow bezels</li>
                <li>Energy-efficient operation</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">General</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Brand</td>
                      <td className="py-2 font-medium">Samsung</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Model</td>
                      <td className="py-2 font-medium">QN55Q80BAFXZA</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Dimensions</td>
                      <td className="py-2 font-medium">48.4" x 27.8" x 1.1"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Weight</td>
                      <td className="py-2 font-medium">36.8 lbs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Color</td>
                      <td className="py-2 font-medium">Black</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Display</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Screen Size</td>
                      <td className="py-2 font-medium">55"</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Resolution</td>
                      <td className="py-2 font-medium">3840 x 2160 (4K)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Display Type</td>
                      <td className="py-2 font-medium">QLED</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">Refresh Rate</td>
                      <td className="py-2 font-medium">120Hz</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-600">HDR</td>
                      <td className="py-2 font-medium">HDR10+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="ml-2 text-sm">
                      4.0 out of 5 (24 reviews)
                    </span>
                  </div>
                </div>
                <Button>Write a Review</Button>
              </div>

              {/* Review List */}
              <div className="space-y-6">
                {/* Review Item */}
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">John D.</div>
                    <div className="text-sm text-gray-500">2 days ago</div>
                  </div>
                  <div className="flex mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <h4 className="font-medium mb-2">
                    Excellent picture quality!
                  </h4>
                  <p className="text-gray-600">
                    I've had this TV for about a month now and I'm extremely
                    impressed with the picture quality. The colors are vibrant
                    and the blacks are deep. The smart features work great and
                    it was easy to set up.
                  </p>
                </div>

                {/* Review Item */}
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">Sarah M.</div>
                    <div className="text-sm text-gray-500">1 week ago</div>
                  </div>
                  <div className="flex mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <h4 className="font-medium mb-2">Great TV for the price</h4>
                  <p className="text-gray-600">
                    This TV offers excellent value for money. The picture
                    quality is great for most content, though it could be better
                    for very dark scenes. The smart interface is intuitive and
                    responsive.
                  </p>
                </div>

                {/* Review Item */}
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">Michael T.</div>
                    <div className="text-sm text-gray-500">2 weeks ago</div>
                  </div>
                  <div className="flex mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 text-gray-300" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <h4 className="font-medium mb-2">Good but has some issues</h4>
                  <p className="text-gray-600">
                    The picture quality is good, but I've had some issues with
                    the smart features. Sometimes the apps freeze and I have to
                    restart the TV. Customer service was helpful when I
                    contacted them about the issue.
                  </p>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
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
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => {
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
                href={`/product/${product.product_id}`}
              />
            );
          })}        </div>
      </div>
    </div>
  );
}
