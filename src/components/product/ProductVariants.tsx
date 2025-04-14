
import { ProductVariant } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductVariantsProps {
  title: string;
  variants: ProductVariant[];
  type: 'color' | 'size';
  onSelect: (variant: ProductVariant) => void;
}

export function ProductVariants({ title, variants, type, onSelect }: ProductVariantsProps) {
  const [selectedId, setSelectedId] = useState<number | null>(
    variants.find(v => v.inStock)?.id || null
  );

  const handleSelect = (variant: ProductVariant) => {
    if (!variant.inStock) return;
    setSelectedId(variant.id);
    onSelect(variant);
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => handleSelect(variant)}
            disabled={!variant.inStock}
            className={cn(
              "relative transition-all border-2",
              selectedId === variant.id
                ? "border-product-accent"
                : variant.inStock
                ? "border-gray-200 hover:border-gray-300"
                : "border-gray-100 opacity-40 cursor-not-allowed",
              type === 'color'
                ? "h-10 w-10 rounded-full p-0.5"
                : "h-10 min-w-16 rounded-md px-3 flex items-center justify-center text-sm"
            )}
            aria-label={`${variant.name} ${variant.type}`}
          >
            {type === 'color' ? (
              <span
                className="block h-full w-full rounded-full"
                style={{ backgroundColor: variant.value }}
              ></span>
            ) : (
              <span>{variant.name}</span>
            )}
            {!variant.inStock && (
              <span className="text-xs absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                Out of stock
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
