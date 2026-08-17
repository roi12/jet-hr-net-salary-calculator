import { describe, expect, it } from "vitest";
import { calculateSalary, formatCurrency, formatPercentage } from "@/domain/salary";

describe("OUTPUT-004 — installment handling", () => {
  it("keeps annual values identical across 12, 13, and 14 installments", () => {
    const salary12 = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 12,
    });
    const salary13 = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 13,
    });
    const salary14 = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 14,
    });

    expect(salary12.totals.annualNetSalary).toBeCloseTo(salary13.totals.annualNetSalary, 10);
    expect(salary13.totals.annualNetSalary).toBeCloseTo(salary14.totals.annualNetSalary, 10);
    expect(salary12.totals.totalTaxes).toBeCloseTo(salary13.totals.totalTaxes, 10);
    expect(salary13.totals.totalTaxes).toBeCloseTo(salary14.totals.totalTaxes, 10);
    expect(salary12.contributions.totalEmployeeContributions).toBeCloseTo(
      salary13.contributions.totalEmployeeContributions,
      10,
    );
    expect(salary13.contributions.totalEmployeeContributions).toBeCloseTo(
      salary14.contributions.totalEmployeeContributions,
      10,
    );
    expect(salary12.totals.averageMonthlyNetSalary).toBeCloseTo(
      salary12.totals.annualNetSalary / 12,
      10,
    );
    expect(salary13.totals.averageMonthlyNetSalary).toBeCloseTo(
      salary13.totals.annualNetSalary / 13,
      10,
    );
    expect(salary14.totals.averageMonthlyNetSalary).toBeCloseTo(
      salary14.totals.annualNetSalary / 14,
      10,
    );
  });
});

describe("CUNEO-001 and CUNEO-002 — annual net integration", () => {
  it("applies the tax-free wedge only to annual net for eligible income", () => {
    const result = calculateSalary({
      grossAnnualSalary: 20_000,
      installments: 13,
    });

    expect(result.taxableIncome).toBeCloseTo(18_162, 10);
    expect(result.fiscalWedgeTaxFreeAmount).toBeCloseTo(871.776, 10);
    expect(result.irpef.fiscalWedgeTaxDeduction).toBe(0);
    expect(result.irpef.netIrpef).toBeCloseTo(
      result.irpef.grossIrpef - result.irpef.totalEmployeeDeduction,
      10,
    );
    expect(result.totals.annualNetSalary).toBeCloseTo(
      20_000 -
        result.contributions.totalEmployeeContributions -
        result.irpef.netIrpef -
        result.localSurcharges.lombardyRegionalSurcharge -
        result.localSurcharges.milanMunicipalSurcharge +
        result.fiscalWedgeTaxFreeAmount,
      10,
    );
  });

  it("does not double-count the fiscal-wedge tax deduction in annual net", () => {
    const result = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 13,
    });

    expect(result.irpef.fiscalWedgeTaxDeduction).toBe(1_000);
    expect(result.fiscalWedgeTaxFreeAmount).toBe(0);
    expect(result.totals.annualNetSalary).toBeCloseTo(
      35_000 -
        result.contributions.totalEmployeeContributions -
        result.irpef.netIrpef -
        result.localSurcharges.lombardyRegionalSurcharge -
        result.localSurcharges.milanMunicipalSurcharge,
      10,
    );
  });
});

describe("Golden integration case — RAL EUR 35,000 over 13 installments", () => {
  it("matches the unrounded annual calculation contract", () => {
    const result = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 13,
    });

    expect(result.contributions.totalEmployeeContributions).toBeCloseTo(3_216.5, 10);
    expect(result.taxableIncome).toBeCloseTo(31_783.5, 10);
    expect(result.irpef.firstBracketTax).toBeCloseTo(6_440, 10);
    expect(result.irpef.secondBracketTax).toBeCloseTo(1_248.555, 10);
    expect(result.irpef.grossIrpef).toBeCloseTo(7_688.555, 10);
    expect(result.irpef.totalEmployeeDeduction).toBeCloseTo(1_646.5234090909091, 10);
    expect(result.irpef.fiscalWedgeTaxDeduction).toBe(1_000);
    expect(result.irpef.netIrpef).toBeCloseTo(5_042.031590909091, 10);
    expect(result.localSurcharges.lombardyRegionalSurcharge).toBeCloseTo(454.9762, 10);
    expect(result.localSurcharges.milanMunicipalSurcharge).toBeCloseTo(254.268, 10);
    expect(result.totals.totalTaxes).toBeCloseTo(5_751.275790909091, 10);
    expect(result.totals.totalWithholdings).toBeCloseTo(8_967.77579090909, 10);
    expect(result.totals.annualNetSalary).toBeCloseTo(26_032.22420909091, 10);
    expect(result.totals.averageMonthlyNetSalary).toBeCloseTo(2_002.4787853146853, 10);
    expect(result.totals.effectiveTaxRate).toBeCloseTo(0.16432216545454546, 10);
    expect(result.totals.effectiveTotalWithholdingRate).toBeCloseTo(
      0.25622216545454545,
      10,
    );
  });

  it("matches the documented display-rounded values", () => {
    const result = calculateSalary({
      grossAnnualSalary: 35_000,
      installments: 13,
    });

    expect(formatCurrency(result.contributions.totalEmployeeContributions)).toBe("EUR 3,216.50");
    expect(formatCurrency(result.taxableIncome)).toBe("EUR 31,783.50");
    expect(formatCurrency(result.irpef.firstBracketTax)).toBe("EUR 6,440.00");
    expect(formatCurrency(result.irpef.secondBracketTax)).toBe("EUR 1,248.56");
    expect(formatCurrency(result.irpef.grossIrpef)).toBe("EUR 7,688.56");
    expect(formatCurrency(result.irpef.employeeBaseDeduction)).toBe("EUR 1,581.52");
    expect(formatCurrency(result.irpef.employeeAdditionalDeduction)).toBe("EUR 65.00");
    expect(formatCurrency(result.irpef.totalEmployeeDeduction)).toBe("EUR 1,646.52");
    expect(formatCurrency(result.fiscalWedgeTaxFreeAmount)).toBe("EUR 0.00");
    expect(formatCurrency(result.irpef.fiscalWedgeTaxDeduction)).toBe("EUR 1,000.00");
    expect(formatCurrency(result.irpef.netIrpef)).toBe("EUR 5,042.03");
    expect(formatCurrency(result.localSurcharges.lombardyRegionalSurcharge)).toBe("EUR 454.98");
    expect(formatCurrency(result.localSurcharges.milanMunicipalSurcharge)).toBe("EUR 254.27");
    expect(formatCurrency(result.totals.totalTaxes)).toBe("EUR 5,751.28");
    expect(formatCurrency(result.totals.totalWithholdings)).toBe("EUR 8,967.78");
    expect(formatCurrency(result.totals.annualNetSalary)).toBe("EUR 26,032.22");
    expect(formatCurrency(result.totals.averageMonthlyNetSalary)).toBe("EUR 2,002.48");
    expect(formatPercentage(result.totals.effectiveTaxRate)).toBe("16.43%");
    expect(formatPercentage(result.totals.effectiveTotalWithholdingRate)).toBe("25.62%");
  });
});
