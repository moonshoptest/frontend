"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { categories } from "@/data/categories";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={() => setIsOpen((current) => !current)}
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted lg:hidden"
      >
        <Icon name={isOpen ? "close" : "menu"} size={22} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="بستن منو"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/40"
          />

          <aside
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="منوی مون‌شاپ"
            className="absolute inset-y-0 right-0 z-10 flex w-[min(88vw,360px)] flex-col overflow-y-auto bg-surface p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
              <div>
                <p className="text-base font-black tracking-[0.13em] text-foreground">MOON SHOP</p>
                <p className="mt-1 text-[10px] text-muted">EVERYDAY ESSENTIALS</p>
              </div>

              <button
                type="button"
                aria-label="بستن منو"
                onClick={closeMenu}
                className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-muted"
              >
                <Icon name="close" size={21} />
              </button>
            </div>

            <nav aria-label="ناوبری موبایل" className="mt-5 space-y-1">
              <Link
                href="/#home"
                onClick={closeMenu}
                className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-foreground transition-colors hover:bg-surface-muted"
              >
                <Icon name="home" size={19} />
                خانه
              </Link>

              <Link
                href="/#product-search"
                onClick={closeMenu}
                className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-foreground transition-colors hover:bg-surface-muted"
              >
                <Icon name="search" size={19} />
                جست‌وجوی محصولات
              </Link>

              <Link
                href="/cart"
                onClick={closeMenu}
                className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-foreground transition-colors hover:bg-surface-muted"
              >
                <Icon name="bag" size={19} />
                سبد خرید
              </Link>
            </nav>

            <div className="mb-3 mt-7 flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-foreground">دسته‌بندی محصولات</h2>

              <Link
                href="/categories"
                onClick={closeMenu}
                className="text-xs font-semibold text-brand hover:underline"
              >
                همه دسته‌ها
              </Link>
            </div>

            <nav aria-label="دسته‌بندی محصولات" className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  onClick={closeMenu}
                  className={`flex min-h-[68px] items-center gap-3 rounded-xl border border-black/5 p-3 transition-colors hover:brightness-[0.98] ${category.color}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-brand">
                    <Icon name={category.icon} size={22} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">
                      {category.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted">
                      {category.description}
                    </span>
                  </span>

                  <Icon name="arrow-left" size={17} className="text-brand" />
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              <p className="text-center text-[10px] text-muted">انتخاب‌های کوچک، تفاوت بزرگ.</p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
