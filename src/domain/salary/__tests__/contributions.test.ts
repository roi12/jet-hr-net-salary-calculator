import { describe, expect, it } from "vitest";
import {
  calculateAdditionalEmployeeContribution,
  calculateBaseEmployeeContributions,
  calculateEmployeeContributionBreakdown,
} from "@/domain/salary";

describe("INPS-001 — simplified employee contribution rate", () => {
  it("calculates the fixed 9.19% contribution", () => {
    expect(calculateBaseEmployeeContributions(30_000)).toBeCloseTo(2_757, 10);
  });

  it("returns zero for a zero base", () => {
    expect(calculateBaseEmployeeContributions(0)).toBe(0);
  });
});

describe("INPS-002 — additional 1% employee contribution", () => {
  it("returns zero immediately below EUR 56,224", () => {
    expect(calculateAdditionalEmployeeContribution(56_223.99)).toBe(0);
  });

  it("returns zero exactly at EUR 56,224", () => {
    expect(calculateAdditionalEmployeeContribution(56_224)).toBe(0);
  });

  it("starts immediately above EUR 56,224", () => {
    expect(calculateAdditionalEmployeeContribution(56_224.01)).toBeCloseTo(0.0001, 10);
  });

  it("matches a manually calculated excess amount", () => {
    expect(calculateAdditionalEmployeeContribution(60_000)).toBeCloseTo(37.76, 10);
  });
});

describe("INPS-001 and INPS-002 — employee contribution breakdown", () => {
  it("returns the expected total for EUR 35,000", () => {
    const result = calculateEmployeeContributionBreakdown(35_000);

    expect(result.baseEmployeeContributions).toBeCloseTo(3_216.5, 10);
    expect(result.additionalEmployeeContribution).toBe(0);
    expect(result.totalEmployeeContributions).toBeCloseTo(3_216.5, 10);
  });
});
