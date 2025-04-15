import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PromoBannerProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  href?: string;
}

export default function PromoBanner({
  title,
  description,
  image,
  buttonText,
  href = "#",
}: PromoBannerProps) {
  return (
    <div className="relative rounded-lg overflow-hidden group">
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={400}
        height={200}
        className="w-full h-auto aspect-[2/1] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-white text-sm mb-3">{description}</p>
        <Button
          asChild
          size="sm"
          className="w-fit bg-red-600 hover:bg-red-700 text-white"
        >
          <Link href={href}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
