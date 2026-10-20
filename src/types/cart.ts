export type CartItem = Readonly<{
  productId: string;
  colorId: string;
  sizeId?: string;
  quantity: number;
}>;

export type CartSelection = Omit<CartItem, "quantity">;
