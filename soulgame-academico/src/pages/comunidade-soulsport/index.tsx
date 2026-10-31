import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import {
  criarEvento,
  listarEventosPorOrganizador,
  type EventoComunidade,
} from "../../data/eventosComunidade";
import { gerarChaveValidacao, listarChavesPorInstituicao } from "../../data/chavesValidacao";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

function hojeISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ComunidadeSoulsport() {
  useTituloDocumento("Comunidade Soulsport | SoulGame");
  const { usuario } = useAuth();
  const { mostrarToast } = useToast();

  const [nome, setNome] = useState("");
  const [data, setData] = useState(hojeISO());
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [participantesEsperados, setParticipantesEsperados] = useState(20);
  const [eventos, setEventos] = useState<EventoComunidade[]>(() =>
    usuario ? listarEventosPorOrganizador(usuario.id) : []
  );

  if (!usuario) return null;

  // Só contas Soulsport organizam comunidades/eventos.
  if (usuario.tipo !== "soulsport") {
    return <Navigate to="/desafios" replace />;
  }

  const chavesDaInstituicao = listarChavesPorInstituicao(usuario.id);

  function handleSubmit(evento: FormEvent) {
    evento.preventDefault();

    // Cria a chave de validação com uso múltiplo — o mesmo código serve
    // para TODOS os participantes do evento (cada um resgata sua vez).
    const chave = gerarChaveValidacao(
      "esporte-grupo",
      usuario!.id,
      usuario!.nome,
      participantesEsperados
    );

    const novoEvento = criarEvento({
      organizadorId: usuario!.id,
      nome,
      data,
      local,
      descricao,
      codigoChave: chave.codigo,
    });

    setEventos((atual) => [novoEvento, ...atual]);
    setNome("");
    setLocal("");
    setDescricao("");
    mostrarToast(`Evento criado! Código: ${chave.codigo}`, "sucesso");
  }

  return (
    <main aria-label="Comunidade Soulsport" className="flex-1 px-4 py-8 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-800 mb-1">🏃 Comunidade Soulsport</h1>
        <p className="text-sm text-slate-600 mb-6">
          Crie um evento esportivo em grupo (pedalada, yoga, corrida...) e
          divulgue o código único para todos os participantes confirmarem presença.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4 mb-8">
          <div>
            <label htmlFor="evento-nome" className="block text-sm font-medium text-slate-700 mb-1">
              Nome do evento
            </label>
            <input
              id="evento-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Ex: Pedalada no Parque Ibirapuera"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="evento-data" className="block text-sm font-medium text-slate-700 mb-1">
                Data
              </label>
              <input
                id="evento-data"
                type="date"
                min={hojeISO()}
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="evento-participantes" className="block text-sm font-medium text-slate-700 mb-1">
                Participantes esperados
              </label>
              <input
                id="evento-participantes"
                type="number"
                min={1}
                value={participantesEsperados}
                onChange={(e) => setParticipantesEsperados(Number(e.target.value))}
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="evento-local" className="block text-sm font-medium text-slate-700 mb-1">
              Local
            </label>
            <input
              id="evento-local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="evento-descricao" className="block text-sm font-medium text-slate-700 mb-1">
              Descrição
            </label>
            <input
              id="evento-descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 text-sm"
          >
            Criar evento e gerar código
          </button>
        </form>

        <h2 className="text-lg font-semibold text-slate-700 mb-3">
          Meus eventos ({eventos.length})
        </h2>
        <ul className="space-y-2">
          {eventos.map((evento) => {
            const chave = chavesDaInstituicao.find((c) => c.codigo === evento.codigoChave);
            return (
              <li key={evento.id} className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-bold text-slate-800">{evento.nome}</p>
                    <p className="text-xs text-slate-600">
                      {new Date(evento.data + "T00:00:00").toLocaleDateString("pt-BR")} — {evento.local}
                    </p>
                  </div>
                  <code className="bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 font-mono text-sm text-blue-800 shrink-0">
                    {evento.codigoChave}
                  </code>
                </div>
                {chave && (
                  <p className="text-xs text-slate-600 mt-2">
                    {chave.usadoPorIds.length} de {chave.limiteUsos} confirmações usadas
                  </p>
                )}
              </li>
            );
          })}
          {eventos.length === 0 && (
            <p className="text-sm text-slate-600">Nenhum evento criado ainda.</p>
          )}
        </ul>
      </div>
    </main>
  );
}
