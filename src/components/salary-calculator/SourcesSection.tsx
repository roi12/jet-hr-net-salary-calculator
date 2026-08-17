const sources = [
  {
    href: "https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=25G00212&art.dataPubblicazioneGazzetta=2025-12-30&art.flagTipoArticolo=0&art.idArticolo=1&art.idGruppo=1&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=1&art.versione=1",
    label: "Legge n. 199/2025: aliquote IRPEF 2026",
    description: "Fonte primaria per lo scaglione IRPEF del 33% applicabile ai redditi 2026.",
  },
  {
    href: "https://www.agenziaentrate.gov.it/portale/imposta-sul-reddito-delle-persone-fisiche-irpef-/aliquote-e-calcolo-dell-irpef-cittadini",
    label: "Agenzia delle Entrate: aliquote e calcolo IRPEF",
    description: "Riferimento ufficiale per la struttura progressiva dell'imposta.",
  },
  {
    href: "https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni",
    label: "Agenzia delle Entrate: lavoro dipendente e pensioni",
    description: "Base ufficiale per detrazioni da lavoro dipendente e misure del cuneo fiscale.",
  },
  {
    href: "https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html",
    label: "INPS: soglia contributiva 2026",
    description: "Riferimento per la soglia che attiva il contributo aggiuntivo dell'1%.",
  },
  {
    href: "https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef",
    label: "Regione Lombardia: addizionale regionale IRPEF",
    description: "Fonte ufficiale per l'addizionale regionale applicata nella simulazione.",
  },
  {
    href: "https://www.comune.milano.it/argomenti/tributi/addizionale-comunale-irpef",
    label: "Comune di Milano: addizionale comunale IRPEF",
    description: "Fonte ufficiale per aliquota e soglia di esenzione comunale.",
  },
];

export function SourcesSection() {
  return (
    <section
      aria-labelledby="sources-title"
      className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-7"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
          Verificabilità
        </p>
        <h3 id="sources-title" className="text-2xl font-semibold text-[var(--color-ink)]">
          Fonti e metodologia
        </h3>
        <p className="max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
          La simulazione applica in sequenza contributi dipendente, imponibile IRPEF, imposta
          progressiva, detrazioni, cuneo fiscale e addizionali locali secondo la documentazione
          ufficiale richiamata dal progetto.
        </p>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {sources.map((source) => (
          <a
            key={source.href}
            className="rounded-[20px] border border-[var(--color-border)] bg-white p-4 transition-colors hover:border-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
            href={source.href}
            rel="noreferrer noopener"
            target="_blank"
          >
            <p className="text-sm font-semibold text-[var(--color-ink)]">{source.label}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
              {source.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
