"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { addCartItem } from "@/lib/cart-storage";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";

const categoryLabels = {
  sunglasses: "عینک آفتابی",
  knitwear: "بافت و لباس بافتنی",
  sweaters: "پلیور",
  shirts: "پیراهن",
} satisfies Record<Product["category"], string>;

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id ?? "");
  const [selectedSizeId, setSelectedSizeId] = useState(product.sizes?.[0]?.id ?? "");
  const [feedback, setFeedback] = useState<"added" | "error" | "">("");

  const selectedColor = product.colors.find((color) => color.id === selectedColorId);

  const hasSizes = Boolean(product.sizes && product.sizes.length > 0);
  const originalPrice = product.originalPrice;
  const hasDiscount = originalPrice !== undefined && originalPrice > product.price;

  const discountPercentage =
    hasDiscount && originalPrice !== undefined
      ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
      : undefined;

  function handleAddToCart() {
    if (!selectedColorId || (hasSizes && !selectedSizeId)) {
      setFeedback("error");
      return;
    }

    const added = addCartItem({
      productId: product.id,
      colorId: selectedColorId,
      ...(hasSizes ? { sizeId: selectedSizeId } : {}),
    });

    setFeedback(added ? "added" : "error");
  }

  return (
    <section className="grid gap-7 lg:grid-cols-2 lg:gap-12">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-card bg-surface-muted">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 50vw"
          className="object-cover"
        />

        {product.badge && (
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-brand">
            {product.badge}
          </span>
        )}

        {discountPercentage !== undefined && (
          <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white">
            {discountPercentage}٪ تخفیف
          </span>
        )}
      </div>

      <div className="min-w-0 py-1 lg:py-5">
        <p className="text-xs font-medium text-brand">{categoryLabels[product.category]}</p>

        <h1 className="mt-3 text-2xl font-bold leading-relaxed text-foreground sm:text-3xl">
          {product.name}
        </h1>

        <p className="mt-4 text-sm leading-8 text-muted">{product.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-xl font-bold text-foreground">{formatPrice(product.price)}</span>

          {hasDiscount && originalPrice !== undefined && (
            <span className="text-sm text-muted line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">انتخاب رنگ</h2>
            {selectedColor && <span className="text-sm text-muted">{selectedColor.name}</span>}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((color) => {
              const isSelected = selectedColorId === color.id;

              return (
                <button
                  key={color.id}
                  type="button"
                  aria-label={`انتخاب رنگ ${color.name}`}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedColorId(color.id);
                    setFeedback("");
                  }}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-control border px-3 text-sm transition-colors ${
                    isSelected
                      ? "border-brand bg-brand-soft text-brand"
                      : "border-border bg-surface text-foreground hover:border-brand/50"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="size-5 rounded-full border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                  {isSelected && <Icon name="check" size={15} />}
                </button>
              );
            })}
          </div>
        </div>

        {hasSizes && (
          <div className="mt-7">
            <h2 className="text-sm font-semibold text-foreground">انتخاب سایز</h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes?.map((size) => {
                const isSelected = selectedSizeId === size.id;

                return (
                  <button
                    key={size.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedSizeId(size.id);
                      setFeedback("");
                    }}
                    className={`flex size-12 items-center justify-center rounded-control border text-sm font-semibold transition-colors ${
                      isSelected
                        ? "border-brand bg-brand text-white"
                        : "border-border bg-surface text-foreground hover:border-brand"
                    }`}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {!product.isAvailable && (
          <p className="mt-6 text-sm font-medium text-muted">این محصول در حال حاضر ناموجود است.</p>
        )}

        <button
          type="button"
          disabled={!product.isAvailable || !selectedColorId || (hasSizes && !selectedSizeId)}
          onClick={handleAddToCart}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50 sm:max-w-sm"
        >
          <Icon name="bag" size={19} />
          افزودن به سبد خرید
        </button>

        {feedback === "added" && (
          <div
            role="status"
            className="mt-4 rounded-card border border-border bg-surface p-4 text-sm leading-7"
          >
            محصول با این رنگ و سایز به سبد خرید اضافه شد.
            <div className="mt-2">
              <Link href="/cart" className="font-semibold text-brand underline underline-offset-4">
                مشاهده سبد خرید
              </Link>
            </div>
          </div>
        )}

        {feedback === "error" && (
          <p role="alert" className="mt-4 text-sm leading-7 text-red-700">
            افزودن محصول انجام نشد. انتخاب‌ها را بررسی کن و دوباره امتحان کن.
          </p>
        )}

        <div className="mt-6 border-t border-border pt-5 text-xs leading-7 text-muted">
          این نسخه از فروشگاه از اطلاعات نمونه و سبد خرید ذخیره‌شده در مرورگر استفاده می‌کند. ثبت
          سفارش و پرداخت هنوز فعال نیست.
        </div>
      </div>
    </section>
  );
}
