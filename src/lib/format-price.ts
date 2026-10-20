const tomanFormatter = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  if (!Number.isSafeInteger(amount) || amount < 0) {
    throw new RangeError("Price must be a non-negative safe integer.");
  }

  return `${tomanFormatter.format(amount)} تومان`;
}
