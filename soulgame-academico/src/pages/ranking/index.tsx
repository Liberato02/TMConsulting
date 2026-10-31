import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { listarRanking } from "../../data/usuariosStorage";
import { buscarDefinicaoTipoConta } from "../../data/tiposConta";
import type { Usuario } from "../../types";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";
import { ListaSkeleton } from "../../components/ListaSkeleton";

const LIMITE_RANKING = 20;

type ItemRanking = Pick<Usuario, "id" | "nome" | "pontos" | "nivel" | "tipo">;

// Intersection type: o item do ranking MAIS a posição calculada (1º, 2º...).
type ItemRankingPosicionado = ItemRanking & { posicao: number };

type EstadoRanking = "carregando" | "sucesso" | "erro";

export function Ranking() {
  useTituloDocumento("Ranking | SoulGame");
  const { usuario } = useAuth();
  const [ranking, setRanking] = useState<ItemRankingPosicionado[]>([]);
  const [estado, setEstado] = useState<EstadoRanking>("carregando");

  // Efeito legítimo: busca dados de um servidor externo (a API), algo
  // que só existe fora do ciclo de renderização do React — por isso
  // precisa de useEffect, ao contrário de cálculos derivados do próprio
  // estado local (que dá pra fazer direto no corpo do componente).
  useEffect(() => {
    let cancelado = false;

    listarRanking()
      .then((lista) => {
        if (cancelado) return;
        setRanking(
          lista
            .slice(0, LIMITE_RANKING)
            .map((pessoa, indice) => ({ ...pessoa, posicao: indice + 1 }))
        );
        setEstado("sucesso");
      })
      .catch(() => {
        if (!cancelado) setEstado("erro");
      });

    return () => {
      cancelado = true;
    };
  }, []);

  if (!usuario) return null;

  return (
    <main aria-label="Ranking de usuários" className="flex-1 px-4 py-8 bg-slate-50">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">🏆 Ranking</h1>
        <p className="text-sm text-slate-600 mb-6">
          Os {LIMITE_RANKING} usuários com mais pontos na SoulGame.
        </p>

        {estado === "carregando" ? (
          <ListaSkeleton rotulo="Carregando ranking..." />
        ) : estado === "erro" ? (
          <div
            role="alert"
            className="bg-white rounded-2xl shadow-sm p-6 text-center text-sm text-red-700"
          >
            Não foi possível carregar o ranking agora. Tente novamente em instantes.
          </div>
        ) : ranking.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-sm text-slate-600">
            Ainda não há usuários suficientes para formar um ranking.
          </div>
        ) : (
          <ol className="space-y-2">
            {ranking.map((pessoa) => {
              const souEu = pessoa.id === usuario.id;
              const definicao =
                pessoa.tipo !== "admin" ? buscarDefinicaoTipoConta(pessoa.tipo) : null;
              return (
                <li key={pessoa.id}>
                  {/* leva pra /perfil/:usuarioId — rota dinâmica com
                      parâmetro de URL, lida na página via useParams */}
                  <Link
                    to={`/perfil/${pessoa.id}`}
                    className={`rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3 transition-colors hover:bg-blue-50 ${
                      souEu ? "bg-blue-50 border-2 border-blue-300" : "bg-white"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        pessoa.posicao === 1
                          ? "bg-amber-400 text-white"
                          : pessoa.posicao === 2
                            ? "bg-slate-300 text-white"
                            : pessoa.posicao === 3
                              ? "bg-orange-400 text-white"
                              : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {pessoa.posicao}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-800 truncate">
                        {pessoa.nome} {souEu && <span className="text-blue-600">(você)</span>}
                      </p>
                      <p className="text-xs text-slate-600">
                        Nível {pessoa.nivel} · {definicao?.rotulo ?? pessoa.tipo}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-blue-700 shrink-0">
                      {pessoa.pontos} pts
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </main>
  );
}
