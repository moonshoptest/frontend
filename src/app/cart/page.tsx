import Link from "next/link";

import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { Icon } from "@/components/ui/icon";

export default function CartPage() {
  return (
    <>
      <SiteHeader />

      <main className="container-shell flex min-h-[65vh] items-center justify-center py-10 pb-24 lg:pb-10">
        <section className="w-full max-w-md rounded-card border border-border bg-surface p-7 text-center sm:p-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Icon name="bag" size={29} />
          </span>

          <h1 className="mt-5 text-xl font-bold text-foreground">سبد خرید شما</h1>

          <p className="mt-3 text-sm leading-7 text-muted">
            هنوز محصولی به سبد خرید اضافه نکرده‌ای. محصولات مجموعه را ببین و انتخابت را شروع کن.
          </p>

          <Link
            href="/#featured-products"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            <span>مشاهده محصولات</span>
            <Icon name="arrow-left" size={18} />
          </Link>
        </section>
      </main>

      <MobileBottomNav active="cart" />
    </>
  );
}
