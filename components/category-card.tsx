import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export default function CategoryCard({
  title,
  image,
  href,
}: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <div className="border rounded-lg overflow-hidden bg-white transition-all duration-300 hover:shadow-md text-center">
        <div className="p-4">
          <div className="relative w-full mb-3">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={200}
              height={200}
              className="w-full h-auto aspect-square object-contain mx-auto"
            />
          </div>
          <h3 className="font-medium text-sm sm:text-base group-hover:text-red-600 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
