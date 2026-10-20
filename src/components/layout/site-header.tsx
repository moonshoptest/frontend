import Link from "next/link";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { Icon } from "@/components/ui/icon";

const navigationItems = [
  { label: "خانه", href: "/#home" },
  { label: "دسته‌بندی‌ها", href: "/categories" },
  { label: "محبوب‌های مون‌شاپ", href: "/#featured-products" },
  { label: "درباره ما", href: "/#about" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[70] border-b border-border bg-surface">
      <div className="container-shell flex h-[68px] items-center justify-between gap-3 sm:h-[76px]">
        <div className="flex min-w-0 items-center gap-2">
          <MobileMenu />

          <Link
            href="/#home"
            aria-label="صفحه اصلی مون‌شاپ"
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white">
              <Icon name="moon" size={23} />
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-sm font-black tracking-[0.13em] text-foreground sm:text-base">
                MOON SHOP
              </span>

              <span className="mt-1 text-[9px] tracking-[0.12em] text-muted">
                EVERYDAY ESSENTIALS
              </span>
            </span>
          </Link>
        </div>

        <nav aria-label="منوی اصلی" className="hidden items-center gap-6 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <Link
            href="/#product-search"
            aria-label="جست‌وجوی محصولات"
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted"
          >
            <Icon name="search" size={21} />
          </Link>

          <Link
            href="/cart"
            aria-label="سبد خرید"
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted"
          >
            <Icon name="bag" size={21} />
          </Link>
        </div>
      </div>
    </header>
  );
}
