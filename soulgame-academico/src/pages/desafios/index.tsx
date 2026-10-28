import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { converterPontosParaReais, formatarReais } from "../../data/conversao";
import { ehMultiplicador, ehValidador } from "../../data/tiposConta";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

const PONTOS_POR_NIVEL = 500;

export function Desafios() {
  useTituloDocumento("Meus Desafios | SoulGame");
  const { usuario } = useAuth();
  if (!usuario) return null; // RotaProtegida já garante login, isso é só segurança extra

  const pontosNoNivelAtual = usuario.pontos % PONTOS_POR_NIVEL;
  const progressoNivel = (pontosNoNivelAtual / PONTOS_POR_NIVEL) * 100;
  const tipoParaCapacidade = usuario.tipo === "admin" ? "soulgamer" : usuario.tipo;
  const souMultiplicador = ehMultiplicador(tipoParaCapacidade);
  const souValidador = ehValidador(tipoParaCapacidade);

  return (
    <main aria-label="Painel do usuário" className="flex-1 bg-slate-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-1">
          Olá, {usuario.nome}! 👋
        </h1>
        <p className="text-slate-500 mb-6">
          Acompanhe seu progresso e siga para a Trilha Soul para escolher seus desafios.
        </p>

        <div className="flex gap-3 mb-6">
          <Link
            to="/perfil"
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            👤 Editar perfil e avatar
          </Link>
        </div>

        <Link
          to="/trilha"
          className="block bg-blue-600 hover:bg-blue-700 text-white text-center font-bold
                     text-lg rounded-2xl px-6 py-5 mb-6 transition-colors shadow-sm"
        >
          🗺️ Abrir Trilha Soul
        </Link>

        {souMultiplicador && usuario.codigoIndicacao && (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-sm font-semibold text-teal-800">Seu código de indicação</p>
              <p className="text-xs text-teal-600">
                Compartilhe — você ganha o dobro dos pontos de quem se cadastrar com ele.
              </p>
            </div>
            <code className="bg-white border border-teal-300 rounded-lg px-3 py-1 font-mono text-sm text-teal-800">
              {usuario.codigoIndicacao}
            </code>
          </div>
        )}

        {souValidador && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-sm font-semibold text-amber-800">Você é uma conta validadora</p>
              <p className="text-xs text-amber-600">
                Gere chaves únicas para confirmar atividades realizadas na sua instituição.
              </p>
            </div>
            <Link
              to="/validador"
              className="text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Abrir painel do validador
            </Link>
          </div>
        )}

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

        <div className="bg-white rounded-2xl shadow-sm p-4">
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
      </div>
    </main>
  );
}