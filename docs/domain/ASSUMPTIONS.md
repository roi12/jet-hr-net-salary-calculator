# Assumptions for the First Calculation Model

This file separates standard-scenario assumptions from simplifications, exclusions, and unresolved product decisions.

## Included standard scenario

- Tax year `2026`
- Private-sector employee
- Permanent employment contract
- Employed for the full year
- `365` eligible working days
- Tax resident in Milan, Lombardy
- RAL is the employee's only income
- No dependants
- No special tax relief
- No pension fund contributions
- No bonuses, overtime, welfare, or fringe benefits
- No other deductible expenses

## Simplified assumptions

- Employee INPS contribution rate fixed at `9.19%`
- Contribution base assumed to be equal to RAL
- The same RAL is assumed for the entire year
- Local surcharges are estimated as annual liabilities
- Monthly net is calculated as annual net divided by the selected number of installments
- Monetary calculations retain internal precision and are rounded to cents only for presentation

## Explicitly excluded

- Employer cost
- Employer social-security contributions
- TFR
- Exact monthly payroll simulation
- Monthly timing of local surcharges
- Payroll adjustments and previous-year balances
- Multiple employers
- Multiple income sources
- Partial-year employment
- Dependants and family deductions
- Disability-related deductions
- Impatriate tax regime
- Pension funds
- Performance bonuses
- Fringe benefits
- Welfare benefits
- Tax-deductible personal expenses

## Open decisions

These points are intentionally unresolved. They should not be silently decided in code.

- Supported RAL input range
- Whether `12`, `13`, and `14` installments should all be selectable
- Whether the `trattamento integrativo` for lower incomes should be implemented
- Whether contribution rates other than `9.19%` should ever be selectable
- Behaviour for inputs outside the validated range

## Why these assumptions exist

The goal of the first version is not to reproduce every payslip detail. It is to produce a transparent annual estimate for a common and easy-to-explain scenario.

That means the documentation deliberately prefers:

- explicit scope boundaries over false precision;
- legislated annual rules over monthly payroll heuristics;
- one documented standard case over a partially supported matrix of special cases.
