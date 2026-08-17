import {
  ALLOWED_INSTALLMENTS,
  MAX_GROSS_ANNUAL_SALARY,
  MIN_GROSS_ANNUAL_SALARY,
} from "./constants";
import type { RawSalaryInput, ValidationError, ValidationResult } from "./types";

function isMissingValue(value: unknown): boolean {
  return value === undefined || value === null || value === "";
}

/**
 * Implements INPUT-001 and INPUT-002.
 * Validates the supported annual salary range and installments set.
 */
export function validateSalaryInput(input: RawSalaryInput): ValidationResult {
  const errors: ValidationError[] = [];

  if (isMissingValue(input.grossAnnualSalary)) {
    errors.push({
      field: "grossAnnualSalary",
      code: "required",
      message: "Inserisci la RAL annuale lorda.",
    });
  } else if (typeof input.grossAnnualSalary !== "number" || Number.isNaN(input.grossAnnualSalary)) {
    errors.push({
      field: "grossAnnualSalary",
      code: "invalid_number",
      message: "La RAL deve essere un numero valido.",
    });
  } else if (!Number.isFinite(input.grossAnnualSalary)) {
    errors.push({
      field: "grossAnnualSalary",
      code: "non_finite",
      message: "La RAL deve essere un numero finito.",
    });
  } else if (input.grossAnnualSalary <= 0) {
    errors.push({
      field: "grossAnnualSalary",
      code: "must_be_positive",
      message: "La RAL deve essere maggiore di zero.",
    });
  } else if (input.grossAnnualSalary < MIN_GROSS_ANNUAL_SALARY) {
    errors.push({
      field: "grossAnnualSalary",
      code: "below_minimum",
      message: "Questo prototipo supporta RAL annuali lorde tra EUR 20,000 e EUR 100,000.",
    });
  } else if (input.grossAnnualSalary > MAX_GROSS_ANNUAL_SALARY) {
    errors.push({
      field: "grossAnnualSalary",
      code: "above_maximum",
      message: "Questo prototipo supporta RAL annuali lorde tra EUR 20,000 e EUR 100,000.",
    });
  }

  if (isMissingValue(input.installments)) {
    errors.push({
      field: "installments",
      code: "required",
      message: "Seleziona il numero di mensilita.",
    });
  } else if (typeof input.installments !== "number" || Number.isNaN(input.installments)) {
    errors.push({
      field: "installments",
      code: "invalid_number",
      message: "Le mensilita devono essere un numero valido.",
    });
  } else if (!Number.isFinite(input.installments)) {
    errors.push({
      field: "installments",
      code: "non_finite",
      message: "Le mensilita devono essere un numero finito.",
    });
  } else if (!Number.isInteger(input.installments) || !ALLOWED_INSTALLMENTS.includes(input.installments as 12)) {
    errors.push({
      field: "installments",
      code: "invalid_installments",
      message: "Le mensilita supportate sono 12, 13 o 14.",
    });
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
    };
  }

  return { valid: true };
}
