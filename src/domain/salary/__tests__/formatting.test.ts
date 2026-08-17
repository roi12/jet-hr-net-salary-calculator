import { describe, expect, it } from "vitest";
import { formatCurrency, formatPercentage, roundHalfUp } from "@/domain/salary";

describe("ROUND-001 — presentation rounding helpers", () => {
  it("rounds half-up to two decimals", () => {
    expect(roundHalfUp(454.9762)).toBe(454.98);
    expect(roundHalfUp(1_248.555)).toBe(1_248.56);
  });

  it("formats currency with the documented display style", () => {
    expect(formatCurrency(5_751.275790909091)).toBe("EUR 5,751.28");
  });

  it("formats percentages with two decimals", () => {
    expect(formatPercentage(0.16432216545454546)).toBe("16.43%");
  });
});
