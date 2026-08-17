# Rule Catalog for the 2026 Model

This catalog records the rules that the prototype is expected to implement for the standard scenario defined in [ASSUMPTIONS.md](./ASSUMPTIONS.md).

Status values:

- `Included`: should be implemented as part of the standard scenario
- `Simplified`: should be implemented, but knowingly simplified versus real payroll
- `Excluded`: intentionally not implemented in this phase
- `Needs validation`: not safe to implement without explicit human confirmation

Confidence values:

- `Confirmed`: directly supported by primary or official sources
- `Interpreted`: derived from official sources plus the documented scenario assumptions
- `Assumed`: product or modeling assumption, not a directly legislated calculation rule

Verification date used throughout this catalog: `2026-08-17`.

## Rule index

| Rule ID | Title | Status | Confidence | Output affected |
| --- | --- | --- | --- | --- |
| `SCOPE-001` | Tax year | Included | Assumed | All outputs |
| `SCOPE-002` | Full-year employment | Included | Assumed | Deductions, annual net salary, average monthly net salary |
| `INPUT-001` | Gross annual salary input | Included | Assumed | All outputs |
| `INPUT-002` | Number of salary installments | Needs validation | Assumed | Average monthly net salary |
| `INPS-001` | Simplified employee contribution rate | Simplified | Assumed | Employee contributions, taxable income, all downstream outputs |
| `INPS-002` | Additional 1% employee contribution | Simplified | Interpreted | Employee contributions, taxable income, all downstream outputs |
| `TAXBASE-001` | IRPEF taxable income | Simplified | Interpreted | Taxable income, taxes, net salary |
| `IRPEF-001` | Progressive gross IRPEF | Needs validation | Confirmed | Gross IRPEF, net IRPEF, taxes, net salary |
| `DET-001` | Employee tax deduction | Included | Confirmed | Net IRPEF, taxes, net salary |
| `CUNEO-001` | Tax-free fiscal-wedge amount | Included | Confirmed | Annual net salary, average monthly net salary |
| `CUNEO-002` | Additional fiscal-wedge tax deduction | Included | Confirmed | Net IRPEF, taxes, net salary |
| `REG-LOM-001` | Lombardy regional surcharge | Included | Confirmed | Taxes, annual net salary, average monthly net salary |
| `COM-MI-001` | Milan municipal surcharge | Included | Confirmed | Taxes, annual net salary, average monthly net salary |
| `OUTPUT-001` | Total taxes | Included | Interpreted | Total taxes |
| `OUTPUT-002` | Total withholdings | Included | Interpreted | Total withholdings |
| `OUTPUT-003` | Annual net salary | Included | Interpreted | Annual net salary |
| `OUTPUT-004` | Average monthly net salary | Simplified | Assumed | Average monthly net salary |
| `OUTPUT-005` | Effective tax and withholding rates | Included | Interpreted | Effective rates |
| `ROUND-001` | Internal precision and display rounding | Simplified | Assumed | All displayed monetary outputs |
| `TIMING-001` | Annual estimate versus real payslip timing | Simplified | Interpreted | User expectations for all outputs |

## SCOPE-001 - Tax year

- Status: Included
- Confidence: Assumed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: All outputs

### Purpose

The calculator needs one rule set. This rule fixes the model to the 2026 tax year so that rates, thresholds, and examples are internally consistent.

### Inputs

- Tax year context

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Active rule year | `2026` | Product scope for this documentation phase |

### Logic

All formulas in this catalog are written for the 2026 model only.

### Formula

Use the parameter set labeled `2026` for every downstream rule.

### Boundary conditions

- Any request to estimate another year is out of scope for this catalog.
- Mixing 2025 and 2026 rule components is invalid.

### Example

If a user enters a RAL on `2026-08-17`, the calculator still uses the same annual 2026 rule set.

### Simplifications

The prototype does not support multi-year comparison or year selection in this phase.

### Source

- Institution: Product scope for this repository
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Reject or block unsupported tax years if year selection is ever introduced.
- Ensure every 2026 calculation uses one coherent parameter set.
- Ensure worked examples do not mix values from other years.

## SCOPE-002 - Full-year employment

- Status: Included
- Confidence: Assumed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Deductions, annual net salary, average monthly net salary

### Purpose

The employee tax deduction and several payroll concepts depend on time worked in the year. The first model needs a standard case, so it assumes full-year employment.

### Inputs

- Employment duration in the tax year
- Eligible working days

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Eligible days | `365` | Standard scenario only |

### Logic

The standard scenario assumes the employee is employed for the full tax year and therefore receives the full annual treatment of included rules.

### Formula

`employmentDayFactor = 365 / 365 = 1`

### Boundary conditions

- Partial-year employment is out of scope.
- Leap-year day handling is not needed because 2026 has `365` days.

### Example

An employee hired on `2026-01-01` and employed through `2026-12-31` remains in scope. An employee hired on `2026-07-01` does not.

### Simplifications

Real payroll prorates some items by employment days. The prototype does not.

### Source

- Institution: Product scope for this repository
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Confirm the standard scenario uses a full-year factor of `1`.
- Ensure partial-year inputs are either excluded or explicitly unsupported.
- Ensure the employee tax deduction is not silently prorated.

## INPUT-001 - Gross annual salary input

- Status: Included
- Confidence: Assumed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: All outputs

### Purpose

RAL is the main business input. All later calculations depend on it.

### Inputs

- Gross annual salary (RAL)

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Input variable | `ral` | Monetary amount in euro |

### Logic

The model starts from a single annual gross salary amount before employee contributions and taxes.

### Formula

`ral > 0`

### Boundary conditions

- Non-numeric values are invalid.
- Zero or negative RAL is invalid.
- The supported upper and lower validated range is still an open product decision.

### Example

`ral = EUR 30,000.00`

### Simplifications

The prototype accepts one annual amount instead of modeling multiple salary components.

### Source

- Institution: Product scope for this repository
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Invalid input test for empty, non-numeric, zero, and negative values.
- Continuity test around threshold amounts such as `EUR 15,000`, `EUR 20,000`, `EUR 28,000`, `EUR 32,000`, `EUR 40,000`, `EUR 50,000`, `EUR 56,224`.
- Range-validation tests once the product range is approved.

## INPUT-002 - Number of salary installments

- Status: Needs validation
- Confidence: Assumed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Average monthly net salary

### Purpose

Users in Italy often discuss salary over `12`, `13`, or `14` installments. The annual estimate must therefore translate into an annual-average monthly number.

### Inputs

- Number of salary installments

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Candidate installment counts | `12`, `13`, `14` | Product decision still open |

### Logic

The annual net salary is divided by the selected number of installments.

### Formula

`averageMonthlyNet = annualNet / installments`

### Boundary conditions

- `installments` must be a positive integer.
- Whether all of `12`, `13`, and `14` must be selectable is unresolved.
- Unsupported installment counts are invalid once the product set is approved.

### Example

If `annualNet = EUR 26,000` and `installments = 13`, then `averageMonthlyNet = EUR 2,000`.

### Simplifications

This rule produces an annual average only. It does not simulate each payslip.

### Source

- Institution: Product scope for this repository
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Invalid input test for zero, negative, decimal, and unsupported installment counts.
- Continuity test confirming annual net does not change when installments change.
- Monthly-average test for `12`, `13`, and `14` once the allowed set is approved.

## INPS-001 - Simplified employee contribution rate

- Status: Simplified
- Confidence: Assumed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Employee contributions, taxable income, all downstream outputs

### Purpose

Employee social-security contributions are the first major reduction from RAL. The first prototype needs a single stable rate.

### Inputs

- RAL
- Contribution base

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Simplified employee contribution rate | `9.19%` | Product assumption for the standard scenario |

### Logic

Apply a fixed `9.19%` employee contribution rate to the entire contribution base.

### Formula

`baseEmployeeContributions = contributionBase * 9.19%`

### Boundary conditions

- If `contributionBase <= 0`, the contribution result is `0`.
- The rate does not vary by sector, collective agreement, or employer classification in this prototype.

### Example

If `contributionBase = EUR 30,000`, then `baseEmployeeContributions = EUR 2,757.00`.

### Simplifications

Real employee rates differ by sector and employer classification. No single official source defines one universal private-sector employee rate for all cases, so `9.19%` is retained as a documented modeling assumption.

### Source

- Institution: INPS
- URL: https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html
- Verification date: 2026-08-17
- Note: The source confirms the 2026 pensionable threshold used by `INPS-002`, but not a universal `9.19%` employee rate. This rule therefore remains an explicit product simplification.

### Required tests

- Straight-line calculation test with a known RAL.
- Zero-base test returning `0`.
- Regression test confirming the fixed rate does not vary by any hidden sector flag.

## INPS-002 - Additional 1% employee contribution

- Status: Simplified
- Confidence: Interpreted
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Employee contributions, taxable income, all downstream outputs

### Purpose

Employees pay an additional contribution on income above the annual pensionable threshold. Ignoring it would understate deductions for higher salaries.

### Inputs

- Contribution base

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Additional rate | `1.00%` | Official additional contribution |
| 2026 annual threshold | `EUR 56,224.00` | First pensionable band for 2026 |

### Logic

Apply an extra `1%` only to the portion of the contribution base above `EUR 56,224.00`.

### Formula

`additionalEmployeeContribution = max(0, contributionBase - 56,224.00) * 1%`

### Boundary conditions

- At exactly `EUR 56,224.00`, the extra contribution is `0`.
- Above `EUR 56,224.00`, the extra contribution starts immediately on the excess portion.

### Example

If `contributionBase = EUR 60,000`, then `additionalEmployeeContribution = (60,000 - 56,224) * 1% = EUR 37.76`.

### Simplifications

The official system applies the additional contribution in payroll using periodic thresholds and then reconciles it. The prototype estimates the annual liability directly from the annual contribution base.

### Source

- Institution: INPS
- URL: https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html
- Verification date: 2026-08-17

### Required tests

- Threshold test at `EUR 56,224.00` returning `0`.
- Threshold test at `EUR 56,224.01` returning a positive value.
- Continuity test across the threshold.
- High-income regression test with a known excess amount.

## TAXBASE-001 - IRPEF taxable income

- Status: Simplified
- Confidence: Interpreted
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Taxable income, taxes, net salary

### Purpose

IRPEF is not applied directly to RAL. Mandatory employee contributions reduce the income before IRPEF is calculated.

### Inputs

- RAL
- Employee social-security contributions

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Floor | `0` | Taxable income cannot go below zero |

### Logic

In the standard scenario, the relevant taxable income is RAL minus employee contributions.

### Formula

`taxableIncome = max(0, ral - employeeContributions)`

### Boundary conditions

- If contributions equal or exceed RAL, taxable income is `0`.
- Because the scenario excludes other deductible expenses, total income is treated as equal to this taxable income.

### Example

If `ral = EUR 30,000.00` and `employeeContributions = EUR 2,757.00`, then `taxableIncome = EUR 27,243.00`.

### Simplifications

Real tax returns may adjust the base with other deductible items. The prototype does not.

### Source

- Institution: Normattiva, Presidenza del Consiglio dei Ministri
- URL: https://www.normattiva.it/atto/caricaDettaglioAtto?atto.codiceRedazionale=086U0917&atto.dataPubblicazioneGazzetta=1986-12-31&currentPage=1
- Verification date: 2026-08-17
- Note: The TUIR defines taxable employment income and deductible mandatory contributions. The project-specific formula is an interpretation of those rules under the documented single-income scenario.

### Required tests

- Standard calculation test using known contribution values.
- Floor-at-zero test.
- Continuity test showing taxable income decreases exactly by the contribution amount.

## IRPEF-001 - Progressive gross IRPEF

- Status: Needs validation
- Confidence: Confirmed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Gross IRPEF, net IRPEF, taxes, net salary

### Purpose

Gross IRPEF is the main national income-tax step in the model and drives most downstream outputs.

### Inputs

- IRPEF taxable income

### Parameters

| Income band | Rate | Notes |
| --- | --- | --- |
| Up to `EUR 28,000.00` | `23%` | First bracket |
| Above `EUR 28,000.00` and up to `EUR 50,000.00` | `35%` | Official 2026 middle bracket |
| Above `EUR 50,000.00` | `43%` | Top bracket |

### Logic

Apply IRPEF progressively. Each bracket rate applies only to the slice of income inside that band.

### Formula

`grossIrpef =`

- `min(taxableIncome, 28,000.00) * 23%`
- `+ max(0, min(taxableIncome, 50,000.00) - 28,000.00) * 35%`
- `+ max(0, taxableIncome - 50,000.00) * 43%`

### Boundary conditions

- At exactly `EUR 28,000.00`, only the first bracket applies.
- Above `EUR 28,000.00`, the second bracket starts on the excess portion.
- At exactly `EUR 50,000.00`, the third bracket does not apply.
- Negative taxable income is invalid input for this step and should be normalized upstream to `0`.

### Example

If `taxableIncome = EUR 31,783.50`, then:

- first bracket = `28,000 * 23% = EUR 6,440.00`
- second bracket = `3,783.50 * 35% = EUR 1,324.225`
- gross IRPEF = `EUR 7,764.225`

### Simplifications

No payroll-specific simplification is applied to the bracket logic itself. The validation issue is different: the task brief supplied a `33%` middle bracket, but the official 2026 legislation confirms `35%`.

### Source

- Institution: Normattiva, Presidenza del Consiglio dei Ministri
- URL: https://www.normattiva.it/eli/stato/LEGGE/2024/12/30/207/ORIGINAL
- Verification date: 2026-08-17
- Supporting institution: Agenzia delle Entrate
- Supporting URL: https://www.agenziaentrate.gov.it/portale/imposta-sul-reddito-delle-persone-fisiche-irpef-/aliquote-e-calcolo-dell-irpef
- Supporting verification date: 2026-08-17

### Required tests

- Bracket-threshold tests at `EUR 28,000.00`, `EUR 28,000.01`, `EUR 50,000.00`, `EUR 50,000.01`.
- Continuity tests across both thresholds.
- Regression test confirming the implemented middle rate is the explicitly approved one.

## DET-001 - Employee tax deduction

- Status: Included
- Confidence: Confirmed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Net IRPEF, taxes, net salary

### Purpose

Employees do not pay gross IRPEF in full. The employment-income tax deduction reduces the liability according to income.

### Inputs

- Total income
- Gross IRPEF

### Parameters

| Condition | Formula or amount | Notes |
| --- | --- | --- |
| `income <= EUR 15,000.00` | `EUR 1,955.00` | Full base deduction |
| `EUR 15,000.00 < income <= EUR 28,000.00` | `1,910 + 1,190 * ((28,000 - income) / 13,000)` | Sliding formula |
| `EUR 28,000.00 < income <= EUR 50,000.00` | `1,910 * ((50,000 - income) / 22,000)` | Sliding formula |
| `income > EUR 50,000.00` | `EUR 0.00` | No deduction |
| Additional amount | `EUR 65.00` | Applies when `EUR 25,000.00 < income <= EUR 35,000.00` |

### Logic

Calculate the base employee deduction from total income, add the extra `EUR 65.00` where applicable, then cap the result so it cannot reduce IRPEF below zero.

### Formula

`employeeTaxDeduction = min(grossIrpef, baseDeduction(totalIncome) + extra65(totalIncome))`

### Boundary conditions

- At exactly `EUR 15,000.00`, the `EUR 1,955.00` amount applies.
- Above `EUR 15,000.00`, the middle formula starts immediately.
- At exactly `EUR 28,000.00`, the second formula still applies.
- Above `EUR 28,000.00`, the third formula starts immediately.
- At exactly `EUR 25,000.00`, the extra `EUR 65.00` does not apply.
- For `EUR 25,000.00 < income <= EUR 35,000.00`, the extra `EUR 65.00` applies.
- The deduction cannot create negative IRPEF.

### Example

If `income = EUR 31,783.50`, then:

- base deduction = `1,910 * ((50,000 - 31,783.50) / 22,000) = EUR 1,581.523409...`
- additional amount = `EUR 65.00`
- total employee deduction = `EUR 1,646.523409...`

### Simplifications

The standard scenario assumes full-year employment, so no day-based proration is applied.

### Source

- Institution: Normattiva, Presidenza del Consiglio dei Ministri
- URL: https://www.normattiva.it/eli/stato/LEGGE/2024/12/30/207/ORIGINAL
- Verification date: 2026-08-17
- Supporting institution: Agenzia delle Entrate
- Supporting URL: https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni
- Supporting verification date: 2026-08-17

### Required tests

- Threshold tests at `EUR 15,000.00`, `EUR 15,000.01`, `EUR 25,000.00`, `EUR 25,000.01`, `EUR 28,000.00`, `EUR 28,000.01`, `EUR 50,000.00`.
- Zero-floor test where gross IRPEF is lower than the calculated deduction.
- Continuity tests at each formula transition.

## CUNEO-001 - Tax-free fiscal-wedge amount

- Status: Included
- Confidence: Confirmed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Annual net salary, average monthly net salary

### Purpose

For lower income bands, the fiscal-wedge measure increases take-home pay through a tax-free amount instead of an additional tax deduction.

### Inputs

- Employment income

### Parameters

| Income band | Percentage | Notes |
| --- | --- | --- |
| Up to `EUR 8,500.00` | `7.1%` | Tax-free amount |
| Above `EUR 8,500.00` and up to `EUR 15,000.00` | `5.3%` | Tax-free amount |
| Above `EUR 15,000.00` and up to `EUR 20,000.00` | `4.8%` | Tax-free amount |
| Above `EUR 20,000.00` | `0%` | No tax-free amount |

### Logic

If annual employment income is at or below `EUR 20,000.00`, compute a tax-free amount using the rate for that income band. This amount is not a tax deduction and must not be subtracted from gross IRPEF.

### Formula

`fiscalWedgeTaxFreeAmount =`

- `employmentIncome * 7.1%` if `employmentIncome <= 8,500.00`
- `employmentIncome * 5.3%` if `8,500.00 < employmentIncome <= 15,000.00`
- `employmentIncome * 4.8%` if `15,000.00 < employmentIncome <= 20,000.00`
- `0` otherwise

### Boundary conditions

- At exactly `EUR 20,000.00`, the `4.8%` rule still applies.
- Above `EUR 20,000.00`, this rule returns `0`.
- This amount must never also be treated as a tax deduction.

### Example

If `employmentIncome = EUR 18,000.00`, then `fiscalWedgeTaxFreeAmount = 18,000 * 4.8% = EUR 864.00`.

### Simplifications

The prototype uses annual income only and does not model monthly payroll exposure.

### Source

- Institution: Agenzia delle Entrate
- URL: https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni
- Verification date: 2026-08-17
- Supporting institution: Normattiva, Presidenza del Consiglio dei Ministri
- Supporting URL: https://www.normattiva.it/eli/stato/LEGGE/2024/12/30/207/ORIGINAL
- Supporting verification date: 2026-08-17

### Required tests

- Threshold tests at `EUR 8,500.00`, `EUR 8,500.01`, `EUR 15,000.00`, `EUR 15,000.01`, `EUR 20,000.00`, `EUR 20,000.01`.
- Regression test confirming the amount affects annual net salary directly, not net IRPEF.
- Continuity tests at every income transition.

## CUNEO-002 - Additional fiscal-wedge tax deduction

- Status: Included
- Confidence: Confirmed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Net IRPEF, taxes, net salary

### Purpose

For middle income bands, the fiscal-wedge measure works as an extra tax deduction instead of a tax-free amount. The model must keep the two mechanisms separate.

### Inputs

- Total income
- Gross IRPEF
- Employee tax deduction

### Parameters

| Condition | Formula or amount | Notes |
| --- | --- | --- |
| `EUR 20,000.00 < income <= EUR 32,000.00` | `EUR 1,000.00` | Fixed additional deduction |
| `EUR 32,000.00 < income < EUR 40,000.00` | `1,000 * ((40,000 - income) / 8,000)` | Linear taper |
| `income >= EUR 40,000.00` | `EUR 0.00` | No additional deduction |

### Logic

If total income is above `EUR 20,000.00`, calculate the extra fiscal-wedge tax deduction from the applicable band and subtract it from gross IRPEF after the standard employee tax deduction.

### Formula

`fiscalWedgeAdditionalDeduction =`

- `1,000.00` if `20,000.00 < income <= 32,000.00`
- `1,000.00 * ((40,000.00 - income) / 8,000.00)` if `32,000.00 < income < 40,000.00`
- `0` otherwise

### Boundary conditions

- At exactly `EUR 20,000.00`, this rule returns `0`.
- At exactly `EUR 32,000.00`, the deduction is still `EUR 1,000.00`.
- At exactly `EUR 40,000.00`, the deduction is `0`.
- Net IRPEF remains floored at `0` after all deductions.

### Example

If `income = EUR 31,783.50`, then `fiscalWedgeAdditionalDeduction = EUR 1,000.00`.

### Simplifications

The rule is annual. The documentation does not resolve the separate product decision about whether `trattamento integrativo` should also be included for lower incomes.

### Source

- Institution: Agenzia delle Entrate
- URL: https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni
- Verification date: 2026-08-17
- Supporting institution: Normattiva, Presidenza del Consiglio dei Ministri
- Supporting URL: https://www.normattiva.it/eli/stato/LEGGE/2024/12/30/207/ORIGINAL
- Supporting verification date: 2026-08-17

### Required tests

- Threshold tests at `EUR 20,000.00`, `EUR 20,000.01`, `EUR 32,000.00`, `EUR 32,000.01`, `EUR 39,999.99`, `EUR 40,000.00`.
- Taper-linearity tests inside the `32,000-40,000` range.
- Zero-floor test when deductions exceed gross IRPEF.

## REG-LOM-001 - Lombardy regional surcharge

- Status: Included
- Confidence: Confirmed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Taxes, annual net salary, average monthly net salary

### Purpose

The calculator targets tax residence in Milan, Lombardy, so it must include the Lombardy regional IRPEF surcharge.

### Inputs

- Relevant taxable income for addizionali

### Parameters

| Income band | Rate | Notes |
| --- | --- | --- |
| Up to `EUR 15,000.00` | `1.23%` | First regional band |
| Above `EUR 15,000.00` and up to `EUR 28,000.00` | `1.58%` | Second regional band |
| Above `EUR 28,000.00` and up to `EUR 50,000.00` | `1.72%` | Third regional band |
| Above `EUR 50,000.00` | `1.73%` | Fourth regional band |

### Logic

Apply the Lombardy regional surcharge progressively to the relevant taxable income. Under the standard scenario, that income is treated as equal to the calculator's IRPEF taxable income because other deductible expenses are excluded.

### Formula

`lombardyRegionalSurcharge =`

- `min(income, 15,000.00) * 1.23%`
- `+ max(0, min(income, 28,000.00) - 15,000.00) * 1.58%`
- `+ max(0, min(income, 50,000.00) - 28,000.00) * 1.72%`
- `+ max(0, income - 50,000.00) * 1.73%`

### Boundary conditions

- At exactly `EUR 15,000.00`, only the first band applies.
- At exactly `EUR 28,000.00`, the third band does not yet start.
- At exactly `EUR 50,000.00`, the fourth band does not yet start.
- The low-income edge case where net IRPEF becomes zero should still be checked during implementation against Agenzia filing instructions, even though the standard scenario and worked example are unaffected.

### Example

If `income = EUR 31,783.50`, then:

- `15,000 * 1.23% = EUR 184.50`
- `13,000 * 1.58% = EUR 205.40`
- `3,783.50 * 1.72% = EUR 65.0762`
- total regional surcharge = `EUR 454.9762`

### Simplifications

The prototype estimates the annual liability only. It does not simulate balance and advance timing in payroll.

### Source

- Institution: Regione Lombardia
- URL: https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef
- Verification date: 2026-08-17
- Supporting institution: Consiglio Regionale della Lombardia
- Supporting URL: https://normelombardia.consiglio.regione.lombardia.it/NormeLombardia/Accessibile/main.aspx?idparte=lr002003071400010ar0072a&view=showpart
- Supporting verification date: 2026-08-17

### Required tests

- Threshold tests at `EUR 15,000.00`, `EUR 15,000.01`, `EUR 28,000.00`, `EUR 28,000.01`, `EUR 50,000.00`, `EUR 50,000.01`.
- Continuity tests across all bracket boundaries.
- Regression test using the worked-example income.

## COM-MI-001 - Milan municipal surcharge

- Status: Included
- Confidence: Confirmed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Taxes, annual net salary, average monthly net salary

### Purpose

The calculator targets tax residence in Milan, so it must include the Milan municipal IRPEF surcharge.

### Inputs

- Relevant taxable income for addizionali

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Exemption threshold | `EUR 23,000.00` | No surcharge at or below this amount |
| Municipal rate | `0.8%` | Applied when the threshold is exceeded |

### Logic

If the relevant taxable income is above `EUR 23,000.00`, apply `0.8%` to the full relevant taxable income.

### Formula

`milanMunicipalSurcharge = 0` if `income <= 23,000.00`

`milanMunicipalSurcharge = income * 0.8%` if `income > 23,000.00`

### Boundary conditions

- At exactly `EUR 23,000.00`, the surcharge is `0`.
- Above `EUR 23,000.00`, the `0.8%` rate applies to the full relevant taxable income, not only to the excess above the threshold.
- As with the regional surcharge, low-income cases with zero net IRPEF should be validated carefully during implementation even though they do not affect the standard worked example.

### Example

If `income = EUR 31,783.50`, then `milanMunicipalSurcharge = 31,783.50 * 0.8% = EUR 254.268`.

### Simplifications

The prototype estimates the annual liability only. It does not simulate the actual monthly withholding profile.

### Source

- Institution: Comune di Milano
- URL: https://www.comune.milano.it/argomenti/tributi/addizionale-comunale-irpef
- Verification date: 2026-08-17

### Required tests

- Threshold tests at `EUR 23,000.00` and `EUR 23,000.01`.
- Regression test confirming the rate applies to the full income once the threshold is exceeded.
- Continuity test showing the discontinuity created by the exemption threshold is handled intentionally.

## OUTPUT-001 - Total taxes

- Status: Included
- Confidence: Interpreted
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Total taxes

### Purpose

Users need one visible amount for annual taxes separate from employee contributions.

### Inputs

- Net IRPEF
- Lombardy regional surcharge
- Milan municipal surcharge

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Included components | `netIrpef`, `regionalSurcharge`, `municipalSurcharge` | Contributions excluded |

### Logic

Total taxes are the sum of the employee's final IRPEF liability and the two local surcharges.

### Formula

`totalTaxes = netIrpef + lombardyRegionalSurcharge + milanMunicipalSurcharge`

### Boundary conditions

- Total taxes cannot be negative.
- Employee social-security contributions are not part of this output.

### Example

If `netIrpef = EUR 3,221.595384615385`, `regional = EUR 377.9394`, and `municipal = EUR 217.944`, then `totalTaxes = EUR 3,817.478784615385`.

### Simplifications

This is a product output definition rather than a separate legislated tax rule.

### Source

- Institution: Derived from included rules in this catalog
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Sum-of-components test.
- Zero-floor test.
- Regression test using the worked example.

## OUTPUT-002 - Total withholdings

- Status: Included
- Confidence: Interpreted
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Total withholdings

### Purpose

Users often want to know how much of the gross amount is withheld before they receive the estimated net salary.

### Inputs

- Employee social-security contributions
- Total taxes

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Included components | `employeeContributions`, `totalTaxes` | Tax-free fiscal-wedge amount is not a withholding |

### Logic

Total withholdings are the sum of employee contributions and total taxes.

### Formula

`totalWithholdings = employeeContributions + totalTaxes`

### Boundary conditions

- Total withholdings cannot be negative.
- The tax-free fiscal-wedge amount must not be subtracted again here because it is not a withheld amount.

### Example

If `employeeContributions = EUR 2,757.00` and `totalTaxes = EUR 3,817.478784615385`, then `totalWithholdings = EUR 6,574.478784615385`.

### Simplifications

This is a product output definition. It summarizes annual effects rather than payroll timing.

### Source

- Institution: Derived from included rules in this catalog
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Sum-of-components test.
- Regression test using the worked example.
- Test confirming the tax-free fiscal-wedge amount does not reduce this output directly.

## OUTPUT-003 - Annual net salary

- Status: Included
- Confidence: Interpreted
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Annual net salary

### Purpose

Annual net salary is the primary business outcome of the calculator.

### Inputs

- RAL
- Employee social-security contributions
- Net IRPEF
- Lombardy regional surcharge
- Milan municipal surcharge
- Fiscal-wedge tax-free amount

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Included additions | `fiscalWedgeTaxFreeAmount` | Added only when applicable |

### Logic

Start from RAL, subtract employee contributions and taxes, then add any tax-free fiscal-wedge amount.

### Formula

`annualNet = ral - employeeContributions - netIrpef - lombardyRegionalSurcharge - milanMunicipalSurcharge + fiscalWedgeTaxFreeAmount`

### Boundary conditions

- The fiscal-wedge additional tax deduction from `CUNEO-002` must not be added again here because it is already reflected in `netIrpef`.
- Annual net salary cannot exceed RAL under the documented rule set.

### Example

If `ral = EUR 30,000.00`, `employeeContributions = EUR 2,757.00`, `netIrpef = EUR 3,221.595384615385`, `regional = EUR 377.9394`, `municipal = EUR 217.944`, and `fiscalWedgeTaxFreeAmount = EUR 0`, then `annualNet = EUR 23,425.521215384615`.

### Simplifications

This is an annual estimator output. It is not a payslip-by-payslip payroll result.

### Source

- Institution: Derived from included rules in this catalog
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Worked-example regression test.
- Test confirming `CUNEO-002` is not double-counted.
- Test confirming `CUNEO-001` increases annual net only when applicable.

## OUTPUT-004 - Average monthly net salary

- Status: Simplified
- Confidence: Assumed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Average monthly net salary

### Purpose

Users regularly discuss salary in monthly terms even when the underlying model is annual.

### Inputs

- Annual net salary
- Number of salary installments

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Division rule | `annualNet / installments` | Annual average only |

### Logic

Divide annual net salary by the selected number of installments to obtain an annual-average monthly figure.

### Formula

`averageMonthlyNet = annualNet / installments`

### Boundary conditions

- `installments` must be valid under `INPUT-002`.
- This result is not the expected value of every individual payslip.

### Example

If `annualNet = EUR 23,425.521215384615` and `installments = 13`, then `averageMonthlyNet = EUR 1,801.963170...`

### Simplifications

Real monthly take-home pay can vary because of holiday payments, addizionali timing, bonuses, and payroll adjustments. The prototype ignores all of that.

### Source

- Institution: Product output definition
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Division test with `12`, `13`, and `14` once supported options are approved.
- Regression test using the worked example.
- Test confirming the monthly output changes only with `annualNet` or `installments`.

## OUTPUT-005 - Effective tax and withholding rates

- Status: Included
- Confidence: Interpreted
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: Effective rates

### Purpose

Users often understand percentages faster than raw euro amounts. Effective rates summarize the impact of the calculation.

### Inputs

- Total taxes
- Total withholdings
- RAL

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Effective tax rate denominator | `ral` | Uses gross annual salary |
| Effective withholding rate denominator | `ral` | Uses gross annual salary |

### Logic

Express total taxes and total withholdings as percentages of RAL.

### Formula

`effectiveTaxRate = totalTaxes / ral`

`effectiveWithholdingRate = totalWithholdings / ral`

### Boundary conditions

- `ral` must be greater than zero.
- Rates cannot be computed for invalid or zero RAL.

### Example

If `totalTaxes = EUR 3,817.478784615385`, `totalWithholdings = EUR 6,574.478784615385`, and `ral = EUR 30,000.00`, then:

- `effectiveTaxRate = 12.7249%`
- `effectiveWithholdingRate = 21.9150%`

### Simplifications

These are product metrics derived from annual outputs, not separate statutory rates.

### Source

- Institution: Derived from included rules in this catalog
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Percentage calculation test.
- Zero-denominator invalid-input test.
- Regression test using the worked example.

## ROUND-001 - Internal precision and display rounding

- Status: Simplified
- Confidence: Assumed
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: All displayed monetary outputs

### Purpose

Rounding policy affects user trust, implementation consistency, and regression tests.

### Inputs

- Any monetary intermediate value

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Internal calculation precision | Full available precision | Do not round intermediate rules for business logic |
| Display precision | `EUR` to two decimals | Round to cents for presentation |

### Logic

Keep internal precision across the full annual calculation and round only for displayed outputs.

### Formula

`displayAmount = roundHalfUp(amount, 2 decimal places)`

### Boundary conditions

- Exact half-cent cases must use one deterministic rounding method across the application.
- Floating-point artifacts must not change displayed rule outputs.

### Example

- `EUR 454.9762` displays as `EUR 454.98`
- `EUR 1,324.225` displays as `EUR 1,324.23`

### Simplifications

This is a product rounding policy, not a statutory tax rule.

### Source

- Institution: Product scope for this repository
- URL: Not applicable
- Verification date: 2026-08-17

### Required tests

- Rounding test for standard values.
- Half-cent rounding test.
- Regression tests ensuring displayed figures remain stable across implementations.

## TIMING-001 - Annual estimate versus real payslip timing

- Status: Simplified
- Confidence: Interpreted
- Tax year: 2026
- Last verified: 2026-08-17
- Affected output: User expectations for all outputs

### Purpose

Without an explicit timing rule, users may mistake the annual average for an exact payroll forecast.

### Inputs

- Annual outputs
- Selected installments

### Parameters

| Parameter | Value | Notes |
| --- | --- | --- |
| Timing model | Annual estimate | No monthly withholding simulation |

### Logic

The calculator produces an annual estimate and then converts it into an annual-average monthly figure. It does not simulate how withholdings are distributed across the year.

### Formula

No additional numeric formula. This rule constrains interpretation of the output.

### Boundary conditions

- The average monthly net salary must not be described as the guaranteed amount of every payslip.
- Local surcharges, payroll adjustments, and holiday installments can make real monthly amounts differ materially.

### Example

An employee with `13` installments may receive a thirteenth salary and locally timed withholdings that make some payslips higher or lower than the annual average shown by the prototype.

### Simplifications

This rule deliberately avoids payroll-period simulation, addizionali schedules, and `conguaglio`.

### Source

- Institution: Agenzia delle Entrate
- URL: https://www.agenziaentrate.gov.it/portale/documents/d/guest/730_-istruzioni_2026
- Verification date: 2026-08-17
- Supporting institution: Regione Lombardia and Comune di Milano
- Supporting URL: https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef
- Supporting verification date: 2026-08-17

### Required tests

- Content test confirming the UI labels the monthly result as an annual average.
- Regression test confirming no hidden monthly simulation logic changes annual outputs.
- Documentation test ensuring excluded timing details stay excluded.
