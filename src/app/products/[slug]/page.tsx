import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductDetailClient } from "@/components/products/product-detail-client";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return { title: "محصول پیدا نشد" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main className="container-shell min-h-[65vh] py-6 pb-24 sm:py-10 lg:pb-10">
        <ProductDetailClient key={product.id} product={product} />
      </main>

      <MobileBottomNav />
    </>
  );
}
