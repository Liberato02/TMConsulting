import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { ATIVIDADES } from "../../data/atividades";
import { ehValidador } from "../../data/tiposConta";
import {
  gerarChaveValidacao,
  listarChavesPorInstituicao,
} from "../../data/chavesValidacao";
import type { ChaveValidacao } from "../../types";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

export function PainelValidador() {
  useTituloDocumento("Painel do Validador | SoulGame");
  const { usuario } = useAuth();
  const { mostrarToast } = useToast();
  const [atividadeId, setAtividadeId] = useState(ATIVIDADES[0]?.id ?? "");
  const [chaves, setChaves] = useState<ChaveValidacao[]>(() =>
    usuario ? listarChavesPorInstituicao(usuario.id) : []
  );

  if (!usuario) return null;

  // Só contas com capacidade "validador" (Soulhealth, Soulsport,
  // Educasoul, Ecosoul) acessam este painel.
  if (!ehValidador(usuario.tipo === "admin" ? "soulgamer" : usuario.tipo)) {
    return <Navigate to="/desafios" replace />;
  }

  function handleGerar() {
    if (!usuario) return;
    const nova = gerarChaveValidacao(atividadeId, usuario.id, usuario.nome);
    setChaves((atual) => [nova, ...atual]);
    mostrarToast(`Chave ${nova.codigo} gerada com sucesso!`, "sucesso");
  }
  return (
    <main
      aria-label="Painel do validador"
      className="flex-1 px-4 py-12 bg-slate-50"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">
          
        Painel do validador
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Logado como <strong>{usuario.nome}</strong>. Gere chaves únicas e
          não-transferíveis para confirmar que um Soulgamer realmente cumpriu
          uma atividade na sua instituição/evento.
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <label
            htmlFor="atividade-chave"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Atividade
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              id="atividade-chave"
              value={atividadeId}
              onChange={(e) => setAtividadeId(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {ATIVIDADES.map((atividade) => (
                <option key={atividade.id} value={atividade.id}>
                  {atividade.nome}
                </option>
              ))}
            </select>
            <button
              onClick={handleGerar}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold
                         rounded-lg px-5 py-2 text-sm transition-colors whitespace-nowrap"
            >
              Gerar chave
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Em produção, essa chave viraria um QR Code para o Soulgamer
            escanear no local do evento/instituição.
          </p>
        </div>

        <h2 className="text-lg font-semibold text-slate-700 mb-3">
          Chaves geradas ({chaves.length})
        </h2>
        <ul className="space-y-2">
          {chaves.map((chave) => {
            const atividade = ATIVIDADES.find((a) => a.id === chave.atividadeId);
            return (
              <li
                key={chave.codigo}
                className="bg-white rounded-xl shadow-sm px-4 py-3 flex justify-between items-center gap-3 text-sm"
              >
                <div>
                  <code className="font-mono font-semibold text-blue-800">
                    {chave.codigo}
                  </code>
                  <p className="text-xs text-slate-500">{atividade?.nome}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    chave.usadoPorIds.length >= chave.limiteUsos
                      ? "bg-slate-100 text-slate-500"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {chave.usadoPorIds.length}/{chave.limiteUsos} usada(s)
                </span>
              </li>
            );
          })}
          {chaves.length === 0 && (
            <p className="text-sm text-slate-400">Nenhuma chave gerada ainda.</p>
          )}
        </ul>
      </div>
    </main>
  );
}
