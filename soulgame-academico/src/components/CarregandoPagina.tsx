// Fallback do <Suspense>: aparece por instantes enquanto o JavaScript da
// página (chunk) é baixado. role="status" avisa leitores de tela.
export function CarregandoPagina() {
  return (
    <main aria-label="Carregando página" className="flex-1 flex items-center justify-center px-4 py-20">
      <p role="status" aria-live="polite" className="text-sm text-slate-600 animate-pulse">
        Carregando...
      </p>
    </main>
  );
}