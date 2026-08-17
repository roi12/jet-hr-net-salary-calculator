/**
 * Implements ROUND-001.
 * Rounds numeric values half-up for presentation only.
 */
export function roundHalfUp(value: number, fractionDigits = 2): number {
  const factor = 10 ** fractionDigits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Implements ROUND-001.
 * Formats a monetary value using the display convention documented in the examples.
 */
export function formatCurrency(value: number): string {
  const rounded = roundHalfUp(value, 2);

  return `EUR ${rounded.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Implements ROUND-001.
 * Formats a decimal rate for display as a percentage with two decimals.
 */
export function formatPercentage(value: number): string {
  const rounded = roundHalfUp(value * 100, 2);

  return `${rounded.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}
