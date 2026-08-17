export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-neutral-600">
          Phase 2 Build Shell
        </p>
        <h1 className="text-3xl font-semibold text-neutral-950">
          Italian 2026 net salary calculation engine
        </h1>
        <p className="max-w-2xl text-base leading-7 text-neutral-700">
          Unofficial prototype created for the Jet HR Product Builder technical task.
        </p>
      </div>
      <section className="rounded-2xl border border-neutral-200 p-6">
        <p className="text-sm leading-6 text-neutral-700">
          This phase provides the domain calculation engine, automated tests, and a minimal
          Next.js shell only. The final calculator interface is intentionally not implemented yet.
        </p>
      </section>
    </main>
  );
}
