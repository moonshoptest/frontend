import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductGrid } from "@/components/products/product-grid";
import { Icon } from "@/components/ui/icon";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return { title: "دسته پیدا نشد | مون‌شاپ" };
  }

  return {
    title: `${category.title} | مون‌شاپ`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <>
      <SiteHeader />

      <Suspense fallback={<CategoryPageFallback />}>
        <CategoryContent params={params} />
      </Suspense>

      <MobileBottomNav />
    </>
  );
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((product) =>
    category.productCategories.includes(product.category),
  );

  return (
    <main className="container-shell min-h-[65vh] py-6 pb-24 sm:py-10 lg:pb-10">
      <Link
        href="/#home"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
      >
        <Icon name="arrow-left" size={16} />
        بازگشت به صفحه اصلی
      </Link>

      <section className={`mt-5 rounded-[1.5rem] p-5 sm:p-8 ${category.color}`}>
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-brand sm:size-16">
            <Icon name={category.icon} size={30} />
          </span>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-brand sm:text-xs">
              MOON SHOP COLLECTION
            </p>

            <h1 className="mt-2 text-xl font-bold text-foreground sm:text-3xl">{category.title}</h1>

            <p className="mt-1 text-xs leading-6 text-muted sm:text-sm">{category.description}</p>
          </div>
        </div>
      </section>

      <div className="mb-5 mt-8 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-foreground">محصولات این دسته</h2>

        <span className="text-xs text-muted">
          {categoryProducts.length.toLocaleString("fa-IR")} محصول
        </span>
      </div>

      <ProductGrid products={categoryProducts} />

      <div className="mt-8 text-center">
        <Link
          href="/categories"
          className="inline-flex min-h-11 items-center justify-center rounded-control border border-brand/20 px-5 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
        >
          مشاهده همه دسته‌ها
        </Link>
      </div>
    </main>
  );
}

function CategoryPageFallback() {
  return (
    <main aria-busy="true" className="container-shell min-h-[65vh] py-6 pb-24 sm:py-10 lg:pb-10">
      <div className="h-5 w-36 animate-pulse rounded bg-surface-muted" />

      <div className="mt-5 h-36 animate-pulse rounded-[1.5rem] bg-surface-muted sm:h-40" />

      <div className="mb-5 mt-8 h-7 w-44 animate-pulse rounded bg-surface-muted" />

      <p className="text-sm text-muted">در حال آماده‌سازی محصولات...</p>
    </main>
  );
}
