import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: readonly Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-card border border-border bg-surface p-6 text-center text-sm text-muted">
        در حال حاضر محصولی برای نمایش وجود ندارد.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
