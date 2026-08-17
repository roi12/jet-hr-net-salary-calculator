# Italian 2026 Gross-to-Net Domain Documentation

This folder defines the domain rules for an unofficial prototype created for the Jet HR Product Builder technical task.

The prototype estimates an employee's annual and average monthly net salary from a Gross annual salary (Retribuzione Annua Lorda, RAL) and explains the main deductions and tax benefits that move the result from gross to net.

It is a product and engineering reference. It is not legal, tax, payroll, or accounting advice.

## Product objective

Build a transparent annual gross-to-net estimator for a standard Italian employee scenario so that non-specialist users can:

- translate a RAL into an estimated annual net salary;
- translate that annual estimate into an average monthly net salary;
- inspect the main deductions, taxes, and benefits behind the result;
- understand what the prototype includes, simplifies, and excludes.

## Personas

### Primary persona

An HR manager, recruiter, or founder at an Italian startup or SME who is preparing or explaining a job offer but is not a payroll specialist.

### Secondary persona

A candidate or employee who mainly wants to understand the estimated annual and monthly net salary.

## Main use cases

- Estimate the annual net salary associated with a proposed RAL.
- Explain how employee social-security contributions, IRPEF, and local surcharges affect take-home pay.
- Compare offer scenarios at a high level before a payroll office or consultant produces the official payslip simulation.
- Produce a documented example that can later become a regression-test fixture.

## User story

“As an HR manager, recruiter or founder, I want to estimate the net salary associated with a RAL and understand every major deduction so that I can prepare and explain a compensation offer transparently.”

## Domain scope

This documentation covers a standard annual estimate for a private-sector employee in Milan, Lombardy, under the assumptions listed in [ASSUMPTIONS.md](./ASSUMPTIONS.md).

In scope:

- Gross annual salary (Retribuzione Annua Lorda, RAL)
- Employee social-security contributions
- IRPEF taxable income
- Gross IRPEF (IRPEF lorda)
- Employee tax deduction (detrazione per lavoro dipendente)
- Fiscal-wedge benefit (cuneo fiscale), split into:
  - tax-free amount for lower incomes;
  - additional tax deduction for higher bands
- Lombardy regional surcharge (addizionale regionale IRPEF)
- Milan municipal surcharge (addizionale comunale IRPEF)
- Annual net salary
- Average monthly net salary as an annual average
- Validated RAL input range from `EUR 20,000.00` to `EUR 100,000.00`, inclusive
- Salary installments selectable as `12`, `13`, or `14`, with `13` as the default

Out of scope:

- Employer cost
- Employer contributions
- TFR
- Exact month-by-month payroll simulation
- Non-standard tax regimes
- Dependants and personal deductions
- Other income sources
- Ordinary `trattamento integrativo`
- Alternative employee contribution rates such as `9.49%`

See [ASSUMPTIONS.md](./ASSUMPTIONS.md) for the complete scope boundary.

## Calculation sequence

The domain model follows this annual sequence:

1. Gross annual salary
2. Employee social-security contributions
3. IRPEF taxable income
4. Gross IRPEF
5. Employee tax deduction
6. Fiscal-wedge benefit
7. Net IRPEF
8. Lombardy regional surcharge
9. Milan municipal surcharge
10. Annual net salary
11. Average monthly net salary

This order matters because later steps depend on earlier ones. In particular:

- IRPEF uses taxable income after employee contributions.
- The employee tax deduction and fiscal-wedge rules use income-based thresholds.
- The fiscal-wedge tax-free amount is not the same thing as a tax deduction.
- The monthly figure is an annual average, not a promise about each payslip.
- Changing salary installments changes only the displayed average monthly net salary, not annual taxes or annual net salary.

## Documentation map

| File | Purpose |
| --- | --- |
| [README.md](./README.md) | Product framing, scope, source hierarchy, and how rules connect to implementation and tests |
| [GLOSSARY.md](./GLOSSARY.md) | Shared terminology for product, design, and engineering discussions |
| [ASSUMPTIONS.md](./ASSUMPTIONS.md) | Included scenario, simplifications, exclusions, and approved scope decisions |
| [RULE_CATALOG_2026.md](./RULE_CATALOG_2026.md) | Source-backed rule inventory for the 2026 calculation model |
| [EXAMPLE_RAL_35000.md](./EXAMPLE_RAL_35000.md) | Worked example and future regression-test fixture |

## Source hierarchy

When sources disagree, the project uses this hierarchy:

1. Italian legislation and official regulations
2. Agenzia delle Entrate
3. INPS
4. Regione Lombardia and Comune di Milano
5. Secondary calculators only for comparison and sanity checking

Secondary calculators must never be treated as the source of truth.

## Source interpretation note

This project distinguishes between:

- declaration or model year, such as `730/2026`;
- income tax year, meaning the year in which the income was earned.

That distinction matters for IRPEF rates. The `730/2026` instructions primarily concern income earned during tax year `2025`. They may still help explain structural rules that remain in force, but they are not the authority for the IRPEF rates applicable to income earned from `2026-01-01`.

For income earned in tax year `2026`, the authoritative source for the middle IRPEF bracket is Law no. `199` of `2025-12-30`, Article `1`, paragraph `3`, which amended Article `11`, paragraph `1`, letter `b)` of the TUIR by replacing `35 per cento` with `33 per cento`.

## Relationship between rules, implementation, and automated tests

- The rule catalog is the domain contract. Application code should implement the formulas and boundaries documented in [RULE_CATALOG_2026.md](./RULE_CATALOG_2026.md), not ad hoc logic.
- The assumptions file defines what the first implementation is allowed to ignore. If a feature is excluded or intentionally outside scope, code should not silently implement it.
- The worked example in [EXAMPLE_RAL_35000.md](./EXAMPLE_RAL_35000.md) should become a regression-test fixture after the implementation phase starts.
- Each catalog rule lists required threshold, invalid-input, and continuity tests so that automated tests can be derived directly from the documentation.

## Product validation scope

The prototype validates gross annual salary inputs only within the inclusive range from `EUR 20,000.00` to `EUR 100,000.00`.

If the user enters an unsupported value:

- keep the entered value visible;
- show a clear inline validation message;
- do not calculate or display salary results;
- explain that the current prototype supports RAL values from `EUR 20,000.00` to `EUR 100,000.00`.

Suggested message:

“This prototype currently supports gross annual salaries between EUR 20,000 and EUR 100,000.”

## Current validation note

The official 2026 IRPEF legislation confirms a `33%` middle bracket between `EUR 28,000` and `EUR 50,000` for income earned from `2026-01-01`.

The documentation therefore treats `IRPEF-001` as confirmed and included for the 2026 model.
