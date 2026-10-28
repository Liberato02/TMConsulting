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
              {definicaoTipo.multiplicador && (
                <span className="text-xs font-semibold bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                  Multiplicador
                </span>
              )}
              {definicaoTipo.validador && (
                <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                  Validador
                </span>
              )}
            </div>

            {definicaoTipo.multiplicador && usuario.codigoIndicacao && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Seu código de indicação</p>
                <code className="bg-teal-50 border border-teal-200 rounded-lg px-3 py-1 font-mono text-sm text-teal-800 inline-block">
                  {usuario.codigoIndicacao}
                </code>
              </div>
            )}
            {definicaoTipo.validador && (
              <Link
                to="/validador"
                className="inline-block mt-3 text-sm font-semibold text-amber-700 hover:underline"
              >
                Ir para o painel do validador →
              </Link>
            )}

            {usuario.tipo === "soulsport" && (
              <Link
                to="/comunidade"
                className="inline-block mt-2 text-sm font-semibold text-blue-700 hover:underline"
              >
                Gerenciar minha comunidade Soulsport →
              </Link>
            )}
          </div>
        )}

        {/* Formulário de edição de dados pessoais */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-slate-700 -mb-1">Dados pessoais</h2>

          <div>
            <label htmlFor="perfil-nome" className="block text-sm font-medium text-slate-700 mb-1">
              Nome completo
            </label>
            <input
              id="perfil-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="perfil-telefone" className="block text-sm font-medium text-slate-700 mb-1">
              Telefone
            </label>
            <input
              id="perfil-telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              autoComplete="off"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="perfil-cidade" className="block text-sm font-medium text-slate-700 mb-1">
                Cidade
              </label>
              <input
                id="perfil-cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="perfil-estado" className="block text-sm font-medium text-slate-700 mb-1">
                Estado
              </label>
              <input
                id="perfil-estado"
                value={estado}
                maxLength={2}
                onChange={(e) => setEstado(e.target.value)}
                autoComplete="off"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <p className="text-xs text-slate-400">E-mail: {usuario.email} (não editável)</p>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </main>
  );
}

