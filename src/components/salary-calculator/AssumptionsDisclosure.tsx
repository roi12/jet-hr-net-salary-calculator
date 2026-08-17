"use client";

import { useId, useState } from "react";

const includedItems = [
  "Anno fiscale 2026",
  "Tempo indeterminato",
  "Anno lavorativo completo",
  "Residenza fiscale a Milano, Lombardia",
  "Settore privato",
  "Nessun altro reddito o agevolazione",
];

const excludedItems = [
  "Cedolino mensile reale e tempistiche delle addizionali",
  "Classificazione del datore di lavoro e variazioni contrattuali",
  "Bonus, welfare, fringe benefit o fondi pensione",
  "Familiari a carico, altre detrazioni o spese deducibili",
  "Più datori di lavoro o altri redditi",
];

export function AssumptionsDisclosure() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      aria-labelledby="assumptions-title"
      className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            Ambito della simulazione
          </p>
          <h3 id="assumptions-title" className="text-2xl font-semibold text-[var(--color-ink)]">
            Assunzioni della simulazione
          </h3>
        </div>
        <button
          aria-controls={panelId}
          aria-expanded={open}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          type="button"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Nascondi dettagli" : "Mostra dettagli"}
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
        Questa simulazione è una stima annualizzata e non sostituisce un cedolino, un calcolo
        payroll o la consulenza di un professionista.
      </p>

      {open ? (
        <div id={panelId} className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[20px] border border-[var(--color-border)] bg-white p-5">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
              Scenario incluso
            </h4>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-ink)]">
              {includedItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[20px] border border-[var(--color-border)] bg-white p-5">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
              Casi esclusi o semplificati
            </h4>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-ink)]">
              {excludedItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-ink)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      ) : null}

      <div className="mt-6 rounded-[20px] border border-[rgba(255,107,107,0.35)] bg-[rgba(255,107,107,0.08)] p-4 text-sm leading-6 text-[var(--color-ink)]">
        In busta paga reale possono incidere il timing delle addizionali locali, i conguagli
        payroll, la classificazione del datore di lavoro, il contratto applicato e la situazione
        fiscale personale del dipendente.
      </div>
    </section>
  );
}
