"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { Icon } from "@/components/ui/icon";
import { products } from "@/data/products";
import type { ProductCategory } from "@/types/product";

const categoryLabels: Record<ProductCategory, string> = {
  sunglasses: "عینک آفتابی",
  knitwear: "بافت",
  sweaters: "پلیور",
  shirts: "پیراهن",
};

function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase("fa-IR")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ");
}

export function ProductSearch() {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeSearchText(query);

  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    const terms = normalizedQuery.split(" ").filter(Boolean);

    return products.filter((product) => {
      const searchableText = normalizeSearchText(
        [
          product.name,
          product.description,
          product.slug,
          categoryLabels[product.category],
          ...product.colors.map((color) => color.name),
        ].join(" "),
      );

      return terms.every((term) => searchableText.includes(term));
    });
  }, [normalizedQuery]);

  return (
    <section id="product-search" className="container-shell scroll-mt-28 py-4 sm:py-5">
      <div className="mx-auto max-w-3xl">
        <label
          htmlFor="product-search-input"
          className="mb-2 block text-xs font-semibold text-foreground sm:text-sm"
        >
          جست‌وجو در محصولات مون‌شاپ
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted">
            <Icon name="search" size={20} />
          </span>

          <input
            id="product-search-input"
            name="product-search"
            type="search"
            dir="rtl"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="مثلاً عینک مشکی، بافت یا پیراهن..."
            autoComplete="off"
            aria-label="جست‌وجوی نام محصول، دسته‌بندی یا رنگ"
            className="min-h-12 w-full rounded-control border border-border bg-surface pr-12 pl-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted/80 focus:border-brand focus:ring-2 focus:ring-brand/15"
          />
        </div>

        {normalizedQuery &&
          (filteredProducts.length === 0 ? (
            <p
              role="status"
              className="mt-4 rounded-card border border-border bg-surface p-4 text-center text-sm leading-7 text-muted"
            >
              محصولی با این مشخصات پیدا نشد. نام، دسته‌بندی یا رنگ دیگری را امتحان کن.
            </p>
          ) : (
            <>
              <p role="status" className="mt-4 text-sm text-muted">
                {filteredProducts.length.toLocaleString("fa-IR")} محصول پیدا شد.
              </p>

              <div className="mt-3">
                <ProductGrid products={filteredProducts} />
              </div>
            </>
          ))}
      </div>
    </section>
  );
}
