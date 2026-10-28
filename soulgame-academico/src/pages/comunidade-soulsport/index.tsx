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

    const novoEvento = criarEvento({
      organizadorId: usuario!.id,
      nome,
      data,
      local,
    setEventos((atual) => [novoEvento, ...atual]);
    setNome("");
    setLocal("");
    setDescricao("");
    mostrarToast(`Evento criado! Código: ${chave.codigo}`, "sucesso");
  }

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
             

