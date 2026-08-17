"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  calculateSalary,
  type SalaryCalculation,
  type SalaryInstallments,
  validateSalaryInput,
} from "@/domain/salary";
import { DEFAULT_SALARY_INSTALLMENTS } from "@/config/salaryCalculator";
import {
  formatEuro,
  getFirstFieldError,
  parseGrossAnnualSalaryInput,
} from "@/lib/salaryPresentation";
import { AssumptionsDisclosure } from "./AssumptionsDisclosure";
import { SalaryForm } from "./SalaryForm";
import { SalaryResults } from "./SalaryResults";
import { SourcesSection } from "./SourcesSection";

const scenarioLabels = [
  "Anno fiscale 2026",
  "Tempo indeterminato",
  "Anno lavorativo completo",
  "Residenza a Milano",
  "Settore privato",
  "Nessun altro reddito o agevolazione",
];

const brandLogoPath = "/brand/JetHR%20Logo%20Dark.svg";

export function SalaryCalculator() {
  const [grossAnnualSalaryInput, setGrossAnnualSalaryInput] = useState("35.000");
  const [installments, setInstallments] = useState<SalaryInstallments>(
    DEFAULT_SALARY_INSTALLMENTS,
  );
  const [result, setResult] = useState<SalaryCalculation | null>(null);
  const [grossAnnualSalaryError, setGrossAnnualSalaryError] = useState<string>();
  const [installmentsError, setInstallmentsError] = useState<string>();
  const [hasUnappliedChanges, setHasUnappliedChanges] = useState(false);
  const [liveMessage, setLiveMessage] = useState("");

  const grossAnnualSalaryRef = useRef<HTMLInputElement>(null);
  const installmentsLegendRef = useRef<HTMLLegendElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  function markPendingChanges() {
    if (result) {
      setHasUnappliedChanges(true);
    }
  }

  function handleGrossAnnualSalaryChange(value: string) {
    setGrossAnnualSalaryInput(value);
    setGrossAnnualSalaryError(undefined);
    markPendingChanges();
  }

  function handleInstallmentsChange(value: SalaryInstallments) {
    setInstallments(value);
    setInstallmentsError(undefined);
    markPendingChanges();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedGrossAnnualSalary = parseGrossAnnualSalaryInput(grossAnnualSalaryInput);
    const validationResult = validateSalaryInput({
      grossAnnualSalary: parsedGrossAnnualSalary,
      installments,
    });

    if (!validationResult.valid) {
      const nextGrossAnnualSalaryError = getFirstFieldError(
        validationResult.errors,
        "grossAnnualSalary",
      );
      const nextInstallmentsError = getFirstFieldError(
        validationResult.errors,
        "installments",
      );

      setGrossAnnualSalaryError(nextGrossAnnualSalaryError);
      setInstallmentsError(nextInstallmentsError);
      setResult(null);
      setHasUnappliedChanges(false);
      setLiveMessage("Controlla i campi evidenziati e riprova.");

      if (nextGrossAnnualSalaryError) {
        grossAnnualSalaryRef.current?.focus();
      } else if (nextInstallmentsError) {
        installmentsLegendRef.current?.focus();
      }

      return;
    }

    const nextResult = calculateSalary({
      grossAnnualSalary: parsedGrossAnnualSalary!,
      installments,
    });

    setResult(nextResult);
    setGrossAnnualSalaryError(undefined);
    setInstallmentsError(undefined);
    setHasUnappliedChanges(false);
    setLiveMessage(
      `Netto mensile medio ${formatEuro(
        nextResult.totals.averageMonthlyNetSalary,
      )} su ${installments} mensilità. Netto annuale ${formatEuro(
        nextResult.totals.annualNetSalary,
      )}.`,
    );
  }

  useEffect(() => {
    if (!result || !resultHeadingRef.current) {
      return;
    }

    resultHeadingRef.current.focus();

    if (window.matchMedia("(max-width: 767px)").matches) {
      resultHeadingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col px-4 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-8 lg:px-8">
      <div aria-live="polite" className="sr-only">
        {liveMessage}
      </div>

      <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-[rgba(255,255,255,0.58)] bg-[rgba(255,255,255,0.72)] px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur sm:px-5">
        <div className="flex items-center gap-4">
          <Image alt="Jet HR" height={34} priority src={brandLogoPath} width={124} />
          <span className="hidden rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] sm:inline-flex">
            Prototipo Product Builder
          </span>
        </div>
        <p className="max-w-xl text-right text-sm text-[var(--color-text-muted)]">
          Simulazione non ufficiale per spiegare un&apos;offerta lorda in modo chiaro e annualizzato.
        </p>
      </header>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
        <div className="space-y-6">
          <section className="rounded-[32px] border border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[var(--shadow-soft)] backdrop-blur sm:p-8">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink)]">
                Simulatore 2026
              </span>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
                Dalla RAL al netto, con ogni passaggio in chiaro.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">
                Simula il netto annuale e mensile di un&apos;offerta e scopri come contributi,
                imposte e detrazioni incidono sulla retribuzione.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {scenarioLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-ink)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] xl:grid-cols-1">
            <AssumptionsDisclosure />
            <SourcesSection />
          </div>
        </div>

        <div className="space-y-6 xl:sticky xl:top-6">
          <SalaryForm
            grossAnnualSalaryError={grossAnnualSalaryError}
            grossAnnualSalaryInput={grossAnnualSalaryInput}
            grossAnnualSalaryRef={grossAnnualSalaryRef}
            hasUnappliedChanges={hasUnappliedChanges}
            installments={installments}
            installmentsError={installmentsError}
            installmentsLegendRef={installmentsLegendRef}
            onGrossAnnualSalaryChange={handleGrossAnnualSalaryChange}
            onInstallmentsChange={handleInstallmentsChange}
            onSubmit={handleSubmit}
          />

          {result ? (
            <SalaryResults result={result} resultHeadingRef={resultHeadingRef} />
          ) : (
            <section className="rounded-[24px] border border-dashed border-[var(--color-border)] bg-[rgba(255,255,255,0.68)] p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                Risultato
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--color-ink)]">
                Nessuna simulazione mostrata
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                Inserisci una RAL valida, scegli il numero di mensilità e premi “Calcola il
                netto” per vedere il risultato sullo stesso schermo.
              </p>
            </section>
          )}
        </div>
      </section>

      <footer className="mt-10 border-t border-[rgba(17,21,10,0.08)] py-6 text-sm text-[var(--color-text-muted)]">
        Prototipo non ufficiale realizzato per la task Product Builder di Jet HR.
      </footer>
    </main>
  );
}
