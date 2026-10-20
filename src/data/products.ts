import type { Product, ProductColor, ProductSize } from "@/types/product";

const sunglassesColors = [
  { id: "black", name: "مشکی", hex: "#272126" },
  { id: "brown", name: "قهوه‌ای", hex: "#76533f" },
  { id: "tortoiseshell", name: "لاک‌پشتی", hex: "#98734f" },
] satisfies readonly ProductColor[];

const knitwearColors = [
  { id: "black", name: "مشکی", hex: "#272126" },
  { id: "charcoal", name: "زغالی", hex: "#59565a" },
  { id: "ivory", name: "استخوانی", hex: "#e9dfd0" },
  { id: "burgundy", name: "زرشکی", hex: "#6b344d" },
] satisfies readonly ProductColor[];

const sweaterColors = [
  { id: "pink", name: "صورتی", hex: "#e6b9c6" },
  { id: "white", name: "سفید", hex: "#ffffff" },
  { id: "cream", name: "کرم", hex: "#e9dfd0" },
  { id: "pastel-green", name: "سبز پاستلی", hex: "#c5d4b8" },
] satisfies readonly ProductColor[];

const shirtColors = [
  { id: "black", name: "مشکی", hex: "#272126" },
  { id: "cream", name: "کرم", hex: "#e9dfd0" },
  { id: "pistachio", name: "سبز پسته‌ای", hex: "#a9b99a" },
] satisfies readonly ProductColor[];

const clothingSizes = [
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
] satisfies readonly ProductSize[];

const sunglassesImage =
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85";

const knitwearImage =
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85";

const sweaterImage =
  "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=85";

const shirtImage =
  "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85";

const sunglassesModels = [
  "کلاسیک",
  "مستطیلی",
  "گرد",
  "کت‌آی",
  "اُوال",
  "ویفرر",
  "مینیمال",
  "باریک",
  "هندسی",
  "رترو",
  "اسپرت",
  "بزرگ",
  "فلزی",
  "فریم ضخیم",
  "فریم ظریف",
  "روزمره",
  "مدرن",
  "وینتیج",
  "آفتابی",
  "لایت",
  "فشن",
  "مربع",
  "نیم‌فریم",
  "استایل شهری",
] as const;

function createSunglassesProducts(): Product[] {
  return sunglassesModels.map((model, index) => {
    const modelNumber = String(index + 1).padStart(2, "0");
    const price = 690_000 + (index % 6) * 50_000;

    return {
      id: `lefties-uv400-${modelNumber}`,
      slug: `lefties-uv400-${modelNumber}`,
      name: `عینک آفتابی Lefties مدل ${model}`,
      description: "مدل نمونه برای نمایش کاتالوگ عینک‌های آفتابی در فروشگاه مون‌شاپ.",
      category: "sunglasses",
      price,
      ...(index % 3 === 0 ? { originalPrice: price + 200_000 } : {}),
      image: sunglassesImage,
      imageAlt: `تصویر نمونه عینک آفتابی، مدل ${model}`,
      colors: sunglassesColors,
      badge: index === 0 ? "منتخب" : undefined,
      isAvailable: true,
    };
  });
}

const clothingProducts = [
  {
    id: "button-collar-knit",
    slug: "button-collar-knit",
    name: "بافت یقه‌دکمه‌دار",
    description: "بافت وارداتی یقه‌دکمه‌دار با چند انتخاب رنگی.",
    category: "knitwear",
    price: 1_490_000,
    image: knitwearImage,
    imageAlt: "تصویر نمونه بافت",
    colors: knitwearColors,
    sizes: clothingSizes,
    badge: "منتخب",
    isAvailable: true,
  },
  {
    id: "mohair-sweater",
    slug: "mohair-sweater",
    name: "پلیور موهر",
    description: "پلیور موهر با رنگ‌های ملایم و مناسب استایل روزمره.",
    category: "sweaters",
    price: 1_890_000,
    image: sweaterImage,
    imageAlt: "تصویر نمونه پلیور",
    colors: sweaterColors,
    sizes: clothingSizes,
    badge: "جدید",
    isAvailable: true,
  },
  {
    id: "zara-two-pocket-shirt",
    slug: "zara-two-pocket-shirt",
    name: "پیراهن دو‌جیب",
    description: "پیراهن نمونه با طراحی ساده و رنگ‌های متنوع.",
    category: "shirts",
    price: 1_590_000,
    image: shirtImage,
    imageAlt: "تصویر نمونه پیراهن",
    colors: shirtColors,
    sizes: clothingSizes,
    isAvailable: true,
  },
] satisfies readonly Product[];

export const products: readonly Product[] = [...createSunglassesProducts(), ...clothingProducts];
