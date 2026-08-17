import type { SalaryCalculation } from "@/domain/salary";
import { formatEuro, formatPercent } from "@/lib/salaryPresentation";

type ResultsSummaryProps = {
  result: SalaryCalculation;
  resultHeadingRef: React.RefObject<HTMLHeadingElement | null>;
};

const rateItems = [
  {
    key: "effectiveTaxRate",
    label: "Aliquota fiscale effettiva",
    getValue: (result: SalaryCalculation) => formatPercent(result.totals.effectiveTaxRate),
    description: "Imposte / RAL",
  },
  {
    key: "effectiveTotalWithholdingRate",
    label: "Incidenza complessiva",
    getValue: (result: SalaryCalculation) =>
      formatPercent(result.totals.effectiveTotalWithholdingRate),
    description: "Imposte + contributi / RAL",
  },
];

const breakdownItems = [
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
];

export function ResultsSummary({ result, resultHeadingRef }: ResultsSummaryProps) {
  return (
    <section
      aria-labelledby="results-summary-title"
      className="rounded-[24px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.9)] p-6 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.95fr)] lg:items-start">
        <div className="space-y-5">
          <span className="inline-flex rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-ink)]">
            Risultato stimato
          </span>
          <div className="space-y-2">
            <h2
              ref={resultHeadingRef}
              id="results-summary-title"
              className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]"
              tabIndex={-1}
            >
              Netto mensile medio
            </h2>
            <p className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-tight text-[var(--color-ink)] tabular-nums whitespace-nowrap">
              {formatEuro(result.totals.averageMonthlyNetSalary)}
            </p>
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              Media annuale su {result.input.installments} mensilità
            </p>
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Stima annualizzata, non previsione del singolo cedolino.
            </p>
          </div>
          <div className="border-t border-[rgba(17,21,10,0.08)] pt-4">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                Netto annuale
              </p>
              <span aria-hidden="true" className="text-sm text-[var(--color-text-muted)]">
                —
              </span>
              <p className="text-lg font-semibold text-[var(--color-ink)] tabular-nums whitespace-nowrap sm:text-xl">
                {formatEuro(result.totals.annualNetSalary)}
              </p>
            </div>
          </div>
        </div>

        <aside
          aria-labelledby="results-rate-panel-title"
          className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 sm:p-5"
        >
          <p
            id="results-rate-panel-title"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]"
          >
            Lettura delle incidenze
          </p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {rateItems.map((item, index) => {
              const descriptionId = `${item.key}-description`;

              return (
                <div
                  key={item.key}
                  className={[
                    "flex min-w-0 flex-col gap-2",
                    index > 0 ? "sm:border-l sm:border-[rgba(17,21,10,0.08)] sm:pl-4" : "",
                  ].join(" ")}
                >
                  <dt className="text-sm font-semibold text-[var(--color-ink)]">{item.label}</dt>
                  <dd
                    aria-describedby={descriptionId}
                    className="text-2xl font-semibold leading-none text-[var(--color-ink)] tabular-nums whitespace-nowrap"
                  >
                    {item.getValue(result)}
                  </dd>
                  <p id={descriptionId} className="text-xs leading-5 text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </dl>
        </aside>
      </div>

      <dl className="mt-6 overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] md:grid md:grid-cols-3">
        {breakdownItems.map((item, index) => (
          <div
            key={item.key}
            className={[
              "p-4 sm:p-5",
              index > 0 ? "border-t border-[var(--color-border)] md:border-l md:border-t-0" : "",
            ].join(" ")}
          >
            <dt className="text-sm font-medium text-[var(--color-text-muted)]">{item.label}</dt>
            <dd className="mt-2 text-2xl font-semibold text-[var(--color-ink)] tabular-nums whitespace-nowrap">
              {item.getValue(result)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
