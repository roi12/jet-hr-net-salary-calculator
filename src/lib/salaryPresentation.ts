import type { ValidationError, ValidationField } from "@/domain/salary";

const currencyFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("it-IT", {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export function formatEuro(value: number): string {
  return currencyFormatter.format(value);
}

export function formatPercent(value: number): string {
  return percentFormatter.format(value);
}

export function parseGrossAnnualSalaryInput(rawValue: string): number | undefined {
  const normalizedValue = rawValue
    .trim()
    .replace(/[€\s]/g, "")
    .replace(/\u00A0/g, "");

  if (normalizedValue === "") {
    return undefined;
  }

  if (/^\d{1,3}([.,]\d{3})+$/.test(normalizedValue)) {
    return Number(normalizedValue.replace(/[.,]/g, ""));
  }

  if (normalizedValue.includes(".") && normalizedValue.includes(",")) {
    return Number(normalizedValue.replace(/\./g, "").replace(",", "."));
  }

  if (normalizedValue.includes(",")) {
    return Number(normalizedValue.replace(",", "."));
  }

  return Number(normalizedValue);
}

export function getValidationMessage(error: ValidationError): string {
  if (error.field === "grossAnnualSalary") {
    switch (error.code) {
      case "required":
        return "Inserisci la retribuzione annua lorda.";
      case "invalid_number":
      case "non_finite":
        return "Inserisci un importo numerico valido.";
      case "must_be_positive":
        return "La RAL deve essere maggiore di zero.";
      case "below_minimum":
      case "above_maximum":
        return "Il prototipo supporta RAL comprese tra €20.000 e €100.000.";
      default:
        return error.message;
    }
  }

  switch (error.code) {
    case "required":
    case "invalid_installments":
      return "Seleziona 12, 13 o 14 mensilità.";
    case "invalid_number":
    case "non_finite":
      return "Le mensilità devono essere un numero valido.";
    default:
      return error.message;
  }
}

export function getFirstFieldError(
  errors: ValidationError[],
  field: ValidationField,
): string | undefined {
  const error = errors.find((item) => item.field === field);
  return error ? getValidationMessage(error) : undefined;
}
