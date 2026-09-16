import { describe, expect, it } from 'vitest';
import { calculateTotal } from '../src/order.js';

describe('calculateTotal', () => {
  it('expects a 10% discount to produce 180', () => {
    expect(calculateTotal(100, 2, 10)).toBe(180);
  });

  it('expects the exact same call to produce 170 (impossible on purpose)', () => {
    expect(calculateTotal(100, 2, 10)).toBe(170);
  });
});
