export function calculateTotal(price, quantity, discountPercent) {
  const subtotal = price * quantity;

  // Intentionally buggy:
  // discountPercent should be treated as a percentage,
  // but this implementation subtracts it directly.
  return subtotal - discountPercent;
}
