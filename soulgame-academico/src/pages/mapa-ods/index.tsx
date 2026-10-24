import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  listarOdsApi,
  listarAtividadesApi,
  type OdsApi,
  type AtividadeApi,
} from "../../api/clienteApi";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

export function MapaOds() {
  useTituloDocumento("Mapa de ODS | SoulGame");
  const { usuario } = useAuth();
  const [listaOds, setListaOds] = useState<OdsApi[]>([]);
  const [atividades, setAtividades] = useState<AtividadeApi[]>([]);
  const [odsSelecionado, setOdsSelecionado] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    Promise.all([listarOdsApi(), listarAtividadesApi()])
      .then(([respostaOds, respostaAtividades]) => {
        setListaOds(respostaOds.ods);
        setAtividades(respostaAtividades.atividades);
      })
      .catch(() => {
        setListaOds([]);
        setAtividades([]);
      })
      .finally(() => setCarregando(false));
  }, []);

  // Um ODS está "desbloqueado" quando o usuário já concluiu ao menos
  // uma atividade ligada a ele — o mapa cresce junto com o progresso.
  const odsDesbloqueados = useMemo(() => {
    if (!usuario) return new Set<number>();
    const desbloqueados = new Set<number>();
    for (const atividade of atividades) {
      if (atividade.idOds && usuario.atividadesConcluidas.includes(atividade.id)) {
        desbloqueados.add(atividade.idOds);
      }
    }
    return desbloqueados;
  }, [atividades, usuario]);

  const atividadesDoOdsSelecionado = useMemo(() => {
    if (odsSelecionado === null) return [];
    return atividades.filter((a) => a.idOds === odsSelecionado);
  }, [atividades, odsSelecionado]);

  const odsInfoSelecionado = listaOds.find((o) => o.id === odsSelecionado) ?? null;

  if (!usuario) return null;

  return (
    <main aria-label="Mapa dos Objetivos de Desenvolvimento Sustentável" className="flex-1 px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">🌍 Mapa das Trilhas ODS</h1>
        <p className="text-sm text-slate-500 mb-5">
          Cada território acende quando você conclui a primeira ação daquele Objetivo de
          Desenvolvimento Sustentável — {odsDesbloqueados.size} de {listaOds.length || 17} já
          desbloqueados.
        </p>

        {carregando ? (
          <p className="text-sm text-slate-400 text-center py-10">Carregando o mapa…</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {listaOds.map((ods) => {
              const desbloqueado = odsDesbloqueados.has(ods.id);
              return (
                <button
                  key={ods.id}
                  onClick={() => setOdsSelecionado(ods.id)}
                  aria-label={`ODS ${ods.id}: ${ods.nome}${desbloqueado ? ", desbloqueado" : ", bloqueado"}`}
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center
                    p-2 text-center transition-all duration-300 ease-out
                    ${desbloqueado ? "shadow-lg scale-100 hover:scale-105" : "opacity-40 grayscale hover:opacity-60"}
                    ${odsSelecionado === ods.id ? "ring-4 ring-offset-2 ring-blue-500" : ""}`}
                  style={{ backgroundColor: desbloqueado ? ods.cor : "#94A3B8" }}
                >
                  {desbloqueado && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-2xl animate-ping-slow"
                      style={{ backgroundColor: ods.cor, opacity: 0.35 }}
                    />
                  )}
                  <span className="relative text-white font-extrabold text-lg drop-shadow">
                    {ods.id}
                  </span>
                  <span className="relative text-white text-[10px] leading-tight font-medium mt-1 line-clamp-2">
                    {ods.nome}
                  </span>
                  {!desbloqueado && (
                    <span className="relative text-white text-xs mt-1" aria-hidden="true">
                      🔒
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {odsInfoSelecionado && (
        <div
          role="dialog"
          aria-label={`Detalhes do ODS ${odsInfoSelecionado.id}`}
          className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50 p-4"
          onClick={() => setOdsSelecionado(null)}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-5 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                style={{ backgroundColor: odsInfoSelecionado.cor }}
              >
                {odsInfoSelecionado.id}
              </span>
              <h2 className="text-lg font-bold text-slate-800">{odsInfoSelecionado.nome}</h2>
            </div>

            <p className="text-xs font-semibold text-slate-500 mb-2">Atividades deste ODS na plataforma</p>

            {atividadesDoOdsSelecionado.length === 0 ? (
              <p className="text-sm text-slate-400">Nenhuma atividade cadastrada aqui ainda.</p>
            ) : (
              <ul className="space-y-2">
                {atividadesDoOdsSelecionado.map((atividade) => {
                  const concluida = usuario.atividadesConcluidas.includes(atividade.id);
                  return (
                    <li
                      key={atividade.id}
                      className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2 text-sm"
                    >
                      <span className={concluida ? "text-slate-400 line-through" : "text-slate-700"}>
                        {atividade.nome}
                      </span>
                      <span className="text-xs font-semibold text-blue-600">
                        {concluida ? "✓ feito" : `${atividade.pontuacaoBase} pts`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            <button
              onClick={() => setOdsSelecionado(null)}
              className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
