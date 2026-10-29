import type { ChaveValidacao } from "../types";

// "Banco" de chaves de validação em localStorage. Por padrão, uma chave
// é de uso único e não-transferível (ex: instituição de saúde validando
// UMA doação). Mas pode ter limiteUsos > 1 — é o caso das comunidades
// Soulsport, onde UM código é divulgado para todos os participantes de
// um evento, e cada pessoa resgata a própria vez (mas o código em si
// não se esgota depois do primeiro uso).
const CHAVE_ARMAZENAMENTO = "soulup:chaves-validacao";

function gerarCodigo(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
}

function lerChaves(): ChaveValidacao[] {
  try {
    const bruto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    const chaves = bruto ? (JSON.parse(bruto) as ChaveValidacao[]) : [];
    // Blinda chaves salvas no formato antigo (usada/usadoPorId).
    return chaves.map((c) => ({
      ...c,
      limiteUsos: c.limiteUsos ?? 1,
      usadoPorIds: c.usadoPorIds ?? [],
    }));
  } catch {
    return [];
  }
}

function salvarChaves(chaves: ChaveValidacao[]): void {
  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(chaves));
}

export function gerarChaveValidacao(
  atividadeId: string,
  instituicaoId: string,
  instituicaoNome: string,
  limiteUsos = 1
): ChaveValidacao {
  const nova: ChaveValidacao = {
    codigo: gerarCodigo(),
    atividadeId,
    instituicaoId,
    instituicaoNome,
    limiteUsos,
    usadoPorIds: [],
    criadaEm: new Date().toISOString(),
  };

  const chaves = lerChaves();
  chaves.push(nova);
  salvarChaves(chaves);
  return nova;
}

export function listarChavesPorInstituicao(instituicaoId: string): ChaveValidacao[] {
  return lerChaves()
    .filter((c) => c.instituicaoId === instituicaoId)
    .sort((a, b) => b.criadaEm.localeCompare(a.criadaEm));
}

export function resgatarChave(
  codigo: string,
  atividadeId: string,
  usuarioId: string
): { valida: boolean; mensagem?: string } {
  const chaves = lerChaves();
  const chave = chaves.find((c) => c.codigo === codigo.trim().toUpperCase());

  if (!chave) {
    return { valida: false, mensagem: "Chave de validação não encontrada." };
  }
  if (chave.atividadeId !== atividadeId) {
    return { valida: false, mensagem: "Essa chave não é válida para esta atividade." };
  }
  if (chave.usadoPorIds.includes(usuarioId)) {
    return { valida: false, mensagem: "Você já usou essa chave." };
  }
  if (chave.usadoPorIds.length >= chave.limiteUsos) {
    return { valida: false, mensagem: "Essa chave já atingiu o limite de usos." };
  }

  chave.usadoPorIds.push(usuarioId);
  salvarChaves(chaves);
  return { valida: true };
}
