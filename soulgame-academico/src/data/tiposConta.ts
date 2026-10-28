import type { TipoConta } from "../types";

// Config central dos 7 tipos de conta do SoulUp. Cada tipo carrega suas
// capacidades (multiplicador/validador) como dados, não como lógica
// espalhada — o mesmo padrão já usado em data/atividades.ts.
//
// - multiplicador: quando alguém se cadastra usando o código de indicação
//   dessa conta, ELA (a conta multiplicadora) recebe o dobro dos pontos
//   que a pessoa indicada gerar em atividades.
// - validador: essa conta pode gerar chaves únicas e não-transferíveis
//   para confirmar que um Soulgamer realmente cumpriu uma atividade.
export interface DefinicaoTipoConta {
  tipo: TipoConta;
  rotulo: string;
  descricao: string;
  multiplicador: boolean;
  validador: boolean;
}

export const TIPOS_CONTA: DefinicaoTipoConta[] = [
  {
    tipo: "soulgamer",
    rotulo: "Soulgamer",
    descricao: "Quero jogar, participar dos desafios e da rede social.",
    multiplicador: false,
    validador: false,
  },
  {
    tipo: "soulfluencer",
    rotulo: "Soulfluencer",
    descricao: "Sou influenciador/produtor de conteúdo e quero divulgar o SoulUp.",
    multiplicador: true,
    validador: false,
  },
  {
    tipo: "soulhealth",
    rotulo: "Soulhealth",
    descricao: "Instituição de saúde, banco de sangue, albergue ou casa de doações.",
    multiplicador: false,
    validador: true,
  },
  {
    tipo: "soulsport",
    rotulo: "Soulsport",
    descricao: "Organizo eventos esportivos em grupo (pedalada, yoga, corrida, etc).",
    multiplicador: true,
    validador: true,
  },
  {
    tipo: "soulbrain",
    rotulo: "Soulbrain",
    descricao: "Promovo ideias, cursos ou palestras de impacto social/econômico.",
    multiplicador: true,
    validador: false,
  },
  {
    tipo: "educasoul",
    rotulo: "Educasoul",
    descricao: "Instituição de educação com cursos promocionais ou graduações.",
    multiplicador: false,
    validador: true,
  },
  {
    tipo: "ecosoul",
    rotulo: "Ecosoul",
    descricao: "Empresa recicladora que recebe e valida atividades de reciclagem.",
    multiplicador: true,
    validador: true,
  },
];

export function buscarDefinicaoTipoConta(tipo: TipoConta): DefinicaoTipoConta {
  const definicao = TIPOS_CONTA.find((t) => t.tipo === tipo);
  // Nunca lança erro: um tipo desconhecido (ex: conta de teste criada
  // antes dos 7 tipos existirem) cai no padrão "soulgamer" — sem
  // capacidades especiais — em vez de derrubar a aplicação inteira.
  return definicao ?? TIPOS_CONTA[0];
}

export function ehMultiplicador(tipo: TipoConta): boolean {
  return buscarDefinicaoTipoConta(tipo).multiplicador;
}

export function ehValidador(tipo: TipoConta): boolean {
  return buscarDefinicaoTipoConta(tipo).validador;
}
