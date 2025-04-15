import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ProductPopupProps {
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badge?: string;
  onClose: () => void;
}

export default function ProductPopup({
  title,
  price,
  originalPrice,
  rating,
  image,
  badge,
  onClose,
}: ProductPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X size={24} />
          </Button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            {badge && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                {badge}
              </span>
            )}
            <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>

            <div className="flex items-center mb-4">
              <div className="flex items-center text-amber-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "fill-current"
                        : "stroke-current fill-none"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm">{rating.toFixed(1)}</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-red-600">
                  ₹{price.toLocaleString()}
                </span>
                {originalPrice && (
                  <span className="ml-2 text-gray-500 line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {originalPrice && (
                <span className="text-green-600 text-sm font-medium">
                  Save ₹{(originalPrice - price).toLocaleString()} (
                  {Math.round(((originalPrice - price) / originalPrice) * 100)}%
                  off)
                </span>
              )}
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full">
                Add to Wishlist
              </Button>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
