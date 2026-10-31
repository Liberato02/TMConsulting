import { Link, useParams } from "react-router-dom";
import { ATIVIDADES } from "../../data/atividades";
import { converterPontosParaReais, formatarReais } from "../../data/conversao";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

const CORES_CATEGORIA: Record<string, string> = {
  saude: "bg-rose-100 text-rose-700",
  "meio-ambiente": "bg-emerald-100 text-emerald-700",
  social: "bg-amber-100 text-amber-700",
};

// Rota dinâmica: /desafios/:atividadeId — o id vem da URL via useParams,
// e é usado para localizar a atividade certa dentro da lista oficial.
export function DetalheAtividade() {
  const { atividadeId } = useParams<{ atividadeId: string }>();
  const atividade = ATIVIDADES.find((a) => a.id === atividadeId);

  useTituloDocumento(atividade ? `${atividade.nome} — SoulGame` : "Atividade não encontrada — SoulGame");

  if (!atividade) {
    return (
      <main aria-label="Atividade não encontrada" className="flex-1 px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-700 mb-2">Atividade não encontrada</h1>
        <p className="text-slate-500 mb-6">
          O desafio que você tentou acessar não existe ou foi removido.
        </p>
        <Link to="/desafios" className="text-blue-600 font-semibold hover:underline">
          Voltar para o painel de desafios
        </Link>
      </main>
    );
  }

  return (
    <main aria-label={`Detalhes do desafio ${atividade.nome}`} className="flex-1 px-4 py-16 bg-slate-50">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm p-8">
        <Link to="/desafios" className="text-sm text-blue-600 hover:underline">
          &larr; Voltar para o painel
        </Link>

        <span
          className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mt-4 mb-2 ${CORES_CATEGORIA[atividade.categoria]}`}
        >
          {atividade.categoria}
        </span>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">{atividade.nome}</h1>
        <p className="text-slate-600 mb-6">{atividade.descricao}</p>

        <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm text-slate-500">Recompensa por conclusão</span>
          <span className="text-lg font-bold text-blue-700">
            +{atividade.pontos} pts
            <span className="text-emerald-600 font-normal text-sm ml-1">
              ({formatarReais(converterPontosParaReais(atividade.pontos))})
            </span>
          </span>
        </div>

        <Link
          to="/desafios"
          className="block text-center mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold
                     rounded-lg px-4 py-2 transition-colors"
        >
          Ir para o painel e concluir
        </Link>
      </div>
    </main>
  );
}