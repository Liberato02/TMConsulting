import { useState, type FormEvent } from "react";
import { ATIVIDADES } from "../../data/atividades";
import type { Atividade } from "../../types";
import { useAuth } from "../../hooks/useAuth";

// Painel do time de cadastro (admin). Nesta versão acadêmica, a lista
// vive em estado local (useState) — simula o CRUD sem persistência real.
// Na versão SoulGame/MVP, isso conversa com a API Java via Fetch.
export function Cadastros() {
  const { usuario } = useAuth();
  const [lista, setLista] = useState<Atividade[]>(ATIVIDADES);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pontos, setPontos] = useState(50);
  const [categoria, setCategoria] = useState<Atividade["categoria"]>("social");

  function handleSubmit(evento: FormEvent) {
    evento.preventDefault();

    const nova: Atividade = {
      id: crypto.randomUUID(),
      nome,
      descricao,
      pontos,
      categoria,
    };

    setLista((atual) => [...atual, nova]);
    setNome("");
    setDescricao("");
    setPontos(50);
  }

  if (!usuario) return null;

  return (
    <main aria-label="Painel administrativo de cadastro de atividades" className="flex-1 px-4 py-12 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">
          Painel do time de cadastro
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Logado como <strong>{usuario.email}</strong> (admin). Cadastre novas
          atividades, campanhas e campeonatos disponíveis para os usuários.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-6 grid gap-4 mb-8"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome-atividade" className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
              <input
                id="nome-atividade"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="pontos-atividade" className="block text-sm font-medium text-slate-700 mb-1">
                Pontos
              </label>
              <input
                id="pontos-atividade"
                type="number"
                min={1}
                value={pontos}
                onChange={(e) => setPontos(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="descricao-atividade" className="block text-sm font-medium text-slate-700 mb-1">
              Descrição
            </label>
            <input
              id="descricao-atividade"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="categoria-atividade" className="block text-sm font-medium text-slate-700 mb-1">
              Categoria
            </label>
            <select
              id="categoria-atividade"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Atividade["categoria"])}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="saude">Saúde</option>
              <option value="meio-ambiente">Meio ambiente</option>
              <option value="social">Social</option>
            </select>
          </div>

          <button
            type="submit"
            className="justify-self-start bg-blue-600 hover:bg-blue-700 text-white
                       font-semibold rounded-lg px-5 py-2 text-sm transition-colors"
          >
            Cadastrar atividade
          </button>
        </form>

        <h2 className="text-lg font-semibold text-slate-700 mb-3">
          Atividades cadastradas ({lista.length})
        </h2>
        <ul className="space-y-2">
          {lista.map((atividade) => (
            <li
              key={atividade.id}
              className="bg-white rounded-xl shadow-sm px-4 py-3 flex justify-between items-center text-sm"
            >
              <span className="font-medium text-slate-700">{atividade.nome}</span>
              <span className="text-blue-700 font-semibold">
                +{atividade.pontos} pts
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );

}
