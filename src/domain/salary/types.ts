export type SalaryInstallments = 12 | 13 | 14;

export type SalaryInput = {
  grossAnnualSalary: number;
  installments: SalaryInstallments;
};

export type RawSalaryInput = {
  grossAnnualSalary?: unknown;
  installments?: unknown;
};

export type ValidationField = "grossAnnualSalary" | "installments";

export type ValidationErrorCode =
  | "required"
  | "invalid_number"
  | "non_finite"
  | "must_be_positive"
  | "below_minimum"
  | "above_maximum"
  | "invalid_installments";

export type ValidationError = {
  field: ValidationField;
  code: ValidationErrorCode;
  message: string;
};

export type ValidationResult =
  | { valid: true }
  | {
      valid: false;
      errors: ValidationError[];
    };

export type ContributionBreakdown = {
  baseEmployeeContributions: number;
  additionalEmployeeContribution: number;
  totalEmployeeContributions: number;
};

export type GrossIrpefBreakdown = {
  firstBracketTax: number;
  secondBracketTax: number;
  thirdBracketTax: number;
  grossIrpef: number;
};

export type EmployeeDeductionBreakdown = {
  employeeBaseDeduction: number;
  employeeAdditionalDeduction: number;
  totalEmployeeDeduction: number;
};

export type LocalSurchargeBreakdown = {
  lombardyRegionalSurcharge: number;
  milanMunicipalSurcharge: number;
  totalLocalSurcharges: number;
};

export type SalaryCalculation = {
  input: SalaryInput;
  contributions: ContributionBreakdown;
  taxableIncome: number;
  irpef: {
    firstBracketTax: number;
    secondBracketTax: number;
    thirdBracketTax: number;
    grossIrpef: number;
    employeeBaseDeduction: number;
    employeeAdditionalDeduction: number;
    totalEmployeeDeduction: number;
    fiscalWedgeTaxDeduction: number;
    netIrpef: number;
  };
  fiscalWedgeTaxFreeAmount: number;
  localSurcharges: LocalSurchargeBreakdown;
  totals: {
    totalTaxes: number;
    totalWithholdings: number;
    annualNetSalary: number;
    averageMonthlyNetSalary: number;
    effectiveTaxRate: number;
    effectiveTotalWithholdingRate: number;
  };
};
