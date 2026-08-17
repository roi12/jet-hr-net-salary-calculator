import { describe, expect, it } from "vitest";
import {
  calculateLocalSurchargeBreakdown,
  calculateLombardyRegionalSurcharge,
  calculateMilanMunicipalSurcharge,
} from "@/domain/salary";

describe("REG-LOM-001 — Lombardy regional surcharge", () => {
  it("applies only the first band at EUR 15,000", () => {
    expect(calculateLombardyRegionalSurcharge(15_000)).toBeCloseTo(184.5, 10);
  });

  it("starts the second band immediately above EUR 15,000", () => {
    expect(calculateLombardyRegionalSurcharge(15_000.01)).toBeCloseTo(184.500158, 10);
  });

  it("does not start the third band at EUR 28,000", () => {
    expect(calculateLombardyRegionalSurcharge(28_000)).toBeCloseTo(389.9, 10);
  });

  it("starts the third band immediately above EUR 28,000", () => {
    expect(calculateLombardyRegionalSurcharge(28_000.01)).toBeCloseTo(389.900172, 10);
  });

  it("does not start the fourth band at EUR 50,000", () => {
    expect(calculateLombardyRegionalSurcharge(50_000)).toBeCloseTo(768.3, 10);
  });

  it("starts the fourth band immediately above EUR 50,000", () => {
    expect(calculateLombardyRegionalSurcharge(50_000.01)).toBeCloseTo(768.300173, 10);
  });
});

describe("COM-MI-001 — Milan municipal surcharge", () => {
  it("returns zero at the EUR 23,000 exemption threshold", () => {
    expect(calculateMilanMunicipalSurcharge(23_000)).toBe(0);
  });

  it("applies the 0.8% rate to the full income immediately above the threshold", () => {
    expect(calculateMilanMunicipalSurcharge(23_000.01)).toBeCloseTo(184.00008, 10);
  });

  it("matches the documented EUR 35,000-case income", () => {
    expect(calculateMilanMunicipalSurcharge(31_783.5)).toBeCloseTo(254.268, 10);
  });
});

describe("REG-LOM-001 and COM-MI-001 — local surcharge breakdown", () => {
  it("matches the documented EUR 35,000 combined amount", () => {
    const result = calculateLocalSurchargeBreakdown(31_783.5);

    expect(result.lombardyRegionalSurcharge).toBeCloseTo(454.9762, 10);
    expect(result.milanMunicipalSurcharge).toBeCloseTo(254.268, 10);
    expect(result.totalLocalSurcharges).toBeCloseTo(709.2442, 10);
  });
});
