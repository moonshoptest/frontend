import { products } from "@/data/products";
import type { CartItem, CartSelection } from "@/types/cart";

const STORAGE_KEY = "moon-shop-cart-v1";
const MAX_QUANTITY = 99;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidCartItem(value: unknown): value is CartItem {
  if (!isRecord(value)) {
    return false;
  }

  const { productId, colorId, sizeId, quantity } = value;

  if (
    typeof productId !== "string" ||
    typeof colorId !== "string" ||
    typeof quantity !== "number" ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > MAX_QUANTITY
  ) {
    return false;
  }

  const product = products.find((item) => item.id === productId);

  if (!product?.colors.some((color) => color.id === colorId)) {
    return false;
  }

  if (product.sizes && product.sizes.length > 0) {
    return typeof sizeId === "string" && product.sizes.some((size) => size.id === sizeId);
  }

  return sizeId === undefined;
}

export function readCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsed: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

export function saveCartItems(items: readonly CartItem[]): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
}

export function addCartItem(selection: CartSelection): boolean {
  const product = products.find((item) => item.id === selection.productId);

  if (!product?.isAvailable) {
    return false;
  }

  if (!product.colors.some((color) => color.id === selection.colorId)) {
    return false;
  }

  if (product.sizes && product.sizes.length > 0) {
    if (!selection.sizeId || !product.sizes.some((size) => size.id === selection.sizeId)) {
      return false;
    }
  } else if (selection.sizeId !== undefined) {
    return false;
  }

  const currentItems = readCartItems();

  const existingItem = currentItems.find(
    (item) =>
      item.productId === selection.productId &&
      item.colorId === selection.colorId &&
      item.sizeId === selection.sizeId,
  );

  let updatedItems: CartItem[];

  if (existingItem) {
    updatedItems = currentItems.map((item) =>
      item === existingItem
        ? {
            ...item,
            quantity: Math.min(MAX_QUANTITY, item.quantity + 1),
          }
        : item,
    );
  } else {
    updatedItems = [...currentItems, { ...selection, quantity: 1 }];
  }

  return saveCartItems(updatedItems);
}
