import type { SalaryCalculation } from "@/domain/salary";
import { formatEuro, formatPercent } from "@/lib/salaryPresentation";

type ResultsSummaryProps = {
  result: SalaryCalculation;
  resultHeadingRef: React.RefObject<HTMLHeadingElement | null>;
};

const secondaryItems = [
  {
    key: "annualNetSalary",
    label: "Netto annuale",
    getValue: (result: SalaryCalculation) => formatEuro(result.totals.annualNetSalary),
  },
  {
    key: "totalTaxes",
    label: "Imposte annuali",
    getValue: (result: SalaryCalculation) => formatEuro(result.totals.totalTaxes),
  },
  {
    key: "contributions",
    label: "Contributi INPS",
    getValue: (result: SalaryCalculation) =>
      formatEuro(result.contributions.totalEmployeeContributions),
  },
  {
    key: "totalWithholdings",
    label: "Trattenute complessive",
    getValue: (result: SalaryCalculation) => formatEuro(result.totals.totalWithholdings),
  },
  {
    key: "effectiveTotalWithholdingRate",
    label: "Incidenza complessiva",
    getValue: (result: SalaryCalculation) =>
      formatPercent(result.totals.effectiveTotalWithholdingRate),
  },
];

export function ResultsSummary({ result, resultHeadingRef }: ResultsSummaryProps) {
  return (
    <section
      aria-labelledby="results-summary-title"
      className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-ink)]">
            Risultato stimato
          </span>
          <div className="space-y-1">
            <h2
              ref={resultHeadingRef}
              id="results-summary-title"
              className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]"
              tabIndex={-1}
            >
              Netto mensile medio
            </h2>
            <p className="text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              {formatEuro(result.totals.averageMonthlyNetSalary)}
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Media annuale su {result.input.installments} mensilità
            </p>
          </div>
        </div>
        <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            Aliquota fiscale effettiva
          </p>
          <p className="mt-1 text-xl font-semibold text-[var(--color-ink)]">
            {formatPercent(result.totals.effectiveTaxRate)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {secondaryItems.map((item) => (
          <article
            key={item.key}
            className="rounded-[20px] border border-[var(--color-border)] bg-white p-4"
          >
            <p className="text-sm text-[var(--color-text-muted)]">{item.label}</p>
            <p className="mt-2 text-xl font-semibold text-[var(--color-ink)]">
              {item.getValue(result)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
