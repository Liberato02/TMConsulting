interface ListaSkeletonProps {
  rotulo: string; // texto lido por leitores de tela enquanto carrega
  linhas?: number;
}

// Estado de "carregando" em formato de esqueleto: mostra o desenho da
// lista (retângulos cinza pulsando) em vez de uma tela vazia, o que
// reduz a sensação de espera e evita "pulos" de layout (CLS).
export function ListaSkeleton({ rotulo, linhas = 5 }: ListaSkeletonProps) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{rotulo}</span>
      <ul aria-hidden="true" className="space-y-2">
        {Array.from({ length: linhas }, (_, indice) => (
          <li key={indice} className="h-14 rounded-2xl bg-slate-200 animate-pulse" />
        ))}
      </ul>
    </div>
  );
}