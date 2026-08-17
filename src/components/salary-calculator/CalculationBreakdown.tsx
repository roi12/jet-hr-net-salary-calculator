import type { SalaryCalculation } from "@/domain/salary";
import { formatEuro, formatPercent } from "@/lib/salaryPresentation";

type CalculationBreakdownProps = {
  result: SalaryCalculation;
};

type RowTone = "neutral" | "negative" | "positive" | "final";

type BreakdownRow = {
  label: string;
  value: number;
  tone: RowTone;
  detail?: string;
};

function getToneClasses(tone: RowTone): string {
  switch (tone) {
    case "negative":
      return "text-[var(--color-danger)]";
    case "positive":
      return "text-[var(--color-success)]";
    case "final":
      return "text-[var(--color-ink)]";
    default:
      return "text-[var(--color-ink)]";
  }
}

function getSignedValue(tone: RowTone, value: number): string {
  const formatted = formatEuro(value);

  if (tone === "negative") {
    return `−${formatted}`;
  }

  if (tone === "positive") {
    return `+${formatted}`;
  }

  return formatted;
}

function BreakdownRowItem({ label, value, tone, detail }: BreakdownRow) {
  return (
    <li className="rounded-[20px] border border-[var(--color-border)] bg-white px-4 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--color-ink)]">{label}</p>
          {detail ? <p className="text-sm text-[var(--color-text-muted)]">{detail}</p> : null}
        </div>
        <p
          className={[
            "shrink-0 text-lg font-semibold tabular-nums",
            getToneClasses(tone),
          ].join(" ")}
        >
          {getSignedValue(tone, value)}
        </p>
      </div>
    </li>
  );
}

export function CalculationBreakdown({ result }: CalculationBreakdownProps) {
  const rows: BreakdownRow[] = [
    {
      label: "RAL",
      value: result.input.grossAnnualSalary,
      tone: "neutral",
      detail: "Punto di partenza della simulazione annuale.",
    },
    {
      label: "Contributi INPS dipendente",
      value: result.contributions.totalEmployeeContributions,
      tone: "negative",
      detail:
        result.contributions.additionalEmployeeContribution > 0
          ? `Include ${formatEuro(result.contributions.additionalEmployeeContribution)} di contributo aggiuntivo dell'1% oltre la soglia 2026.`
          : "Comprendono la quota dipendente semplificata del 9,19%.",
    },
    {
      label: "Imponibile IRPEF",
      value: result.taxableIncome,
      tone: "neutral",
      detail: "Base usata per IRPEF, detrazioni e addizionali nella simulazione standard.",
    },
    {
      label: "IRPEF lorda",
      value: result.irpef.grossIrpef,
      tone: "negative",
      detail: `23% fino a €28.000 (${formatEuro(
        result.irpef.firstBracketTax,
      )}), 33% sullo scaglione intermedio (${formatEuro(
        result.irpef.secondBracketTax,
      )}), 43% oltre €50.000 (${formatEuro(result.irpef.thirdBracketTax)}).`,
    },
    {
      label: "Detrazione da lavoro dipendente",
      value: result.irpef.totalEmployeeDeduction,
      tone: "positive",
      detail: "Riduce l'IRPEF lorda: non viene sommata al netto come importo autonomo.",
    },
    ...(result.irpef.fiscalWedgeTaxDeduction > 0
      ? [
          {
            label: "Beneficio legato al cuneo fiscale",
            value: result.irpef.fiscalWedgeTaxDeduction,
            tone: "positive" as const,
            detail: "Applicato come riduzione dell'IRPEF, senza doppio conteggio sul netto.",
          },
        ]
      : []),
    {
      label: "IRPEF netta",
      value: result.irpef.netIrpef,
      tone: "negative",
      detail: "Imposta sul reddito dopo detrazione da lavoro dipendente e beneficio fiscale applicabile.",
    },
    {
      label: "Addizionale regionale Lombardia",
      value: result.localSurcharges.lombardyRegionalSurcharge,
      tone: "negative",
      detail: "Calcolata in modo progressivo sul reddito imponibile della simulazione.",
    },
    {
      label: "Addizionale comunale Milano",
      value: result.localSurcharges.milanMunicipalSurcharge,
      tone: "negative",
      detail: "A Milano la soglia di esenzione è €23.000: oltre tale limite si applica allo stesso imponibile.",
    },
    ...(result.fiscalWedgeTaxFreeAmount > 0
      ? [
          {
            label: "Quota esente del cuneo fiscale",
            value: result.fiscalWedgeTaxFreeAmount,
            tone: "positive" as const,
            detail: "È un beneficio che aumenta il netto annuale: non è una detrazione IRPEF.",
          },
        ]
      : []),
    {
      label: "Trattenute complessive",
      value: result.totals.totalWithholdings,
      tone: "negative",
      detail: "Somma di contributi dipendente e imposte annue stimate.",
    },
    {
      label: "Netto annuale",
      value: result.totals.annualNetSalary,
      tone: "final",
      detail: "Risultato annuale stimato della simulazione standard.",
    },
  ];

  return (
    <section
      aria-labelledby="calculation-breakdown-title"
      className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            Trasparenza del calcolo
          </p>
          <h3 id="calculation-breakdown-title" className="text-2xl font-semibold text-[var(--color-ink)]">
            Come si arriva al netto
          </h3>
        </div>
        <p className="max-w-xl text-sm text-[var(--color-text-muted)]">
          Le righe in rosso rappresentano trattenute o imposte. Le righe in verde mostrano
          riduzioni d&apos;imposta o benefici che alleggeriscono il prelievo fiscale.
        </p>
      </div>

      <ol className="mt-6 space-y-3">
        {rows.map((row) => (
          <BreakdownRowItem key={row.label} {...row} />
        ))}
      </ol>

      <div className="mt-6 grid gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-5 lg:grid-cols-2">
        <article className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            Aliquota fiscale effettiva
          </h4>
          <p className="text-xl font-semibold text-[var(--color-ink)]">
            {formatPercent(result.totals.effectiveTaxRate)}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            È il rapporto tra imposte annuali stimate e RAL.
          </p>
        </article>
        <article className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            Incidenza complessiva
          </h4>
          <p className="text-xl font-semibold text-[var(--color-ink)]">
            {formatPercent(result.totals.effectiveTotalWithholdingRate)}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Include imposte e contributi dipendente rapportati alla RAL.
          </p>
        </article>
      </div>
    </section>
  );
}
