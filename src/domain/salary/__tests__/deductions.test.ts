import { describe, expect, it } from "vitest";
import {
  calculateEmployeeAdditionalDeduction,
  calculateEmployeeBaseDeduction,
  calculateEmployeeDeductionBreakdown,
  calculateFiscalWedgeTaxDeduction,
  calculateFiscalWedgeTaxFreeAmount,
} from "@/domain/salary";

describe("DET-001 — employee base deduction", () => {
  it("returns EUR 1,955 at EUR 15,000", () => {
    expect(calculateEmployeeBaseDeduction(15_000)).toBeCloseTo(1_955, 10);
  });

  it("switches formulas immediately above EUR 15,000", () => {
    expect(calculateEmployeeBaseDeduction(15_000.01)).toBeCloseTo(3_099.9990846153847, 10);
  });

  it("returns EUR 1,910 at EUR 28,000", () => {
    expect(calculateEmployeeBaseDeduction(28_000)).toBeCloseTo(1_910, 10);
  });

  it("uses the upper sliding formula immediately above EUR 28,000", () => {
    expect(calculateEmployeeBaseDeduction(28_000.01)).toBeCloseTo(1_909.999131818182, 10);
  });

  it("returns the documented EUR 35,000-case base deduction input", () => {
    expect(calculateEmployeeBaseDeduction(31_783.5)).toBeCloseTo(1_581.5234090909091, 10);
  });

  it("returns a positive amount at EUR 50,000 and zero above EUR 50,000", () => {
    expect(calculateEmployeeBaseDeduction(50_000)).toBe(0);
    expect(calculateEmployeeBaseDeduction(50_000.01)).toBe(0);
  });
});

describe("DET-001 — additional EUR 65 deduction", () => {
  it("does not apply at EUR 25,000", () => {
    expect(calculateEmployeeAdditionalDeduction(25_000)).toBe(0);
  });

  it("applies immediately above EUR 25,000", () => {
    expect(calculateEmployeeAdditionalDeduction(25_000.01)).toBe(65);
  });

  it("still applies at EUR 35,000 and stops above it", () => {
    expect(calculateEmployeeAdditionalDeduction(35_000)).toBe(65);
    expect(calculateEmployeeAdditionalDeduction(35_000.01)).toBe(0);
  });
});

describe("DET-001 — applied employee deduction breakdown", () => {
  it("matches the documented EUR 35,000 deduction values", () => {
    const result = calculateEmployeeDeductionBreakdown(31_783.5, 7_688.555);

    expect(result.employeeBaseDeduction).toBeCloseTo(1_581.5234090909091, 10);
    expect(result.employeeAdditionalDeduction).toBe(65);
    expect(result.totalEmployeeDeduction).toBeCloseTo(1_646.5234090909091, 10);
  });

  it("caps the total deduction at gross IRPEF", () => {
    const result = calculateEmployeeDeductionBreakdown(12_000, 1_000);

    expect(result.employeeBaseDeduction).toBe(1_955);
    expect(result.employeeAdditionalDeduction).toBe(0);
    expect(result.totalEmployeeDeduction).toBe(1_000);
  });
});

describe("CUNEO-001 — tax-free fiscal-wedge amount", () => {
  it("uses 7.1% up to EUR 8,500", () => {
    expect(calculateFiscalWedgeTaxFreeAmount(8_500)).toBeCloseTo(603.5, 10);
  });

  it("uses 5.3% immediately above EUR 8,500", () => {
    expect(calculateFiscalWedgeTaxFreeAmount(8_500.01)).toBeCloseTo(450.50053, 10);
  });

  it("uses 5.3% at EUR 15,000 and 4.8% immediately above it", () => {
    expect(calculateFiscalWedgeTaxFreeAmount(15_000)).toBeCloseTo(795, 10);
    expect(calculateFiscalWedgeTaxFreeAmount(15_000.01)).toBeCloseTo(720.00048, 10);
  });

  it("still applies at EUR 20,000 and becomes zero immediately above it", () => {
    expect(calculateFiscalWedgeTaxFreeAmount(20_000)).toBeCloseTo(960, 10);
    expect(calculateFiscalWedgeTaxFreeAmount(20_000.01)).toBe(0);
  });
});

describe("CUNEO-002 — fiscal-wedge tax deduction", () => {
  it("returns zero at EUR 20,000 and EUR 1,000 immediately above it", () => {
    expect(calculateFiscalWedgeTaxDeduction(20_000)).toBe(0);
    expect(calculateFiscalWedgeTaxDeduction(20_000.01)).toBe(1_000);
  });

  it("stays at EUR 1,000 through EUR 32,000", () => {
    expect(calculateFiscalWedgeTaxDeduction(32_000)).toBe(1_000);
  });

  it("tapers linearly immediately above EUR 32,000", () => {
    expect(calculateFiscalWedgeTaxDeduction(32_000.01)).toBeCloseTo(999.99875, 10);
  });

  it("remains positive immediately below EUR 40,000 and becomes zero at EUR 40,000", () => {
    expect(calculateFiscalWedgeTaxDeduction(39_999.99)).toBeCloseTo(0.00125, 10);
    expect(calculateFiscalWedgeTaxDeduction(40_000)).toBe(0);
  });

  it("keeps the taper linear within the documented band", () => {
    expect(calculateFiscalWedgeTaxDeduction(34_000)).toBeCloseTo(750, 10);
    expect(calculateFiscalWedgeTaxDeduction(36_000)).toBeCloseTo(500, 10);
  });
});
