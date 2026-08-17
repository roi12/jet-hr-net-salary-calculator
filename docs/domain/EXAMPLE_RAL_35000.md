# Worked Example: RAL EUR 35,000

This file documents a single worked example for the standard scenario in [ASSUMPTIONS.md](./ASSUMPTIONS.md).

It exists to:

- explain the calculation end to end;
- expose rule interactions clearly;
- provide a future regression-test fixture.

It must not be treated as the only supported input and must never be hardcoded as an application rule.

## Scenario

| Input | Value |
| --- | --- |
| Gross annual salary (RAL) | `EUR 35,000.00` |
| Salary installments | `13` |
| Tax year | `2026` |
| Residence | Milan, Lombardy |
| Employment duration | Full year |
| Other income | None |
| Dependants | None |
| Other deductible expenses | None |

## Rules applied

- `INPS-001` fixed employee contribution rate: `9.19%`
- `INPS-002` additional `1%` contribution: not triggered because the salary is below `EUR 56,224.00`
- `TAXBASE-001` taxable income = `RAL - employee contributions`
- `IRPEF-001` official 2026 IRPEF brackets: `23%`, `35%`, `43%`
- `DET-001` employee tax deduction
- `CUNEO-002` fixed `EUR 1,000.00` additional fiscal-wedge deduction because total income is above `EUR 20,000.00` and up to `EUR 32,000.00`
- `REG-LOM-001` Lombardy regional surcharge
- `COM-MI-001` Milan municipal surcharge

## Step-by-step calculation

### 1. Employee social-security contributions

`employeeContributions = 35,000.00 * 9.19% = EUR 3,216.50`

Additional `1%` contribution:

`max(0, 35,000.00 - 56,224.00) * 1% = EUR 0.00`

Total employee contributions:

`EUR 3,216.50`

### 2. IRPEF taxable income

`taxableIncome = 35,000.00 - 3,216.50 = EUR 31,783.50`

In the standard scenario, total income (reddito complessivo) is treated as equal to this taxable income because there is only employment income and no other deductible expenses.

### 3. Gross IRPEF

First bracket:

`28,000.00 * 23% = EUR 6,440.00`

Second bracket:

`(31,783.50 - 28,000.00) * 35% = 3,783.50 * 35% = EUR 1,324.225`

Third bracket:

`EUR 0.00`

Gross IRPEF:

`6,440.00 + 1,324.225 = EUR 7,764.225`

Displayed to cents:

`EUR 7,764.23`

### 4. Employee tax deduction

Base employee deduction:

`1,910 * ((50,000 - 31,783.50) / 22,000) = EUR 1,581.523409...`

Additional deduction for income above `EUR 25,000.00` and up to `EUR 35,000.00`:

`EUR 65.00`

Total employee tax deduction:

`EUR 1,646.523409...`

Displayed to cents:

`EUR 1,646.52`

### 5. Fiscal-wedge benefit

Tax-free amount:

`EUR 0.00` because income is above `EUR 20,000.00`

Additional fiscal-wedge tax deduction:

`EUR 1,000.00` because income is above `EUR 20,000.00` and up to `EUR 32,000.00`

### 6. Net IRPEF

`netIrpef = 7,764.225 - 1,646.523409... - 1,000.00 = EUR 5,117.701590...`

Displayed to cents:

`EUR 5,117.70`

### 7. Lombardy regional surcharge

First band:

`15,000.00 * 1.23% = EUR 184.50`

Second band:

`13,000.00 * 1.58% = EUR 205.40`

Third band:

`3,783.50 * 1.72% = EUR 65.0762`

Total Lombardy surcharge:

`EUR 454.9762`

Displayed to cents:

`EUR 454.98`

### 8. Milan municipal surcharge

Because income exceeds `EUR 23,000.00`, the `0.8%` rate applies to the full relevant taxable income:

`31,783.50 * 0.8% = EUR 254.268`

Displayed to cents:

`EUR 254.27`

### 9. Total taxes

`totalTaxes = 5,117.701590... + 454.9762 + 254.268 = EUR 5,826.945790...`

Displayed to cents:

`EUR 5,826.95`

### 10. Total withholdings

`totalWithholdings = employeeContributions + totalTaxes`

`= 3,216.50 + 5,826.945790... = EUR 9,043.445790...`

Displayed to cents:

`EUR 9,043.45`

### 11. Annual net salary

`annualNet = 35,000.00 - 3,216.50 - 5,117.701590... - 454.9762 - 254.268 + 0`

`= EUR 25,956.554209...`

Displayed to cents:

`EUR 25,956.55`

### 12. Average monthly net salary over 13 installments

`averageMonthlyNet = 25,956.554209... / 13 = EUR 1,996.658016...`

Displayed to cents:

`EUR 1,996.66`

### 13. Effective rates over RAL

Effective tax rate:

`5,826.945790... / 35,000.00 = 16.6484%`

Displayed:

`16.65%`

Effective total-withholding rate:

`9,043.445790... / 35,000.00 = 25.8384%`

Displayed:

`25.84%`

## Final displayed results

| Output | Recalculated value |
| --- | --- |
| Employee contributions | `EUR 3,216.50` |
| IRPEF taxable income | `EUR 31,783.50` |
| First IRPEF bracket | `EUR 6,440.00` |
| Second IRPEF bracket | `EUR 1,324.23` |
| Gross IRPEF | `EUR 7,764.23` |
| Base employee deduction | `EUR 1,581.52` |
| Additional employee deduction | `EUR 65.00` |
| Total employee deduction | `EUR 1,646.52` |
| Fiscal-wedge tax-free amount | `EUR 0.00` |
| Fiscal-wedge tax deduction | `EUR 1,000.00` |
| Net IRPEF | `EUR 5,117.70` |
| Lombardy surcharge | `EUR 454.98` |
| Milan surcharge | `EUR 254.27` |
| Total taxes | `EUR 5,826.95` |
| Total withholdings | `EUR 9,043.45` |
| Annual net salary | `EUR 25,956.55` |
| Average monthly net over 13 installments | `EUR 1,996.66` |
| Effective tax rate over RAL | `16.65%` |
| Effective total-withholding rate over RAL | `25.84%` |

## Comparison with the provisional expected results

| Metric | Provisional value | Recalculated value | Difference | Cause |
| --- | --- | --- | --- | --- |
| Second IRPEF bracket | `EUR 1,248.56` | `EUR 1,324.23` | `+EUR 75.67` | Official 2026 middle bracket is `35%`, not `33%` |
| Gross IRPEF | `EUR 7,688.56` | `EUR 7,764.23` | `+EUR 75.67` | Same `IRPEF-001` issue |
| Net IRPEF | `EUR 5,042.03` | `EUR 5,117.70` | `+EUR 75.67` | Same `IRPEF-001` issue |
| Total taxes | `EUR 5,751.28` | `EUR 5,826.95` | `+EUR 75.67` | Same `IRPEF-001` issue |
| Total withholdings | `EUR 8,967.78` | `EUR 9,043.45` | `+EUR 75.67` | Same `IRPEF-001` issue |
| Annual net salary | `EUR 26,032.22` | `EUR 25,956.55` | `-EUR 75.67` | Same `IRPEF-001` issue |
| Average monthly net | `EUR 2,002.48` | `EUR 1,996.66` | `-EUR 5.82` | Same `IRPEF-001` issue divided over `13` installments |
| Effective tax rate | `16.43%` | `16.65%` | `+0.22 pp` | Same `IRPEF-001` issue |
| Effective withholding rate | `25.62%` | `25.84%` | `+0.22 pp` | Same `IRPEF-001` issue |

## Discrepancy assessment

The worked example confirms one material inconsistency in the task brief:

- The provisional example assumes a `33%` second IRPEF bracket.
- Official 2026 legislation confirms a `35%` second IRPEF bracket.
- That single mismatch explains every numerical discrepancy in the downstream example outputs.

Because of that, [RULE_CATALOG_2026.md](./RULE_CATALOG_2026.md) marks `IRPEF-001` as `Needs validation` even though the official source itself is clear. Human validation is still needed because the documented project expectation and the official rule conflict.

## Source note

Primary source for the discrepancy:

- Normattiva, Legge 30 dicembre 2024, n. 207:
  `https://www.normattiva.it/eli/stato/LEGGE/2024/12/30/207/ORIGINAL`
- Verified: `2026-08-17`
