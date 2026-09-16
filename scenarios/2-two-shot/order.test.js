import { describe, expect, it } from 'vitest';
import { calculateTotal } from '../src/order.js';

describe('calculateTotal', () => {
  it('applies the percentage discount for bulk orders (qty >= 5)', () => {
    expect(calculateTotal(100, 5, 10)).toBe(450);
  });

  it('applies the percentage discount for larger bulk orders', () => {
    expect(calculateTotal(50, 6, 20)).toBe(240);
  });

  it('does NOT apply a discount for small orders (qty < 5)', () => {
    expect(calculateTotal(100, 2, 10)).toBe(200);
  });

  it('does NOT apply a discount for a single item', () => {
    expect(calculateTotal(80, 1, 50)).toBe(80);
  });
});
