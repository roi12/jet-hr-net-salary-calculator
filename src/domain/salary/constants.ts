import type { SalaryInstallments } from "./types";

/** Implements SCOPE-001. */
export const ACTIVE_TAX_YEAR = 2026;

/** Implements SCOPE-002. */
export const FULL_YEAR_EMPLOYMENT_FACTOR = 1;

/** Implements INPUT-001. */
export const MIN_GROSS_ANNUAL_SALARY = 20_000;

/** Implements INPUT-001. */
export const MAX_GROSS_ANNUAL_SALARY = 100_000;

/** Implements INPUT-002. */
export const ALLOWED_INSTALLMENTS: readonly SalaryInstallments[] = [12, 13, 14];

/** Implements INPS-001. */
export const BASE_EMPLOYEE_CONTRIBUTION_RATE = 0.0919;

/** Implements INPS-002. */
export const ADDITIONAL_EMPLOYEE_CONTRIBUTION_RATE = 0.01;

/** Implements INPS-002. */
export const ADDITIONAL_EMPLOYEE_CONTRIBUTION_THRESHOLD = 56_224;

/** Implements IRPEF-001. */
export const IRPEF_FIRST_BRACKET_LIMIT = 28_000;

/** Implements IRPEF-001. */
export const IRPEF_SECOND_BRACKET_LIMIT = 50_000;

/** Implements IRPEF-001. */
export const IRPEF_FIRST_BRACKET_RATE = 0.23;

/** Implements IRPEF-001. */
export const IRPEF_SECOND_BRACKET_RATE = 0.33;

/** Implements IRPEF-001. */
export const IRPEF_THIRD_BRACKET_RATE = 0.43;

/** Implements DET-001. */
export const EMPLOYEE_DEDUCTION_FULL_AMOUNT = 1_955;

/** Implements DET-001. */
export const EMPLOYEE_DEDUCTION_MIDDLE_BASE = 1_910;

/** Implements DET-001. */
export const EMPLOYEE_DEDUCTION_MIDDLE_EXTRA = 1_190;

/** Implements DET-001. */
export const EMPLOYEE_DEDUCTION_EXTRA_AMOUNT = 65;

/** Implements CUNEO-001. */
export const FISCAL_WEDGE_TAX_FREE_FIRST_RATE = 0.071;

/** Implements CUNEO-001. */
export const FISCAL_WEDGE_TAX_FREE_SECOND_RATE = 0.053;

/** Implements CUNEO-001. */
export const FISCAL_WEDGE_TAX_FREE_THIRD_RATE = 0.048;

/** Implements CUNEO-002. */
export const FISCAL_WEDGE_TAX_DEDUCTION_FULL_AMOUNT = 1_000;

/** Implements REG-LOM-001. */
export const LOMBARDY_FIRST_SURCHARGE_RATE = 0.0123;

/** Implements REG-LOM-001. */
export const LOMBARDY_SECOND_SURCHARGE_RATE = 0.0158;

/** Implements REG-LOM-001. */
export const LOMBARDY_THIRD_SURCHARGE_RATE = 0.0172;

/** Implements REG-LOM-001. */
export const LOMBARDY_FOURTH_SURCHARGE_RATE = 0.0173;

/** Implements COM-MI-001. */
export const MILAN_MUNICIPAL_EXEMPTION_THRESHOLD = 23_000;

/** Implements COM-MI-001. */
export const MILAN_MUNICIPAL_SURCHARGE_RATE = 0.008;
