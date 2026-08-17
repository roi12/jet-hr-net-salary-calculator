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
| Salary installments | `13` (default value) |
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
- `IRPEF-001` official 2026 IRPEF brackets: `23%`, `33%`, `43%`
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

`(31,783.50 - 28,000.00) * 33% = 3,783.50 * 33% = EUR 1,248.555`

Third bracket:

`EUR 0.00`

Gross IRPEF:

`6,440.00 + 1,248.555 = EUR 7,688.555`

Displayed to cents:

`EUR 7,688.56`

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

`netIrpef = 7,688.555 - 1,646.523409... - 1,000.00 = EUR 5,042.031590...`

Displayed to cents:

`EUR 5,042.03`

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

`totalTaxes = 5,042.031590... + 454.9762 + 254.268 = EUR 5,751.275790...`

Displayed to cents:

`EUR 5,751.28`

### 10. Total withholdings

`totalWithholdings = employeeContributions + totalTaxes`

`= 3,216.50 + 5,751.275790... = EUR 8,967.775790...`

Displayed to cents:

`EUR 8,967.78`

### 11. Annual net salary

`annualNet = 35,000.00 - 3,216.50 - 5,042.031590... - 454.9762 - 254.268 + 0`

`= EUR 26,032.224209...`

Displayed to cents:

`EUR 26,032.22`

### 12. Average monthly net salary over 13 installments

`averageMonthlyNet = 26,032.224209... / 13 = EUR 2,002.478785...`

Displayed to cents:

`EUR 2,002.48`

### 13. Effective rates over RAL

Effective tax rate:

`5,751.275790... / 35,000.00 = 16.4322%`

Displayed:

`16.43%`

Effective total-withholding rate:

`8,967.775790... / 35,000.00 = 25.6222%`

Displayed:

`25.62%`

## Final displayed results

| Output | Recalculated value |
| --- | --- |
| Employee contributions | `EUR 3,216.50` |
| IRPEF taxable income | `EUR 31,783.50` |
| First IRPEF bracket | `EUR 6,440.00` |
| Second IRPEF bracket | `EUR 1,248.56` |
| Gross IRPEF | `EUR 7,688.56` |
| Base employee deduction | `EUR 1,581.52` |
| Additional employee deduction | `EUR 65.00` |
| Total employee deduction | `EUR 1,646.52` |
| Fiscal-wedge tax-free amount | `EUR 0.00` |
| Fiscal-wedge tax deduction | `EUR 1,000.00` |
| Net IRPEF | `EUR 5,042.03` |
| Lombardy surcharge | `EUR 454.98` |
| Milan surcharge | `EUR 254.27` |
| Total taxes | `EUR 5,751.28` |
| Total withholdings | `EUR 8,967.78` |
| Annual net salary | `EUR 26,032.22` |
| Average monthly net over 13 installments | `EUR 2,002.48` |
| Effective tax rate over RAL | `16.43%` |
| Effective total-withholding rate over RAL | `25.62%` |

## Correction note

This worked example now uses the confirmed 2026 middle IRPEF rate of `33%` for income earned from `2026-01-01`.

The selected `13` installments affect only the displayed average monthly net salary. They do not change annual taxes or annual net salary.

Source interpretation matters:

- `730/2026` primarily concerns income earned in tax year `2025`;
- the applicable IRPEF rate for income earned in tax year `2026` comes from Law no. `199` of `2025-12-30`, Article `1`, paragraph `3`.

## Source note

Primary legal source for the 2026 middle bracket:

- Gazzetta Ufficiale, Legge 30 dicembre 2025, n. 199, Article `1`, paragraph `3`:
  `https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=25G00212&art.dataPubblicazioneGazzetta=2025-12-30&art.flagTipoArticolo=0&art.idArticolo=1&art.idGruppo=1&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=1&art.versione=1`
- Supporting official source:
  `https://www.agenziaentrate.gov.it/portale/imposta-sul-reddito-delle-persone-fisiche-irpef-/aliquote-e-calcolo-dell-irpef-cittadini`
- Verified: `2026-08-17`
