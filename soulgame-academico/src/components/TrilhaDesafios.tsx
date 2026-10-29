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
