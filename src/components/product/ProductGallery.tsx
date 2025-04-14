
import { useState } from "react";
import { ProductImage } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<ProductImage>(
    images.find((img) => img.isMain) || images[0]
  );

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100 aspect-square">
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setActiveImage(image)}
            className={cn(
              "relative overflow-hidden rounded border-2 aspect-square bg-gray-100 transition-all",
              activeImage.id === image.id
                ? "border-product-accent"
                : "border-transparent hover:border-gray-300"
            )}
          >
            <img
              src={image.src}
              alt={`Thumbnail for ${image.alt}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
