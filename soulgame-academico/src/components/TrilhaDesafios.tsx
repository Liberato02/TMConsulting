import { useEffect, useRef } from "react";
import type { Atividade, Usuario } from "../types";
import { AvatarMarcador } from "./AvatarMarcador";

interface Ponto {
  x: number;
  y: number;
}

const ESPACAMENTO_NO = 148;
const MARGEM_LATERAL = 80;
const ALTURA_ONDA = 40;
const ALTURA_SVG = 240;
const Y_CENTRO = ALTURA_SVG / 2;
const TAMANHO_CASA = 46;

const ICONE_CATEGORIA: Record<string, string> = {
  saude: "❤️",
  "meio-ambiente": "🌱",
  social: "🤝",
};

// Pequena rotação alternada em cada "casa" — dá o efeito orgânico de
// tabuleiro físico (peças nunca ficam 100% alinhadas retas).
const ROTACOES = [-4, 3, -3, 4, -2, 3, -4, 2];

function gerarPontosNos(quantidade: number): Ponto[] {
  return Array.from({ length: quantidade }, (_, i) => ({
    x: MARGEM_LATERAL + i * ESPACAMENTO_NO,
    y: Y_CENTRO + (i % 2 === 0 ? -ALTURA_ONDA : ALTURA_ONDA),
  }));
}

function gerarCaminhoSuave(pontos: Ponto[]): string {
  if (pontos.length < 2) return "";
  let d = `M ${pontos[0].x} ${pontos[0].y}`;
  for (let i = 0; i < pontos.length - 1; i++) {
    const atual = pontos[i];
    const proximo = pontos[i + 1];
    const meioX = (atual.x + proximo.x) / 2;
    d += ` C ${meioX} ${atual.y}, ${meioX} ${proximo.y}, ${proximo.x} ${proximo.y}`;
  }
  return d;
}

function calcularPosicaoAvatar(pontos: Ponto[], fracao: number): Ponto {
  const totalSegmentos = pontos.length - 1;
  const posicao = Math.min(fracao * totalSegmentos, totalSegmentos);
  const indiceSegmento = Math.min(Math.floor(posicao), totalSegmentos - 1);
  const progressoSegmento = posicao - indiceSegmento;
  const pontoA = pontos[indiceSegmento];
  const pontoB = pontos[indiceSegmento + 1];
  return {
    x: pontoA.x + (pontoB.x - pontoA.x) * progressoSegmento,
    y: pontoA.y + (pontoB.y - pontoA.y) * progressoSegmento,
  };
}

function statusNo(
  atividade: Atividade,
  usuario: Usuario
): "concluido" | "agendado" | "disponivel" {
  if (usuario.atividadesConcluidas.includes(atividade.id)) return "concluido";
  if (usuario.prazosDesafios[atividade.id]) return "agendado";
  return "disponivel";
}

// Cores por status — mantém o "tabuleiro" mas com a paleta da marca.
const CORES_CASA: Record<string, { base: string; topo: string; texto: string }> = {
  concluido: { base: "#059669", topo: "#10b981", texto: "#ffffff" },
  agendado: { base: "#1d4ed8", topo: "#3b82f6", texto: "#ffffff" },
  disponivel: { base: "#cbd5e1", topo: "#ffffff", texto: "#1e40af" },
};

export function TrilhaDesafios({
  atividades,
  usuario,
  atividadeSelecionada,
  onSelecionar,
}: {
  atividades: Atividade[];
  usuario: Usuario;
  atividadeSelecionada?: string | null;
  onSelecionar: (idAtividade: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const pontosNos = gerarPontosNos(atividades.length);
  const pontoInicio: Ponto = { x: 24, y: Y_CENTRO };
  const pontoMeta: Ponto = {
    x: MARGEM_LATERAL + (atividades.length - 1) * ESPACAMENTO_NO + 90,
    y: Y_CENTRO,
  };
  const pontosCompletos = [pontoInicio, ...pontosNos, pontoMeta];
  const larguraTotal = pontoMeta.x + 50;

  const fracaoProgresso = usuario.atividadesConcluidas.length / atividades.length;
  const posicaoAvatar = calcularPosicaoAvatar(pontosCompletos, fracaoProgresso);
  const caminhoD = gerarCaminhoSuave(pontosCompletos);

  useEffect(() => {
    if (!containerRef.current) return;
    const alvo = Math.max(0, posicaoAvatar.x - containerRef.current.clientWidth / 2);
    containerRef.current.scrollTo({ left: alvo, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50
                 rounded-2xl shadow-inner overflow-x-auto overflow-y-hidden"
    >
      {/* Fundo decorativo: sol, nuvens e folhas — tema sustentabilidade */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2 right-6 w-14 h-14 rounded-full bg-amber-200/70 blur-[2px]" />
        <div className="absolute top-4 left-16 w-16 h-6 bg-white/80 rounded-full blur-[1px]" />
        <div className="absolute top-10 left-64 w-10 h-4 bg-white/80 rounded-full blur-[1px]" />
        <div className="absolute bottom-3 left-40 w-20 h-6 bg-white/70 rounded-full blur-[1px]" />
        <div className="absolute top-6 left-[480px] w-14 h-5 bg-white/80 rounded-full blur-[1px]" />
        <div className="absolute bottom-6 left-[620px] w-16 h-6 bg-white/70 rounded-full blur-[1px]" />
      </div>

      <svg
        width={larguraTotal}
        height={ALTURA_SVG}
        viewBox={`0 0 ${larguraTotal} ${ALTURA_SVG}`}
        role="img"
        aria-label="Mapa horizontal da trilha de desafios, estilo tabuleiro"
        className="block relative"
      >
        {/* Sombra da estrada (dá profundidade) */}
        <path
          d={caminhoD}
          fill="none"
          stroke="#0f172a"
          strokeOpacity="0.12"
          strokeWidth="34"
          strokeLinecap="round"
          transform="translate(0, 4)"
        />
        {/* Estrada/faixa principal — grossa, como uma rota de tabuleiro */}
        <path
          d={caminhoD}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="30"
          strokeLinecap="round"
        />
        <path
          d={caminhoD}
          fill="none"
          stroke="#bae6fd"
          strokeWidth="22"
          strokeLinecap="round"
        />
        {/* Linha central tracejada animada — "correndo" pela estrada */}
        <path
          d={caminhoD}
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 14"
          className="animate-dash-flow"
        />

        {/* Bandeira de meta */}
        <g transform={`translate(${pontoMeta.x}, ${pontoMeta.y})`}>
          <line x1="0" y1="-34" x2="0" y2="22" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
          <path d="M 0 -34 L 26 -25 L 0 -16 Z" className="fill-amber-400" />
          <circle cx="0" cy="22" r="4" className="fill-blue-700" />
          <text x="0" y="42" textAnchor="middle" className="fill-blue-800 text-[10px] font-extrabold">
            META
          </text>
        </g>

        {/* Início */}
        <g transform={`translate(${pontoInicio.x}, ${pontoInicio.y})`}>
          <circle r="10" className="fill-blue-700" />
          <text y="4" textAnchor="middle" className="fill-white text-[10px] font-bold">
            ▶
          </text>
          <text y="28" textAnchor="middle" className="fill-blue-800 text-[9px] font-bold">
            INÍCIO
          </text>
        </g>

        {/* Casas numeradas — estilo tabuleiro, com leve rotação orgânica */}
        {atividades.map((atividade, indice) => {
          const ponto = pontosNos[indice];
          const status = statusNo(atividade, usuario);
          const cores = CORES_CASA[status];
          const selecionado = atividadeSelecionada === atividade.id;
          const rotacao = ROTACOES[indice % ROTACOES.length];
          const meia = TAMANHO_CASA / 2;

          return (
            <g
              key={atividade.id}
              onClick={() => onSelecionar(atividade.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Abrir detalhes de ${atividade.nome}, casa ${indice + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelecionar(atividade.id);
              }}
            >
              {/* Anel pulsante em desafios ainda disponíveis */}
              {status === "disponivel" && (
                <circle
                  cx={ponto.x}
                  cy={ponto.y}
                  r={meia + 10}
                  className="fill-none stroke-blue-300 animate-pulse-no"
                  strokeWidth="2.5"
                />
              )}

