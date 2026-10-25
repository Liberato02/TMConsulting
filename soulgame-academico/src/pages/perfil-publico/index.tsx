import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { listarRanking } from "../../data/usuariosStorage";
import { buscarDefinicaoTipoConta } from "../../data/tiposConta";
import type { Usuario } from "../../types";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

// Rota dinâmica: /perfil/:usuarioId
//
// Diferente de /perfil (que mostra SEMPRE o usuário logado, via
// AuthContext), esta página lê o id da própria URL com useParams — é
// assim que o React Router passa parâmetros de rota pro componente.
// Usada a partir do Ranking, onde cada linha vira um link pra cá.
type PerfilResumido = Pick<Usuario, "id" | "nome" | "pontos" | "nivel" | "tipo">;

type EstadoCarregamento = "carregando" | "sucesso" | "nao_encontrado" | "erro";

export function PerfilPublico() {
  useTituloDocumento("Perfil do Jogador | SoulGame");
  const { usuarioId } = useParams<{ usuarioId: string }>();
  const navigate = useNavigate();
  const { usuario: usuarioLogado } = useAuth();

  const [perfil, setPerfil] = useState<PerfilResumido | null>(null);
  const [estado, setEstado] = useState<EstadoCarregamento>("carregando");

  useEffect(() => {
    let cancelado = false;
    setEstado("carregando");

    listarRanking()
      .then((lista) => {
        if (cancelado) return;

        const encontrado = lista.find((pessoa) => pessoa.id === usuarioId);
        if (!encontrado) {
          setEstado("nao_encontrado");
          return;
        }
        setPerfil(encontrado);
        setEstado("sucesso");
      })
      .catch(() => {
        if (!cancelado) setEstado("erro");
      });

    return () => {
      cancelado = true;
    };
  }, [usuarioId]);

  // Redirecionamento eficiente: se o id na URL não corresponder a
  // ninguém (rota dinâmica "inválida"), volta pro ranking depois de
  // avisar o usuário, em vez de deixar uma tela vazia.
  useEffect(() => {
    if (estado === "nao_encontrado") {
      const tempo = setTimeout(() => navigate("/ranking", { replace: true }), 2500);
      return () => clearTimeout(tempo);
    }
  }, [estado, navigate]);

  if (estado === "carregando") {
    return (
      <main aria-label="Perfil público" className="flex-1 px-4 py-8 bg-slate-50">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm p-6 text-center text-sm text-slate-400">
          Carregando perfil...
        </div>
      </main>
    );
  }

  if (estado === "erro") {
    return (
      <main aria-label="Perfil público" className="flex-1 px-4 py-8 bg-slate-50">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm p-6 text-center">
          <p className="text-sm text-red-600 font-semibold mb-2">
            Não foi possível carregar este perfil.
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Confira se o back-end Java está rodando e tente novamente.
          </p>
          <Link to="/ranking" className="text-sm font-semibold text-blue-700 hover:underline">
            ← Voltar ao ranking
          </Link>
        </div>
      </main>
    );
  }

  if (estado === "nao_encontrado" || !perfil) {
    return (
      <main aria-label="Perfil público" className="flex-1 px-4 py-8 bg-slate-50">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm p-6 text-center">
          <p className="text-sm text-slate-600 font-semibold mb-1">
            Esse usuário não existe (ou não aparece mais no ranking).
          </p>
          <p className="text-xs text-slate-400">Redirecionando para o ranking...</p>
        </div>
      </main>
    );
  }

  const souEu = usuarioLogado?.id === perfil.id;
  const definicao = perfil.tipo !== "admin" ? buscarDefinicaoTipoConta(perfil.tipo) : null;

  return (
    <main aria-label={`Perfil público de ${perfil.nome}`} className="flex-1 px-4 py-8 bg-slate-50">
      <div className="max-w-lg mx-auto">
        <Link to="/ranking" className="text-sm text-blue-700 hover:underline mb-4 inline-block">
          ← Voltar ao ranking
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
            {perfil.nome.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-blue-800">
            {perfil.nome} {souEu && <span className="text-blue-600 text-sm">(você)</span>}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {definicao?.rotulo ?? perfil.tipo} · Nível {perfil.nivel}
          </p>
          <p className="text-3xl font-extrabold text-blue-700 mt-4">{perfil.pontos} pts</p>
        </div>
      </div>
    </main>
  );
}