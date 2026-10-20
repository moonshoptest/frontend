import Image from "next/image";
import Link from "next/link";
import { CurrentYear } from "@/components/layout/current-year";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductSearch } from "@/components/products/product-search";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { products } from "@/data/products";

const categories: {
  title: string;
  description: string;
  icon: IconName;
  color: string;
}[] = [
  {
    title: "عینک آفتابی",
    description: "جزئیاتی برای کامل‌شدن استایل",
    icon: "sunglasses",
    color: "bg-[#f1e7de]",
  },
  {
    title: "بافت و پلیور",
    description: "انتخاب‌های نرم و روزمره",
    icon: "layers",
    color: "bg-[#f0e6e9]",
  },
  {
    title: "پیراهن",
    description: "سادگی با جزئیات ظریف",
    icon: "shirt",
    color: "bg-[#e7ece5]",
  },
];

const featuredProductIds = [
  "lefties-uv400-01",
  "button-collar-knit",
  "mohair-sweater",
  "zara-two-pocket-shirt",
] as const;

const featuredProducts = products.filter((product) =>
  featuredProductIds.some((id) => id === product.id),
);

const benefits = [
  {
    title: "انتخاب‌های کاربردی",
    description: "برای استایل روزمره",
    icon: "sparkles" as const,
  },
  {
    title: "تنوع رنگی",
    description: "انتخاب مطابق سلیقه تو",
    icon: "layers" as const,
  },
  {
    title: "تجربه خرید ساده",
    description: "طراحی‌شده برای استفاده راحت",
    icon: "bag" as const,
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="home" className="pb-24 lg:pb-0">
        <div className="border-b border-border bg-surface">
          <div className="container-shell flex min-h-10 items-center justify-center gap-2 py-2 text-center text-[11px] text-muted sm:text-xs">
            <Icon name="sparkles" size={15} className="text-brand" />
            <p>جزئیات کوچک، تفاوت بزرگ؛ به دنیای مون‌شاپ خوش آمدی.</p>
          </div>
        </div>

        <ProductSearch />

        <section className="container-shell py-5 sm:py-8 lg:py-12">
          <div className="grid overflow-hidden rounded-[1.75rem] bg-brand-soft lg:grid-cols-[1fr_0.95fr] lg:rounded-[2rem]">
            <div className="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/60 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-brand sm:text-xs">
                <Icon name="sparkles" size={14} />
                MOON SHOP COLLECTION
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-[1.65] tracking-tight text-foreground sm:text-4xl lg:mt-7 lg:text-5xl">
                استایلی برای
                <br />
                <span className="text-brand">خودِ تو.</span>
              </h1>

              <p className="mt-3 max-w-md text-sm leading-7 text-muted sm:mt-5 sm:text-base sm:leading-8">
                انتخاب‌هایی ساده، جذاب و کاربردی برای هر روز؛ جزئیاتی که استایل شخصی تو را کامل
                می‌کنند.
              </p>

              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
                <Link
                  href="#categories"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-control bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  دیدن کالکشن‌ها
                  <Icon name="arrow-left" size={18} />
                </Link>

                <Link
                  href="#featured-products"
                  className="inline-flex min-h-12 items-center justify-center rounded-control border border-brand/20 bg-white/60 px-6 text-sm font-semibold text-brand transition-colors hover:bg-white"
                >
                  محصولات منتخب
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted sm:mt-9">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-brand" />
                  پوشاک و اکسسوری
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-accent" />
                  انتخاب برای هر روز
                </span>
              </div>
            </div>

            <div className="relative min-h-[290px] overflow-hidden sm:min-h-[430px] lg:min-h-[540px]">
              <Image
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=90"
                alt="تصویر نمونه استایل پوشاک زنانه"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute bottom-5 right-5 left-5 flex items-end justify-between gap-3 text-white sm:bottom-7 sm:right-7 sm:left-7">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.18em] text-white/80">
                    THE MOON EDIT
                  </p>
                  <p className="mt-1 text-lg font-semibold sm:text-2xl">ساده، خاص، ماندگار</p>
                </div>

                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-sm">
                  <Icon name="arrow-left" size={21} />
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="container-shell py-6 sm:py-10">
          <SectionHeading
            eyebrow="EXPLORE MOON SHOP"
            title="از کجا شروع کنیم؟"
            description="دسته موردعلاقه‌ات را انتخاب کن."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {categories.map((category) => (
              <Link
                key={category.title}
                href="#featured-products"
                className={`group flex min-h-28 items-center justify-between gap-3 rounded-card border border-black/5 p-4 transition-transform duration-200 hover:-translate-y-0.5 sm:min-h-36 sm:p-5 ${category.color}`}
              >
                <div>
                  <h3 className="font-bold text-foreground">{category.title}</h3>

                  <p className="mt-1 text-xs leading-6 text-muted">{category.description}</p>

                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                    مشاهده محصولات
                    <Icon name="arrow-left" size={15} />
                  </span>
                </div>

                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-brand transition-transform group-hover:scale-105 sm:size-[68px]">
                  <Icon name={category.icon} size={30} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="featured-products" className="container-shell py-8 sm:py-12">
          <SectionHeading
            eyebrow="SELECTED FOR YOU"
            title="محبوب‌های مون‌شاپ"
            description="نگاهی به انتخاب‌های این مجموعه بینداز."
            actionHref="#categories"
            actionLabel="کالکشن‌ها"
          />

          <ProductGrid products={featuredProducts} />
        </section>

        <section className="container-shell py-5 sm:py-8">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-brand px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-12 -top-16 size-52 rounded-full border border-white/10 sm:size-72"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 -top-8 size-36 rounded-full border border-white/10 sm:size-48"
            />

            <div className="relative max-w-xl">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-white/65 sm:text-xs">
                YOUR STYLE, YOUR MOON
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-relaxed sm:text-3xl">
                انتخاب‌های کوچک،
                <br className="sm:hidden" /> حس متفاوت.
              </h2>

              <p className="mt-2 text-sm leading-7 text-white/75">
                قطعاتی را انتخاب کن که با سبک شخصی تو هماهنگ باشند.
              </p>

              <Link
                href="#featured-products"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-white px-5 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
              >
                دیدن محصولات
                <Icon name="arrow-left" size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="container-shell py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-center gap-3 rounded-card border border-border bg-surface p-4 sm:flex-col sm:items-start sm:p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon name={benefit.icon} size={22} />
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">{benefit.title}</h3>

                  <p className="mt-1 text-xs leading-6 text-muted">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="about" className="border-t border-border bg-surface pb-24 pt-8 lg:pb-8">
        <div className="container-shell flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="#home" className="text-base font-black tracking-[0.13em]">
              MOON SHOP
            </Link>

            <p className="mt-2 max-w-sm text-xs leading-6 text-muted">
              پوشاک و اکسسوری برای سلیقه‌ای که به جزئیات اهمیت می‌دهد.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
            <a
              href="https://www.instagram.com/moon_shop_we/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              اینستاگرام
            </a>

            <a
              href="https://t.me/moon_shop_we/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              تلگرام
            </a>

            <Link href="/cart" className="transition-colors hover:text-brand">
              سبد خرید
            </Link>
          </div>
        </div>

        <div className="container-shell mt-6 border-t border-border pt-4 text-[10px] text-muted">
          © <CurrentYear /> Moon Shop
        </div>
      </footer>

      <MobileBottomNav active="home" />
    </>
  );
}
