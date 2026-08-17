import {
  ADDITIONAL_EMPLOYEE_CONTRIBUTION_RATE,
  ADDITIONAL_EMPLOYEE_CONTRIBUTION_THRESHOLD,
  BASE_EMPLOYEE_CONTRIBUTION_RATE,
} from "./constants";
import type { ContributionBreakdown } from "./types";

function normalizeContributionBase(contributionBase: number): number {
  return contributionBase > 0 ? contributionBase : 0;
}

/**
 * Implements INPS-001.
 * Calculates the simplified fixed employee social-security contribution.
 */
export function calculateBaseEmployeeContributions(contributionBase: number): number {
  const normalizedBase = normalizeContributionBase(contributionBase);
  return normalizedBase * BASE_EMPLOYEE_CONTRIBUTION_RATE;
}

/**
 * Implements INPS-002.
 * Calculates the additional 1% employee contribution above the 2026 threshold.
 */
export function calculateAdditionalEmployeeContribution(contributionBase: number): number {
  const normalizedBase = normalizeContributionBase(contributionBase);
  return (
    Math.max(0, normalizedBase - ADDITIONAL_EMPLOYEE_CONTRIBUTION_THRESHOLD) *
    ADDITIONAL_EMPLOYEE_CONTRIBUTION_RATE
  );
}

/**
 * Implements INPS-001 and INPS-002.
 * Returns the full employee contribution breakdown for the annual base.
 */
export function calculateEmployeeContributionBreakdown(
  contributionBase: number,
): ContributionBreakdown {
  const baseEmployeeContributions = calculateBaseEmployeeContributions(contributionBase);
  const additionalEmployeeContribution = calculateAdditionalEmployeeContribution(contributionBase);

  return {
    baseEmployeeContributions,
    additionalEmployeeContribution,
    totalEmployeeContributions:
      baseEmployeeContributions + additionalEmployeeContribution,
  };
}
