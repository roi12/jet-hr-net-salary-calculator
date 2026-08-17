import {
  LOMBARDY_FIRST_SURCHARGE_RATE,
  LOMBARDY_FOURTH_SURCHARGE_RATE,
  LOMBARDY_SECOND_SURCHARGE_RATE,
  LOMBARDY_THIRD_SURCHARGE_RATE,
  MILAN_MUNICIPAL_EXEMPTION_THRESHOLD,
  MILAN_MUNICIPAL_SURCHARGE_RATE,
} from "./constants";
import type { LocalSurchargeBreakdown } from "./types";

function normalizeIncome(income: number): number {
  return income > 0 ? income : 0;
}

/**
 * Implements REG-LOM-001.
 * Calculates the Lombardy regional surcharge progressively.
 */
export function calculateLombardyRegionalSurcharge(income: number): number {
  const normalizedIncome = normalizeIncome(income);

  return (
    Math.min(normalizedIncome, 15_000) * LOMBARDY_FIRST_SURCHARGE_RATE +
    Math.max(0, Math.min(normalizedIncome, 28_000) - 15_000) * LOMBARDY_SECOND_SURCHARGE_RATE +
    Math.max(0, Math.min(normalizedIncome, 50_000) - 28_000) * LOMBARDY_THIRD_SURCHARGE_RATE +
    Math.max(0, normalizedIncome - 50_000) * LOMBARDY_FOURTH_SURCHARGE_RATE
  );
}

/**
 * Implements COM-MI-001.
 * Calculates the Milan municipal surcharge with the documented discontinuity.
 */
export function calculateMilanMunicipalSurcharge(income: number): number {
  const normalizedIncome = normalizeIncome(income);

  if (normalizedIncome <= MILAN_MUNICIPAL_EXEMPTION_THRESHOLD) {
    return 0;
  }

  return normalizedIncome * MILAN_MUNICIPAL_SURCHARGE_RATE;
}

/**
 * Implements REG-LOM-001, COM-MI-001, and OUTPUT-001 local-tax composition.
 * Returns the complete local surcharge breakdown.
 */
export function calculateLocalSurchargeBreakdown(
  income: number,
): LocalSurchargeBreakdown {
  const lombardyRegionalSurcharge = calculateLombardyRegionalSurcharge(income);
  const milanMunicipalSurcharge = calculateMilanMunicipalSurcharge(income);

  return {
    lombardyRegionalSurcharge,
    milanMunicipalSurcharge,
    totalLocalSurcharges:
      lombardyRegionalSurcharge + milanMunicipalSurcharge,
  };
}
