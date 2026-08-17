"use client";

import { useState } from "react";
import type { SalaryCalculation } from "@/domain/salary";
import { formatEuro, formatPercent } from "@/lib/salaryPresentation";

type ResultsSummaryProps = {
  result: SalaryCalculation;
  resultHeadingRef: React.RefObject<HTMLHeadingElement | null>;
};

type DisplayMode = "euro" | "gin-tonic";

const GIN_TONIC_PRICE_EURO = 8;

const wholeNumberFormatter = new Intl.NumberFormat("it-IT", {
  maximumFractionDigits: 0,
});

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
  const [displayMode, setDisplayMode] = useState<DisplayMode>("euro");

  function formatDisplayValue(value: number) {
    if (displayMode === "euro") {
      return formatEuro(value);
    }

    return `≈ ${wholeNumberFormatter.format(
      Math.floor(value / GIN_TONIC_PRICE_EURO),
    )} gin tonic`;
  }

  return (
    <section
      aria-labelledby="results-summary-title"
      className="results-summary-card rounded-[24px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.9)] p-6 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="results-summary-primary grid gap-5">
        <div className="min-w-0 space-y-5">
          <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
            <span className="inline-flex rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-ink)]">
              Risultato stimato
            </span>
            <fieldset className="min-w-0">
              <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                Visualizza in
              </legend>
              <div className="mt-2 inline-grid grid-cols-2 gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-1">
                <label className="min-w-0">
                  <input
                    checked={displayMode === "euro"}
                    className="peer sr-only"
                    name="display-mode"
                    type="radio"
                    value="euro"
                    onChange={() => setDisplayMode("euro")}
                  />
                  <span className="inline-flex min-h-10 min-w-[5.5rem] items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-[var(--color-text-muted)] transition-colors peer-checked:bg-[var(--color-ink)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-ink)]">
                    Euro
                  </span>
                </label>
                <label className="min-w-0">
                  <input
                    checked={displayMode === "gin-tonic"}
                    className="peer sr-only"
                    name="display-mode"
                    type="radio"
                    value="gin-tonic"
                    onChange={() => setDisplayMode("gin-tonic")}
                  />
                  <span className="inline-flex min-h-10 min-w-[5.5rem] items-center justify-center rounded-full px-3 py-2 text-sm font-semibold text-[var(--color-text-muted)] transition-colors peer-checked:bg-[var(--color-ink)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-ink)]">
                    Gin tonic 🍸
                  </span>
                </label>
              </div>
            </fieldset>
          </div>
          <div className="space-y-2">
            <h2
              ref={resultHeadingRef}
              id="results-summary-title"
              className="rounded-[8px] text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]"
              tabIndex={-1}
            >
              Netto mensile medio
            </h2>
            <p className="results-summary-amount min-w-0 font-semibold leading-none tracking-tight text-[var(--color-ink)] tabular-nums whitespace-nowrap">
              {formatDisplayValue(result.totals.averageMonthlyNetSalary)}
            </p>
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              Media annuale su {result.input.installments} mensilità
            </p>
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              Stima annualizzata, non previsione del singolo cedolino.
            </p>
            {displayMode === "gin-tonic" ? (
              <p className="text-xs leading-5 text-[var(--color-text-muted)]">
                Valore indicativo: 1 gin tonic = 8 €
              </p>
            ) : null}
          </div>
          <div className="border-t border-[rgba(17,21,10,0.08)] pt-4">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-sm font-medium text-[var(--color-text-muted)]">
                Netto annuale
              </p>
              <span aria-hidden="true" className="text-sm text-[var(--color-text-muted)]">
                —
              </span>
              <p className="min-w-0 text-lg font-semibold text-[var(--color-ink)] tabular-nums whitespace-nowrap sm:text-xl">
                {formatDisplayValue(result.totals.annualNetSalary)}
              </p>
            </div>
          </div>
        </div>

        <aside
          aria-labelledby="results-rate-panel-title"
          className="min-w-0 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4 sm:p-5"
        >
          <p
            id="results-rate-panel-title"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]"
          >
            Lettura delle incidenze
          </p>
          <dl className="results-summary-rate-grid mt-4 grid grid-cols-2 gap-4">
            {rateItems.map((item) => {
              const descriptionId = `${item.key}-description`;

              return (
                <div key={item.key} className="results-summary-rate-item flex min-w-0 flex-col gap-2">
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
