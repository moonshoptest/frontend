"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Icon } from "@/components/ui/icon";
import { products } from "@/data/products";
import { readCartItems, saveCartItems } from "@/lib/cart-storage";
import { formatPrice } from "@/lib/format-price";
import type { CartItem } from "@/types/cart";

function sameSelection(a: CartItem, b: CartItem): boolean {
  return a.productId === b.productId && a.colorId === b.colorId && a.sizeId === b.sizeId;
}

export function CartContents() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setItems(readCartItems());
    setIsHydrated(true);
  }, []);

  function removeItem(itemToRemove: CartItem) {
    const updatedItems = items.filter((item) => !sameSelection(item, itemToRemove));

    saveCartItems(updatedItems);
    setItems(updatedItems);
  }

  function changeQuantity(itemToUpdate: CartItem, quantity: number) {
    if (quantity < 1 || quantity > 99) {
      return;
    }

    const updatedItems = items.map((item) =>
      sameSelection(item, itemToUpdate) ? { ...item, quantity } : item,
    );

    saveCartItems(updatedItems);
    setItems(updatedItems);
  }

  if (!isHydrated) {
    return (
      <main className="container-shell flex min-h-[55vh] items-center justify-center py-10">
        <p className="text-sm text-muted">در حال بارگذاری سبد خرید...</p>
      </main>
    );
  }

  const cartRows = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    const color = product?.colors.find((entry) => entry.id === item.colorId);

    if (!product || !color) {
      return [];
    }

    const size = product.sizes?.find((entry) => entry.id === item.sizeId);

    return [{ item, product, color, size }];
  });

  const totalQuantity = cartRows.reduce((total, row) => total + row.item.quantity, 0);

  const subtotal = cartRows.reduce(
    (total, row) => total + row.product.price * row.item.quantity,
    0,
  );

  if (cartRows.length === 0) {
    return (
      <main className="container-shell flex min-h-[65vh] items-center justify-center py-10 pb-24 lg:pb-10">
        <section className="w-full max-w-md rounded-card border border-border bg-surface p-7 text-center sm:p-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Icon name="bag" size={29} />
          </span>

          <h1 className="mt-5 text-xl font-bold text-foreground">سبد خرید شما</h1>

          <p className="mt-3 text-sm leading-7 text-muted">
            هنوز محصولی به سبد خرید اضافه نکرده‌ای. از محصولات دیدن کن و انتخابت رو شروع کن.
          </p>

          <Link
            href="/#featured-products"
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            مشاهده محصولات
            <Icon name="arrow-left" size={18} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container-shell min-h-[65vh] py-6 pb-24 sm:py-10 lg:pb-10">
      <h1 className="text-2xl font-bold text-foreground">سبد خرید</h1>

      <p className="mt-2 text-sm text-muted">
        {totalQuantity.toLocaleString("fa-IR")} عدد محصول در سبد خرید
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <ul className="space-y-3">
          {cartRows.map(({ item, product, color, size }) => (
            <li
              key={`${item.productId}-${item.colorId}-${item.sizeId ?? "default"}`}
              className="flex gap-3 rounded-card border border-border bg-surface p-3 sm:gap-4 sm:p-4"
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl bg-surface-muted sm:w-32"
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${product.slug}`}
                  className="text-sm font-semibold leading-6 text-foreground hover:text-brand"
                >
                  {product.name}
                </Link>

                <p className="mt-2 text-xs leading-6 text-muted">
                  رنگ: {color.name}
                  {size ? ` · سایز: ${size.label}` : ""}
                </p>

                <p className="mt-2 text-sm font-bold text-foreground">
                  {formatPrice(product.price * item.quantity)}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-3 rounded-lg border border-border px-2 py-1">
                    <button
                      type="button"
                      disabled={item.quantity >= 99}
                      aria-label={`افزایش تعداد ${product.name}`}
                      onClick={() => changeQuantity(item, item.quantity + 1)}
                      className="flex size-7 items-center justify-center text-lg text-brand disabled:opacity-40"
                    >
                      +
                    </button>

                    <span className="min-w-5 text-center text-sm tabular-nums">
                      {item.quantity.toLocaleString("fa-IR")}
                    </span>

                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      aria-label={`کاهش تعداد ${product.name}`}
                      onClick={() => changeQuantity(item, item.quantity - 1)}
                      className="flex size-7 items-center justify-center text-lg text-brand disabled:opacity-40"
                    >
                      −
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                    className="text-xs font-medium text-muted underline underline-offset-4 hover:text-brand"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="rounded-card border border-border bg-surface p-5 lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-foreground">خلاصه سفارش</h2>

          <div className="mt-5 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">جمع کالاها</span>
            <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
          </div>

          <p className="mt-3 text-xs leading-6 text-muted">
            هزینه ارسال و ثبت نهایی سفارش پس از اتصال بک‌اند و فرایند پرداخت مشخص خواهد شد.
          </p>

          <button
            type="button"
            disabled
            className="mt-5 min-h-12 w-full cursor-not-allowed rounded-control bg-brand px-4 text-sm font-semibold text-white opacity-50"
          >
            ثبت سفارش به‌زودی فعال می‌شود
          </button>

          <Link
            href="/#featured-products"
            className="mt-4 flex min-h-10 items-center justify-center text-sm font-semibold text-brand"
          >
            ادامه خرید
          </Link>
        </aside>
      </div>
    </main>
  );
}
