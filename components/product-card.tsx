import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  href?: string;
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  rating,
  image,
  badge,
  href = "#",
}: ProductCardProps) {
  return (
    <Link href={href} className="group">
      <div className="border rounded-lg overflow-hidden bg-white transition-all duration-300 hover:shadow-md">
        {/* Product Image */}
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={300}
            height={300}
            className="w-full h-auto aspect-square object-cover"
          />

          {/* Badge */}
          {badge && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
              {badge}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({rating.toFixed(1)})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">${price}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
