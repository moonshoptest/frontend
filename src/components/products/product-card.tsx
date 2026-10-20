import Image from "next/image";

import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";

const categoryLabels = {
  sunglasses: "عینک آفتابی",
  knitwear: "بافت و لباس بافتنی",
  sweaters: "پلیور و سویشرت",
  shirts: "پیراهن",
} satisfies Record<Product["category"], string>;

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const originalPrice = product.originalPrice;

  const hasDiscount = originalPrice !== undefined && originalPrice > product.price;

  const discountPercentage =
    hasDiscount && originalPrice !== undefined
      ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
      : undefined;

  return (
    <article className="group min-w-0 overflow-hidden rounded-card border border-border bg-surface transition-shadow duration-300 hover:shadow-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 639px) 48vw, (max-width: 1023px) 30vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.badge && (
          <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-brand sm:right-3 sm:top-3 sm:text-xs">
            {product.badge}
          </span>
        )}

        {discountPercentage !== undefined && (
          <span className="absolute left-2 top-2 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
            {discountPercentage}٪ تخفیف
          </span>
        )}

        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground">
              ناموجود
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        <p className="text-[10px] text-muted sm:text-xs">{categoryLabels[product.category]}</p>

        <h3 className="min-h-11 text-sm font-semibold leading-6 text-foreground sm:text-base">
          {product.name}
        </h3>

        {product.colors.length > 0 && (
          <ul
            aria-label={`رنگ‌های محصول ${product.name}`}
            className="flex flex-wrap items-center gap-1.5"
          >
            {product.colors.slice(0, 4).map((color) => (
              <li key={color.id}>
                <span
                  role="img"
                  aria-label={color.name}
                  title={color.name}
                  className="block size-4 rounded-full border border-black/10 sm:size-[18px]"
                  style={{ backgroundColor: color.hex }}
                />
              </li>
            ))}

            {product.colors.length > 4 && (
              <li className="text-[10px] text-muted">+{product.colors.length - 4}</li>
            )}
          </ul>
        )}

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-1">
          <span className="text-sm font-bold text-foreground sm:text-base">
            {formatPrice(product.price)}
          </span>

          {hasDiscount && originalPrice !== undefined && (
            <span className="text-xs text-muted line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
