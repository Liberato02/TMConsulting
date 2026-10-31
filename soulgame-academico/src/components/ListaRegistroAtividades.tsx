import type { Atividade, Usuario } from "../types";

const ICONE_CATEGORIA: Record<string, string> = {
  saude: "❤️",
  "meio-ambiente": "🌱",
  social: "🤝",
};

function formatarData(dataISO: string): string {
  return new Date(dataISO + "T00:00:00").toLocaleDateString("pt-BR");
}

function status(atividade: Atividade, usuario: Usuario): { rotulo: string; cor: string } {
  if (usuario.atividadesConcluidas.includes(atividade.id)) {
    return { rotulo: "Concluído", cor: "text-emerald-600" };
  }
  const data = usuario.prazosDesafios[atividade.id];
  if (data) return { rotulo: `Agendado: ${formatarData(data)}`, cor: "text-blue-600" };
  return { rotulo: "Não agendado", cor: "text-slate-600" };
}

// Registro em lista — forma alternativa e mais rápida de abrir os
// detalhes de um desafio (data, chave, conclusão) sem precisar clicar
// no mapa. Mesma ação, caminho mais direto.
export function ListaRegistroAtividades({
  atividades,
  usuario,
  onSelecionar,
}: {
  atividades: Atividade[];
  usuario: Usuario;
  onSelecionar: (idAtividade: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm divide-y divide-slate-100">
      {atividades.map((atividade) => {
        const info = status(atividade, usuario);
        return (
          <button
            key={atividade.id}
            onClick={() => onSelecionar(atividade.id)}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl shrink-0" aria-hidden="true">
                {ICONE_CATEGORIA[atividade.categoria]}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-slate-800 truncate">
                  {atividade.nome}
                </p>
                <p className={`text-xs ${info.cor}`}>{info.rotulo}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-700 shrink-0">
              +{atividade.pontos} pts
            </span>
          </button>
        );
      })}
    </div>
  );
}
