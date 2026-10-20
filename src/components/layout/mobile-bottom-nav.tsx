import Link from "next/link";

import { Icon, type IconName } from "@/components/ui/icon";

type MobileTab = "home" | "categories" | "search" | "cart";

type MobileBottomNavProps = {
  active?: MobileTab;
};

type NavigationItem = {
  key: MobileTab;
  label: string;
  href: string;
  icon: IconName;
};

const navigationItems: readonly NavigationItem[] = [
  {
    key: "home",
    label: "خانه",
    href: "/#home",
    icon: "home",
  },
  {
    key: "categories",
    label: "دسته‌ها",
    href: "/#categories",
    icon: "grid",
  },
  {
    key: "search",
    label: "جست‌وجو",
    href: "/#product-search",
    icon: "search",
  },
  {
    key: "cart",
    label: "سبد خرید",
    href: "/cart",
    icon: "bag",
  },
];

export function MobileBottomNav({ active = "home" }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="ناوبری موبایل"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 px-2 pb-2 pt-2 backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
        {navigationItems.map((item) => {
          const isActive = active === item.key;

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] transition-colors ${
                isActive
                  ? "bg-brand-soft font-semibold text-brand"
                  : "text-muted hover:bg-surface-muted"
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
