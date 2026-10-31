import { useAuth } from "../../hooks/useAuth";
import { ATIVIDADES } from "../../data/atividades";
import { converterPontosParaReais, formatarReais } from "../../data/conversao";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

const ICONE_CATEGORIA: Record<string, string> = {
  saude: "❤️",
  "meio-ambiente": "🌱",
  social: "🤝",
};

function formatarDataHora(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Historico() {
  useTituloDocumento("Histórico | SoulGame");
  const { usuario } = useAuth();
  if (!usuario) return null;

  const concluidas = usuario.atividadesConcluidas
    .map((id) => ({
      atividade: ATIVIDADES.find((a) => a.id === id),
      concluidaEm: usuario.historicoConclusoes[id],
    }))
    .filter((item): item is { atividade: NonNullable<typeof item.atividade>; concluidaEm: string } =>
      Boolean(item.atividade)
    )
    .sort((a, b) => (b.concluidaEm ?? "").localeCompare(a.concluidaEm ?? ""));

  return (
    <main aria-label="Histórico de atividades" className="flex-1 px-4 py-8 bg-slate-50">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">Histórico de atividades</h1>
        <p className="text-sm text-slate-600 mb-6">
          Tudo que você já concluiu na Trilha Soul, {usuario.nome.split(" ")[0]}.
        </p>

        {concluidas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-sm text-slate-600">
            Você ainda não concluiu nenhum desafio. Vá para a{" "}
            <span className="font-semibold text-blue-700">Trilha Soul</span> e comece!
          </div>
        ) : (
          <ul className="space-y-2">
            {concluidas.map(({ atividade, concluidaEm }) => (
              <li
                key={atividade.id}
                className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3"
              >
                <span className="text-xl shrink-0" aria-hidden="true">
                  {ICONE_CATEGORIA[atividade.categoria]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-800 truncate">
                    {atividade.nome}
                  </p>
                  <p className="text-xs text-slate-600">
                    Concluído em {concluidaEm ? formatarDataHora(concluidaEm) : "—"}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 shrink-0">
                  +{atividade.pontos} pts
                  <br />
                  <span className="text-slate-600 font-normal">
                    {formatarReais(converterPontosParaReais(atividade.pontos))}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
