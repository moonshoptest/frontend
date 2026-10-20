"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <section id="product-search" className="container-shell scroll-mt-24 py-6 sm:py-10">
      <SectionHeading
        eyebrow="FIND YOUR MATCH"
        title="جست‌وجوی محصولات"
        description="محصول، دسته‌بندی یا رنگ دلخواهت را پیدا کن."
      />

      <div className="max-w-2xl">
        <label
          htmlFor="product-search-input"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          دنبال چی می‌گردی؟
        </label>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.34-4.34" />
            </svg>
          </span>

          <input
            id="product-search-input"
            name="product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="مثلاً عینک مشکی، بافت یا پیراهن..."
            autoComplete="off"
            className="min-h-12 w-full rounded-control border border-border bg-surface pr-12 pl-4 text-sm text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15"
          />
        </div>
      </div>

      <div className="mt-5" aria-live="polite" aria-atomic="true">
        {!normalizedQuery ? (
          <p className="text-sm leading-7 text-muted">
            برای شروع، نام محصول، دسته‌بندی یا رنگ را وارد کن.
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="rounded-card border border-border bg-surface p-5 text-center text-sm leading-7 text-muted">
            محصولی با این مشخصات پیدا نشد. نام، دسته‌بندی یا رنگ دیگری را امتحان کن.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted">
              {filteredProducts.length.toLocaleString("fa-IR")} محصول پیدا شد.
            </p>

            <div className="mt-4">
              <ProductGrid products={filteredProducts} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
