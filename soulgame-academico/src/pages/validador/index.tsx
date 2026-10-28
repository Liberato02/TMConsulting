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
