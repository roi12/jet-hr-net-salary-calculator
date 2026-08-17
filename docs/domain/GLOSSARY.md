# Domain Glossary

This glossary uses plain English while retaining the Italian fiscal term the first time it appears.

## Core distinctions

The calculator must keep these four amounts separate:

| Concept | Plain meaning | Why it matters |
| --- | --- | --- |
| Gross annual salary (Retribuzione Annua Lorda, RAL) | The contractual annual gross salary offered to the employee | It is the primary user input |
| Contribution base | The amount on which employee social-security contributions are calculated | It determines employee contributions before tax |
| IRPEF taxable income | The income used to calculate personal income tax after mandatory employee contributions | It drives IRPEF, most thresholds, and local surcharges in the standard scenario |
| Annual net salary | What remains after contributions and taxes, plus any tax-free fiscal-wedge amount | It is the main output users care about |

## Terms

| Term | Meaning | Why it matters to the calculator |
| --- | --- | --- |
| Gross annual salary (Retribuzione Annua Lorda, RAL) | The employee's contractual annual gross pay before employee contributions and taxes | Starting point of the calculation |
| Gross salary | A generic gross amount before deductions; in this project the main gross amount is annual RAL | Prevents confusion between annual RAL and any monthly gross figure |
| Employee social-security contributions | Mandatory contributions withheld from the employee's pay and paid to social-security schemes such as INPS | First major reduction from RAL |
| INPS contribution rate | The percentage used to estimate employee contributions due to INPS-related social-security coverage | Key parameter for the contribution step |
| Social-security taxable income | The income base relevant for contribution calculations | Needed because the contribution base is not always identical to RAL in real payroll, even though this prototype assumes it is |
| IRPEF taxable income | The income used for Imposta sul Reddito delle Persone Fisiche (IRPEF) after mandatory employee contributions and applicable deductions from income | Drives gross IRPEF, income-based deductions, and local surcharge estimates |
| Total income (reddito complessivo) | The taxpayer's total taxable income used in several Italian tax rules | Important because some rules refer to total income, not directly to RAL |
| Progressive taxation | A tax system where higher portions of income are taxed at higher rates | Explains why the calculator applies multiple brackets, not one flat rate |
| Tax bracket (scaglione) | One income band within the progressive IRPEF schedule | Needed to break gross IRPEF into visible components |
| Marginal tax rate | The rate applied to the next euro in the current bracket | Useful for explanation and threshold behavior |
| Effective tax rate | Total tax divided by gross annual salary | Helps users understand the overall burden, not just the top bracket |
| Gross IRPEF (IRPEF lorda) | The annual IRPEF before tax deductions are applied | Intermediate output before deductions reduce the liability |
| Employee tax deduction (detrazione per lavoro dipendente) | The employment-income tax deduction that reduces gross IRPEF based on income thresholds | Main rule that reduces gross IRPEF for employees |
| Fiscal-wedge benefit (cuneo fiscale) | A set of relief measures that either reduce taxable income or increase deductions depending on income level | Must be split correctly because not every benefit works the same way |
| Net IRPEF | Gross IRPEF minus employee tax deductions and any additional fiscal-wedge deduction, floored at zero | Main national income-tax amount actually borne by the employee |
| Regional surcharge (addizionale regionale IRPEF) | Additional regional income tax based on the relevant taxable income and regional rules | Separate annual tax component after IRPEF |
| Municipal surcharge (addizionale comunale IRPEF) | Additional municipal income tax based on the relevant taxable income and municipal rules | Separate annual tax component after IRPEF |
| Annual net salary | Estimated annual take-home pay after contributions and taxes, adjusted for any fiscal-wedge tax-free amount | Main headline result |
| Average monthly net salary | Annual net salary divided by the selected number of salary installments | Secondary headline result for offer communication |
| Salary installments (mensilita) | The number of salary payments across the year, usually 12, 13, or 14 in Italian practice | Changes the annual-average monthly figure without changing annual net |
| Tax adjustment (conguaglio) | The payroll year-end reconciliation that corrects taxes and contributions already withheld during the year | Important because the prototype is annual and cannot match every monthly payslip exactly |
| Withholding agent (sostituto d'imposta) | The employer or payroll intermediary that withholds taxes on behalf of the employee | Explains why real payroll timing can differ from the annual estimate |

## Practical reading guide

When users ask “What is my net salary from this RAL?”, the model should answer the question in this order:

1. Start from RAL.
2. Remove employee contributions.
3. Tax the remaining IRPEF taxable income progressively.
4. Reduce gross IRPEF with the employee tax deduction and, where applicable, the fiscal-wedge deduction.
5. Add regional and municipal surcharges.
6. Produce annual net salary.
7. Convert the annual result into an average monthly figure using the chosen number of installments.
