import type { Metadata } from "next";
import Link from "next/link";

import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { Icon } from "@/components/ui/icon";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "دسته‌بندی محصولات | مون‌شاپ",
  description: "دسته‌بندی‌های پوشاک و اکسسوری مون‌شاپ را ببین.",
};

export default function CategoriesPage() {
  return (
    <>
      <SiteHeader />

      <main className="container-shell min-h-[65vh] py-6 pb-24 sm:py-10 lg:pb-10">
        <Link
          href="/#home"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-brand"
        >
          <Icon name="arrow-left" size={16} />
          بازگشت به صفحه اصلی
        </Link>

        <div className="mb-6 mt-6 sm:mb-8">
          <p className="text-[10px] font-semibold tracking-[0.15em] text-brand sm:text-xs">
            EXPLORE MOON SHOP
          </p>

          <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">دسته‌بندی محصولات</h1>

          <p className="mt-2 text-sm leading-7 text-muted">
            دسته موردعلاقه‌ات را انتخاب کن و محصولات آن را ببین.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`group flex min-h-32 items-center justify-between gap-4 rounded-card border border-black/5 p-5 transition-transform duration-200 hover:-translate-y-0.5 sm:min-h-40 sm:p-6 ${category.color}`}
            >
              <div>
                <h2 className="font-bold text-foreground">{category.title}</h2>

                <p className="mt-2 text-xs leading-6 text-muted">{category.description}</p>

                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                  مشاهده محصولات
                  <Icon name="arrow-left" size={15} />
                </span>
              </div>

              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-brand transition-transform group-hover:scale-105 sm:size-16">
                <Icon name={category.icon} size={30} />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <MobileBottomNav />
    </>
  );
}
