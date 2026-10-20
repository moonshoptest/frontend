export type ProductCategory = "sunglasses" | "knitwear" | "sweaters" | "shirts";

export type ProductColor = Readonly<{
  id: string;
  name: string;
  hex: string;
}>;

export type ProductSize = Readonly<{
  id: string;
  label: string;
}>;

export type Product = Readonly<{
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategory;

  price: number;
  originalPrice?: number;

  image: string;
  imageAlt: string;

  colors: readonly ProductColor[];
  sizes?: readonly ProductSize[];

  badge?: string;
  isAvailable: boolean;
}>;
