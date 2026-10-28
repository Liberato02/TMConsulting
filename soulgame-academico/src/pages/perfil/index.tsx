import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { SeletorAvatar } from "../../components/SeletorAvatar";
import { buscarDefinicaoTipoConta } from "../../data/tiposConta";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

export function Perfil() {
  useTituloDocumento("Meu Perfil | SoulGame");
  const { usuario, atualizarPerfil } = useAuth();
  const { mostrarToast } = useToast();

  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [telefone, setTelefone] = useState(usuario?.telefone ?? "");
  const [cidade, setCidade] = useState(usuario?.cidade ?? "");
  const [estado, setEstado] = useState(usuario?.estado ?? "");

  if (!usuario) return null;

  const definicaoTipo =
    usuario.tipo !== "admin" ? buscarDefinicaoTipoConta(usuario.tipo) : null;

  function handleSubmit(evento: FormEvent) {
    evento.preventDefault();
    atualizarPerfil({ nome, telefone, cidade, estado });
    mostrarToast("Perfil atualizado!", "sucesso");
  }

  return (
    <main aria-label="Meu perfil" className="flex-1 px-4 py-8 bg-slate-50">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">Meu perfil</h1>
        <p className="text-sm text-slate-500 mb-6">
          Gerencie seus dados, avatar e informações da sua conta.
        </p>

        <SeletorAvatar />

        {/* Cartão do tipo de conta — mostra o papel e as capacidades dessa conta */}
        {definicaoTipo && (
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <p className="text-xs text-slate-400 mb-1">Tipo de conta</p>
            <p className="font-bold text-blue-800">{definicaoTipo.rotulo}</p>
            <p className="text-sm text-slate-500 mt-1">{definicaoTipo.descricao}</p>
            <div className="flex gap-2 mt-3">
