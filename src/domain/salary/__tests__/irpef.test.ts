import { describe, expect, it } from "vitest";
import {
  calculateGrossIrpef,
  calculateNetIrpef,
  calculateTaxableIncome,
} from "@/domain/salary";

describe("TAXBASE-001 — taxable income", () => {
  it("subtracts employee contributions from gross salary", () => {
    expect(calculateTaxableIncome(30_000, 2_757)).toBeCloseTo(27_243, 10);
  });

  it("floors the taxable income at zero", () => {
    expect(calculateTaxableIncome(1_000, 1_500)).toBe(0);
  });
});

describe("IRPEF-001 — progressive gross IRPEF", () => {
  it("returns zero for zero taxable income", () => {
    expect(calculateGrossIrpef(0)).toEqual({
      firstBracketTax: 0,
      secondBracketTax: 0,
      thirdBracketTax: 0,
      grossIrpef: 0,
    });
  });

  it("uses 23% up to EUR 28,000", () => {
    const result = calculateGrossIrpef(28_000);

    expect(result.firstBracketTax).toBeCloseTo(6_440, 10);
    expect(result.secondBracketTax).toBe(0);
    expect(result.thirdBracketTax).toBe(0);
    expect(result.grossIrpef).toBeCloseTo(6_440, 10);
  });

  it("starts the 33% bracket immediately above EUR 28,000", () => {
    const result = calculateGrossIrpef(28_000.01);

    expect(result.firstBracketTax).toBeCloseTo(6_440, 10);
    expect(result.secondBracketTax).toBeCloseTo(0.0033, 10);
    expect(result.thirdBracketTax).toBe(0);
    expect(result.grossIrpef).toBeCloseTo(6_440.0033, 10);
  });

  it("keeps the third bracket at zero at EUR 50,000", () => {
    const result = calculateGrossIrpef(50_000);

    expect(result.firstBracketTax).toBeCloseTo(6_440, 10);
    expect(result.secondBracketTax).toBeCloseTo(7_260, 10);
    expect(result.thirdBracketTax).toBe(0);
    expect(result.grossIrpef).toBeCloseTo(13_700, 10);
  });

  it("starts the 43% bracket immediately above EUR 50,000", () => {
    const result = calculateGrossIrpef(50_000.01);

    expect(result.firstBracketTax).toBeCloseTo(6_440, 10);
    expect(result.secondBracketTax).toBeCloseTo(7_260, 10);
    expect(result.thirdBracketTax).toBeCloseTo(0.0043, 10);
    expect(result.grossIrpef).toBeCloseTo(13_700.0043, 10);
  });

  it("applies rates progressively rather than to the full income", () => {
    const result = calculateGrossIrpef(31_783.5);

    expect(result.firstBracketTax).toBeCloseTo(6_440, 10);
    expect(result.secondBracketTax).toBeCloseTo(1_248.555, 10);
    expect(result.thirdBracketTax).toBe(0);
    expect(result.grossIrpef).toBeCloseTo(7_688.555, 10);
  });
});

describe("DET-001 and CUNEO-002 — net IRPEF floor", () => {
  it("floors net IRPEF at zero when deductions exceed gross IRPEF", () => {
    expect(calculateNetIrpef(500, 600, 100)).toBe(0);
  });
});
