import type { IconName } from "@/components/ui/icon";
import type { ProductCategory } from "@/types/product";

export type ShopCategory = {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
  color: string;
  productCategories: readonly ProductCategory[];
};

export const categories: readonly ShopCategory[] = [
  {
    slug: "sunglasses",
    title: "عینک آفتابی",
    description: "مدل‌های متنوع برای تکمیل استایل",
    icon: "sunglasses",
    color: "bg-[#f1e7de]",
    productCategories: ["sunglasses"],
  },
  {
    slug: "knitwear",
    title: "بافت و پلیور",
    description: "انتخاب‌های نرم و روزمره",
    icon: "layers",
    color: "bg-[#f0e6e9]",
    productCategories: ["knitwear", "sweaters"],
  },
  {
    slug: "shirts",
    title: "پیراهن",
    description: "سادگی با جزئیات ظریف",
    icon: "shirt",
    color: "bg-[#e7ece5]",
    productCategories: ["shirts"],
  },
];
