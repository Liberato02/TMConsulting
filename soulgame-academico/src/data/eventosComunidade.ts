export interface EventoComunidade {
  id: string;
  organizadorId: string;
  nome: string;
  data: string; // AAAA-MM-DD
  local: string;
  descricao: string;
  codigoChave: string; // código de validação vinculado (usos múltiplos)
  criadoEm: string;
}

const CHAVE_ARMAZENAMENTO = "soulup:eventos-comunidade";

function lerEventos(): EventoComunidade[] {
  try {
    const bruto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    return bruto ? (JSON.parse(bruto) as EventoComunidade[]) : [];
  } catch {
    return [];
  }
}

function salvarEventos(eventos: EventoComunidade[]): void {
  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(eventos));
}

export function criarEvento(dados: Omit<EventoComunidade, "id" | "criadoEm">): EventoComunidade {
  const novo: EventoComunidade = {
    ...dados,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  };
  const eventos = lerEventos();
  eventos.push(novo);
  salvarEventos(eventos);
  return novo;
}

export function listarEventosPorOrganizador(organizadorId: string): EventoComunidade[] {
  return lerEventos()
    .filter((e) => e.organizadorId === organizadorId)
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}
