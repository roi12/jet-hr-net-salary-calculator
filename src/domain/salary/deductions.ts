import {
  EMPLOYEE_DEDUCTION_EXTRA_AMOUNT,
  EMPLOYEE_DEDUCTION_FULL_AMOUNT,
  EMPLOYEE_DEDUCTION_MIDDLE_BASE,
  EMPLOYEE_DEDUCTION_MIDDLE_EXTRA,
  FISCAL_WEDGE_TAX_DEDUCTION_FULL_AMOUNT,
  FISCAL_WEDGE_TAX_FREE_FIRST_RATE,
  FISCAL_WEDGE_TAX_FREE_SECOND_RATE,
  FISCAL_WEDGE_TAX_FREE_THIRD_RATE,
} from "./constants";
import type { EmployeeDeductionBreakdown } from "./types";

function normalizeIncome(income: number): number {
  return income > 0 ? income : 0;
}

/**
 * Implements DET-001.
 * Calculates the base employee tax deduction before the EUR 65 supplement.
 */
export function calculateEmployeeBaseDeduction(totalIncome: number): number {
  const income = normalizeIncome(totalIncome);

  if (income <= 15_000) {
    return EMPLOYEE_DEDUCTION_FULL_AMOUNT;
  }

  if (income <= 28_000) {
    return (
      EMPLOYEE_DEDUCTION_MIDDLE_BASE +
      EMPLOYEE_DEDUCTION_MIDDLE_EXTRA * ((28_000 - income) / 13_000)
    );
  }

  if (income <= 50_000) {
    return EMPLOYEE_DEDUCTION_MIDDLE_BASE * ((50_000 - income) / 22_000);
  }

  return 0;
}

/**
 * Implements DET-001.
 * Calculates the additional EUR 65 employee deduction in the approved band.
 */
export function calculateEmployeeAdditionalDeduction(totalIncome: number): number {
  const income = normalizeIncome(totalIncome);
  return income > 25_000 && income <= 35_000 ? EMPLOYEE_DEDUCTION_EXTRA_AMOUNT : 0;
}

/**
 * Implements DET-001.
 * Calculates the applied employee deduction breakdown, capped at gross IRPEF.
 */
export function calculateEmployeeDeductionBreakdown(
  totalIncome: number,
  grossIrpef: number,
): EmployeeDeductionBreakdown {
  const employeeBaseDeduction = calculateEmployeeBaseDeduction(totalIncome);
  const employeeAdditionalDeduction = calculateEmployeeAdditionalDeduction(totalIncome);
  const uncappedDeduction = employeeBaseDeduction + employeeAdditionalDeduction;

  return {
    employeeBaseDeduction,
    employeeAdditionalDeduction,
    totalEmployeeDeduction: Math.min(Math.max(0, grossIrpef), uncappedDeduction),
  };
}

/**
 * Implements CUNEO-001.
 * Calculates the tax-free fiscal-wedge amount for eligible annual employment income.
 */
export function calculateFiscalWedgeTaxFreeAmount(employmentIncome: number): number {
  const income = normalizeIncome(employmentIncome);

  if (income <= 8_500) {
    return income * FISCAL_WEDGE_TAX_FREE_FIRST_RATE;
  }

  if (income <= 15_000) {
    return income * FISCAL_WEDGE_TAX_FREE_SECOND_RATE;
  }

  if (income <= 20_000) {
    return income * FISCAL_WEDGE_TAX_FREE_THIRD_RATE;
  }

  return 0;
}

/**
 * Implements CUNEO-002.
 * Calculates the annual fiscal-wedge tax deduction for the documented income bands.
 */
export function calculateFiscalWedgeTaxDeduction(totalIncome: number): number {
  const income = normalizeIncome(totalIncome);

  if (income <= 20_000) {
    return 0;
  }

  if (income <= 32_000) {
    return FISCAL_WEDGE_TAX_DEDUCTION_FULL_AMOUNT;
  }

  if (income < 40_000) {
    return FISCAL_WEDGE_TAX_DEDUCTION_FULL_AMOUNT * ((40_000 - income) / 8_000);
  }

  return 0;
}
