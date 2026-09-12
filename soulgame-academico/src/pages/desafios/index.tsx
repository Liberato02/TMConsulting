import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { ATIVIDADES } from "../../data/atividades";
import { converterPontosParaReais, formatarReais } from "../../data/conversao";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

const PONTOS_POR_NIVEL = 500;

const CORES_CATEGORIA: Record<string, string> = {
  saude: "bg-rose-100 text-rose-700",
  "meio-ambiente": "bg-emerald-100 text-emerald-700",
  social: "bg-amber-100 text-amber-700",
};

export function Desafios() {
  const { usuario, concluirAtividade } = useAuth();
  const { mostrarToast } = useToast();
  useTituloDocumento("Meus Desafios | SoulGame");

  if (!usuario) return null; // RotaProtegida já garante login, isso é só segurança extra

  function handleConcluir(idAtividade: string, nome: string, pontos: number) {
    concluirAtividade(idAtividade, pontos);
    const valorReais = formatarReais(converterPontosParaReais(pontos));
    mostrarToast(`+${pontos} pts (${valorReais}) — ${nome} concluído! 🎉`, "sucesso");
  }

  const pontosNoNivelAtual = usuario.pontos % PONTOS_POR_NIVEL;
  const progressoNivel = (pontosNoNivelAtual / PONTOS_POR_NIVEL) * 100;

  return (
    <main aria-label="Painel de desafios e gamificação" className="flex-1 bg-slate-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-1">
          Olá, {usuario.nome}! 👋
        </h1>
        <p className="text-slate-500 mb-8">
          Continue seus desafios e suba de nível ajudando sua comunidade.
        </p>

        {/* Painel de status estilo Duolingo: nível, streak, pontos, saldo em R$ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">{usuario.nivel}</p>
            <p className="text-xs text-slate-500 mt-1">Nível</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-orange-500">🔥 {usuario.streakDias}</p>
            <p className="text-xs text-slate-500 mt-1">Dias seguidos</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">{usuario.pontos}</p>
            <p className="text-xs text-slate-500 mt-1">Pontos totais</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-3xl font-bold text-emerald-600">
              {formatarReais(converterPontosParaReais(usuario.pontos))}
            </p>
            <p className="text-xs text-slate-500 mt-1">Saldo em R$</p>
          </div>
        </div>

        {/* Barra de progresso até o próximo nível */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Progresso para o nível {usuario.nivel + 1}</span>
            <span>{pontosNoNivelAtual} / {PONTOS_POR_NIVEL} pts</span>
          </div>
          <div
            role="progressbar"
            aria-label={`Progresso para o nível ${usuario.nivel + 1}`}
            aria-valuenow={pontosNoNivelAtual}
            aria-valuemin={0}
            aria-valuemax={PONTOS_POR_NIVEL}
            className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressoNivel}%` }}
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Desafios disponíveis
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ATIVIDADES.map((atividade) => {
            const concluida = usuario.atividadesConcluidas.includes(atividade.id);

            return (
              <div
                key={atividade.id}
                className={`rounded-2xl shadow-sm p-5 border-2 transition-colors ${
                  concluida
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-white border-transparent"
                }`}
              >
                <span
                  className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2 ${CORES_CATEGORIA[atividade.categoria]}`}
                >
                  {atividade.categoria}
                </span>
                <Link to={`/desafios/${atividade.id}`} className="font-bold text-slate-800 hover:underline block">
                  {atividade.nome}
                </Link>
                <p className="text-sm text-slate-500 mt-1">{atividade.descricao}</p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-semibold text-blue-700">
                    +{atividade.pontos} pts
                    <span className="text-emerald-600 font-normal">
                      {" "}
                      ({formatarReais(converterPontosParaReais(atividade.pontos))})
                    </span>
                  </span>
                  <button
                    onClick={() => handleConcluir(atividade.id, atividade.nome, atividade.pontos)}
                    disabled={concluida}
                    className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                      concluida
                        ? "bg-emerald-200 text-emerald-800 cursor-default"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {concluida ? "Concluído ✓" : "Concluir"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );

}