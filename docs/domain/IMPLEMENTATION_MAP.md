# Implementation Map

This file maps the approved 2026 salary-calculation rules to their implementation and automated tests.

| Rule ID | Implementation file | Exported function or constant | Related test file | Implementation status |
| --- | --- | --- | --- | --- |
| `SCOPE-001` | `src/domain/salary/constants.ts` | `ACTIVE_TAX_YEAR` | `src/domain/salary/__tests__/calculateSalary.test.ts` | Implemented |
| `SCOPE-002` | `src/domain/salary/constants.ts` | `FULL_YEAR_EMPLOYMENT_FACTOR` | `src/domain/salary/__tests__/deductions.test.ts` | Implemented as fixed full-year scope constraint |
| `INPUT-001` | `src/domain/salary/validation.ts` | `validateSalaryInput` | `src/domain/salary/__tests__/validation.test.ts` | Implemented |
| `INPUT-002` | `src/domain/salary/validation.ts` | `validateSalaryInput` | `src/domain/salary/__tests__/validation.test.ts` | Implemented |
| `INPUT-002` | `src/config/salaryCalculator.ts` | `DEFAULT_SALARY_INSTALLMENTS` | `src/config/__tests__/salaryCalculator.test.ts` | Implemented in presentation-layer config |
| `INPS-001` | `src/domain/salary/contributions.ts` | `calculateBaseEmployeeContributions` | `src/domain/salary/__tests__/contributions.test.ts` | Implemented |
| `INPS-002` | `src/domain/salary/contributions.ts` | `calculateAdditionalEmployeeContribution` | `src/domain/salary/__tests__/contributions.test.ts` | Implemented |
| `TAXBASE-001` | `src/domain/salary/irpef.ts` | `calculateTaxableIncome` | `src/domain/salary/__tests__/irpef.test.ts` | Implemented |
| `IRPEF-001` | `src/domain/salary/irpef.ts` | `calculateGrossIrpef` | `src/domain/salary/__tests__/irpef.test.ts` | Implemented |
| `DET-001` | `src/domain/salary/deductions.ts` | `calculateEmployeeDeductionBreakdown` | `src/domain/salary/__tests__/deductions.test.ts` | Implemented |
| `CUNEO-001` | `src/domain/salary/deductions.ts` | `calculateFiscalWedgeTaxFreeAmount` | `src/domain/salary/__tests__/deductions.test.ts` | Implemented |
| `CUNEO-002` | `src/domain/salary/deductions.ts` | `calculateFiscalWedgeTaxDeduction` | `src/domain/salary/__tests__/deductions.test.ts` | Implemented |
| `REG-LOM-001` | `src/domain/salary/surcharges.ts` | `calculateLombardyRegionalSurcharge` | `src/domain/salary/__tests__/surcharges.test.ts` | Implemented |
| `COM-MI-001` | `src/domain/salary/surcharges.ts` | `calculateMilanMunicipalSurcharge` | `src/domain/salary/__tests__/surcharges.test.ts` | Implemented |
| `OUTPUT-001` | `src/domain/salary/calculateSalary.ts` | `calculateSalary` | `src/domain/salary/__tests__/calculateSalary.test.ts` | Implemented |
| `OUTPUT-002` | `src/domain/salary/calculateSalary.ts` | `calculateSalary` | `src/domain/salary/__tests__/calculateSalary.test.ts` | Implemented |
| `OUTPUT-003` | `src/domain/salary/calculateSalary.ts` | `calculateSalary` | `src/domain/salary/__tests__/calculateSalary.test.ts` | Implemented |
| `OUTPUT-004` | `src/domain/salary/calculateSalary.ts` | `calculateSalary` | `src/domain/salary/__tests__/calculateSalary.test.ts` | Implemented |
| `OUTPUT-005` | `src/domain/salary/calculateSalary.ts` | `calculateSalary` | `src/domain/salary/__tests__/calculateSalary.test.ts` | Implemented |
| `ROUND-001` | `src/domain/salary/formatting.ts` | `roundHalfUp`, `formatCurrency`, `formatPercentage` | `src/domain/salary/__tests__/formatting.test.ts` | Implemented |
| `TIMING-001` | `src/app/page.tsx` | `Home` | No dedicated automated test in Phase 2 | Implemented as explicit shell copy only |
