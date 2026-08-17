import type { SalaryInstallments } from "@/domain/salary";

type SalaryFormProps = {
  grossAnnualSalaryInput: string;
  installments: SalaryInstallments;
  grossAnnualSalaryError?: string;
  installmentsError?: string;
  hasUnappliedChanges: boolean;
  onGrossAnnualSalaryChange: (value: string) => void;
  onInstallmentsChange: (value: SalaryInstallments) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  grossAnnualSalaryRef: React.RefObject<HTMLInputElement | null>;
  installmentsLegendRef: React.RefObject<HTMLLegendElement | null>;
};

const installmentOptions: SalaryInstallments[] = [12, 13, 14];

export function SalaryForm({
  grossAnnualSalaryInput,
  installments,
  grossAnnualSalaryError,
  installmentsError,
  hasUnappliedChanges,
  onGrossAnnualSalaryChange,
  onInstallmentsChange,
  onSubmit,
  grossAnnualSalaryRef,
  installmentsLegendRef,
}: SalaryFormProps) {
  return (
    <section
      aria-labelledby="salary-form-title"
      className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            Calcolo annualizzato
          </p>
          <h2 id="salary-form-title" className="text-2xl font-semibold text-[var(--color-ink)]">
            Inserisci l&apos;offerta da simulare
          </h2>
        </div>
        <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-ink)]">
          Nessun risultato automatico
        </span>
      </div>

      <form className="space-y-6" noValidate onSubmit={onSubmit}>
        <div className="space-y-2">
          <label
            className="text-sm font-semibold text-[var(--color-ink)]"
            htmlFor="grossAnnualSalary"
          >
            Retribuzione annua lorda
          </label>
          <div
            className={[
              "flex min-h-14 items-center gap-3 rounded-2xl border bg-white px-4 transition-colors",
              grossAnnualSalaryError
                ? "border-[var(--color-danger)]"
                : "border-[var(--color-border)] focus-within:border-[var(--color-ink)]",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-sm font-semibold text-[var(--color-ink)]"
            >
              €
            </span>
            <input
              ref={grossAnnualSalaryRef}
              aria-describedby="grossAnnualSalary-help grossAnnualSalary-example grossAnnualSalary-error"
              aria-invalid={grossAnnualSalaryError ? "true" : "false"}
              className="min-w-0 flex-1 border-0 bg-transparent text-lg font-semibold text-[var(--color-ink)] outline-none placeholder:text-[var(--color-text-muted)]"
              id="grossAnnualSalary"
              inputMode="decimal"
              name="grossAnnualSalary"
              placeholder="35.000"
              type="text"
              value={grossAnnualSalaryInput}
              onChange={(event) => onGrossAnnualSalaryChange(event.target.value)}
            />
          </div>
          <p id="grossAnnualSalary-help" className="text-sm text-[var(--color-text-muted)]">
            Intervallo supportato: da €20.000 a €100.000.
          </p>
          <p id="grossAnnualSalary-example" className="text-sm text-[var(--color-text-muted)]">
            Esempio: 35.000
          </p>
          <p
            id="grossAnnualSalary-error"
            className="min-h-5 text-sm font-medium text-[var(--color-danger)]"
          >
            {grossAnnualSalaryError ?? ""}
          </p>
        </div>

        <fieldset className="space-y-3">
          <legend
            ref={installmentsLegendRef}
            className="text-sm font-semibold text-[var(--color-ink)]"
            tabIndex={-1}
          >
            Numero di mensilità
          </legend>
          <div
            aria-describedby="installments-help installments-error"
            className="grid grid-cols-3 gap-2 rounded-[20px] bg-[var(--color-surface-muted)] p-1.5"
            role="radiogroup"
          >
            {installmentOptions.map((option) => {
              const checked = installments === option;

              return (
                <label
                  key={option}
                  className={[
                    "relative flex cursor-pointer items-center justify-center rounded-2xl px-3 py-3 text-sm font-semibold transition-all",
                    checked
                      ? "bg-[var(--color-ink)] text-white shadow-[var(--shadow-card)]"
                      : "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-ink)]",
                  ].join(" ")}
                >
                  <input
                    checked={checked}
                    className="sr-only"
                    name="installments"
                    type="radio"
                    value={option}
                    onChange={() => onInstallmentsChange(option)}
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
          <p id="installments-help" className="text-sm text-[var(--color-text-muted)]">
            Le mensilità modificano solo il netto mensile medio, non il netto annuale.
          </p>
          <p
            id="installments-error"
            className="min-h-5 text-sm font-medium text-[var(--color-danger)]"
          >
            {installmentsError ?? ""}
          </p>
        </fieldset>

        <div className="space-y-3">
          <p className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 text-sm leading-6 text-[var(--color-ink)]">
            Il risultato usa uno scenario standard: dipendente privato a Milano, anno
            completo, nessun altro reddito o agevolazione.
          </p>
          <button
            className="inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-[var(--color-ink)] px-5 py-3 text-base font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
            type="submit"
          >
            Calcola il netto
          </button>
          {hasUnappliedChanges ? (
            <p className="text-sm text-[var(--color-text-muted)]">
              Hai modificato i dati: premi di nuovo il pulsante per aggiornare la simulazione.
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}
