import { calculateEmployeeContributionBreakdown } from "./contributions";
import {
  calculateEmployeeDeductionBreakdown,
  calculateFiscalWedgeTaxDeduction,
  calculateFiscalWedgeTaxFreeAmount,
} from "./deductions";
import { calculateGrossIrpef, calculateNetIrpef, calculateTaxableIncome } from "./irpef";
import { calculateLocalSurchargeBreakdown } from "./surcharges";
import type { SalaryCalculation, SalaryInput } from "./types";
import { validateSalaryInput } from "./validation";

/**
 * Implements INPUT-001 and INPUT-002.
 * Ensures the calculation engine does not produce results for unsupported inputs.
 */
function assertValidSalaryInput(input: SalaryInput): void {
  const validationResult = validateSalaryInput(input);

  if (!validationResult.valid) {
    const errorCodes = validationResult.errors.map((error) => error.code).join(", ");
    throw new Error(`Invalid salary input: ${errorCodes}`);
  }
}

/**
 * Implements OUTPUT-001, OUTPUT-002, OUTPUT-003, OUTPUT-004, and OUTPUT-005.
 * Calculates the full annual gross-to-net salary breakdown for the 2026 model.
 */
export function calculateSalary(input: SalaryInput): SalaryCalculation {
  assertValidSalaryInput(input);

  const contributions = calculateEmployeeContributionBreakdown(input.grossAnnualSalary);
  const taxableIncome = calculateTaxableIncome(
    input.grossAnnualSalary,
    contributions.totalEmployeeContributions,
  );
  const grossIrpefBreakdown = calculateGrossIrpef(taxableIncome);
  const employeeDeductionBreakdown = calculateEmployeeDeductionBreakdown(
    taxableIncome,
    grossIrpefBreakdown.grossIrpef,
  );
  const fiscalWedgeTaxFreeAmount = calculateFiscalWedgeTaxFreeAmount(taxableIncome);
  const fiscalWedgeTaxDeduction = calculateFiscalWedgeTaxDeduction(taxableIncome);
  const netIrpef = calculateNetIrpef(
    grossIrpefBreakdown.grossIrpef,
    employeeDeductionBreakdown.totalEmployeeDeduction,
    fiscalWedgeTaxDeduction,
  );
  const localSurcharges = calculateLocalSurchargeBreakdown(taxableIncome);
  const totalTaxes = netIrpef + localSurcharges.totalLocalSurcharges;
  const totalWithholdings =
    contributions.totalEmployeeContributions + totalTaxes;
  const annualNetSalary =
    input.grossAnnualSalary -
    contributions.totalEmployeeContributions -
    netIrpef -
    localSurcharges.lombardyRegionalSurcharge -
    localSurcharges.milanMunicipalSurcharge +
    fiscalWedgeTaxFreeAmount;
  const averageMonthlyNetSalary = annualNetSalary / input.installments;

  return {
    input,
    contributions,
    taxableIncome,
    irpef: {
      ...grossIrpefBreakdown,
      ...employeeDeductionBreakdown,
      fiscalWedgeTaxDeduction,
      netIrpef,
    },
    fiscalWedgeTaxFreeAmount,
    localSurcharges,
    totals: {
      totalTaxes,
      totalWithholdings,
      annualNetSalary,
      averageMonthlyNetSalary,
      effectiveTaxRate: totalTaxes / input.grossAnnualSalary,
      effectiveTotalWithholdingRate:
        totalWithholdings / input.grossAnnualSalary,
    },
  };
}
