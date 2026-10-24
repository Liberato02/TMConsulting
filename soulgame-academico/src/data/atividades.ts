import type { Atividade } from "../types";

// Lista oficial de ações de impacto definida nas diretrizes do projeto
// (o que o backend Java/DDD vai gerenciar via API).
// Pontuação provisória — ajustar quando a API real estiver disponível.
export const ATIVIDADES: Atividade[] = [
  {
    id: "doacao-sangue",
    nome: "Doação de Sangue",
    descricao: "Doe sangue e ajude a salvar vidas.",
    pontos: 500,
    categoria: "saude",
    exigeValidacao: true, // validado por uma conta Soulhealth
  },
  {
    id: "reciclagem",

    nome: "Doação para Cooperativas de Reciclagem",
    descricao: "Destine materiais recicláveis a cooperativas parceiras.",
    pontos: 100,
    categoria: "meio-ambiente",
    exigeValidacao: true, // validado por uma conta Ecosoul
  },
  {
    id: "cesta-basica",
    nome: "Kit Cestas Básicas",
        descricao: "Contribua com kits de cestas básicas para famílias.",
    pontos: 150,
    categoria: "social",
    exigeValidacao: true, // validado por uma conta Soulhealth
  },
  {
    id: "brecho-beneficente",
    nome: "Doação para Brechós Beneficentes",
        descricao: "Doe roupas e itens para brechós beneficentes.",
    pontos: 80,
    categoria: "social",
    exigeValidacao: true, // validado por uma conta Soulhealth
  },
  {
    id: "ancat",
    nome: "Contribuição para ANCAT",
    descricao: "Apoie a Associação Nacional dos Catadores de Materiais Recicláveis.",
    pontos: 120,
    categoria: "meio-ambiente",
    exigeValidacao: true, // validado por uma conta Ecosoul
  },
  {
    id: "casa-marta-maria",
    nome: "Doação de Kit Cestas para Casa Marta e Maria",
    descricao: "Contribua com cestas para a instituição Casa Marta e Maria.",
    pontos: 150,
    categoria: "social",
    exigeValidacao: true, // validado por uma conta Soulhealth
  },
  {
    id: "esporte-grupo",
    nome: "Atividade Esportiva em Grupo",
    descricao: "Participe de um evento esportivo coletivo (pedalada, yoga, corrida etc).",
    pontos: 90,
    categoria: "saude",
    exigeValidacao: true, // validado por uma conta Soulsport organizadora do evento
  },
];

export function buscarAtividadePorId(id: string): Atividade | undefined {
  return ATIVIDADES.find((atividade) => atividade.id === id);
}

export function calcularPontosTotais(idsRealizados: string[]): number {
  return idsRealizados.reduce((total, id) => {
        const atividade = buscarAtividadePorId(id);
    return total + (atividade?.pontos ?? 0);
  }, 0);
}