import {
  IRPEF_FIRST_BRACKET_LIMIT,
  IRPEF_FIRST_BRACKET_RATE,
  IRPEF_SECOND_BRACKET_LIMIT,
  IRPEF_SECOND_BRACKET_RATE,
  IRPEF_THIRD_BRACKET_RATE,
} from "./constants";
import type { GrossIrpefBreakdown } from "./types";

function normalizeIncome(income: number): number {
  return income > 0 ? income : 0;
}

/**
 * Implements TAXBASE-001.
 * Calculates the annual IRPEF taxable income in the standard scenario.
 */
export function calculateTaxableIncome(
  grossAnnualSalary: number,
  totalEmployeeContributions: number,
): number {
  return Math.max(0, grossAnnualSalary - totalEmployeeContributions);
}

/**
 * Implements IRPEF-001.
 * Calculates progressive gross IRPEF and bracket-level components.
 */
export function calculateGrossIrpef(taxableIncome: number): GrossIrpefBreakdown {
  const normalizedIncome = normalizeIncome(taxableIncome);
  const firstBracketTax =
    Math.min(normalizedIncome, IRPEF_FIRST_BRACKET_LIMIT) * IRPEF_FIRST_BRACKET_RATE;
  const secondBracketTax =
    Math.max(
      0,
      Math.min(normalizedIncome, IRPEF_SECOND_BRACKET_LIMIT) - IRPEF_FIRST_BRACKET_LIMIT,
    ) * IRPEF_SECOND_BRACKET_RATE;
  const thirdBracketTax =
    Math.max(0, normalizedIncome - IRPEF_SECOND_BRACKET_LIMIT) * IRPEF_THIRD_BRACKET_RATE;

  return {
    firstBracketTax,
    secondBracketTax,
    thirdBracketTax,
    grossIrpef: firstBracketTax + secondBracketTax + thirdBracketTax,
  };
}

/**
 * Implements DET-001 and CUNEO-002.
 * Floors final net IRPEF at zero after all deductions.
 */
export function calculateNetIrpef(
  grossIrpef: number,
  totalEmployeeDeduction: number,
  fiscalWedgeTaxDeduction: number,
): number {
  return Math.max(0, grossIrpef - totalEmployeeDeduction - fiscalWedgeTaxDeduction);
}
