import { describe, expect, it } from 'vitest';
import { calculateTotal } from '../src/order.js';

describe('calculateTotal', () => {
  it('should calculate total with percentage discount', () => {
    expect(calculateTotal(100, 2, 10)).toBe(180);
  });

  it('should handle no discount', () => {
    expect(calculateTotal(100, 2, 0)).toBe(200);
  });

  it('should calculate another percentage discount', () => {
    expect(calculateTotal(50, 4, 20)).toBe(160);
  });
});
