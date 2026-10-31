import type { Usuario, UsuarioArmazenado } from "../types";
import {
  cadastrarUsuarioApi,
  loginApi,
  listarRankingApi,
  listarHistoricoApi,
  listarDesafiosAgendadosApi,
  atualizarPerfilApi,
  ErroApi,
  type UsuarioApi,
} from "../api/clienteApi";

// Sessão: continua em localStorage (só guarda o e-mail de quem está
// logado, pra sobreviver a um F5) — isso não precisa de API, é só
// conveniência do navegador local.
const CHAVE_SESSAO = "soulgame:sessao";

export function salvarSessao(email: string): void {
  localStorage.setItem(CHAVE_SESSAO, email);
}

export function lerSessao(): string | null {
  return localStorage.getItem(CHAVE_SESSAO);
}

export function limparSessao(): void {
  localStorage.removeItem(CHAVE_SESSAO);
}

// Converte o formato "magro" da API (usuarioApi) para o formato completo
// que o resto do app espera (Usuario), buscando histórico e prazos
// agendados em paralelo. É aqui que a "montagem" do usuário completo
// acontece — o resto do app nunca precisa saber que isso veio de 3
// chamadas de API diferentes.
export async function montarUsuarioCompleto(usuarioApi: UsuarioApi): Promise<Usuario> {
  const [respostaHistorico, respostaAgendados] = await Promise.all([
    listarHistoricoApi(usuarioApi.id).catch(() => ({ historico: [] })),
    listarDesafiosAgendadosApi(usuarioApi.id).catch(() => ({ desafiosAgendados: [] })),
  ]);

  const atividadesConcluidas = respostaHistorico.historico
    .map((item) => item.acaoSlug)
    .filter((slug): slug is string => slug !== null);

  const historicoConclusoes: Record<string, string> = {};
  for (const item of respostaHistorico.historico) {
    if (item.acaoSlug) historicoConclusoes[item.acaoSlug] = item.dataHora;
  }

  const prazosDesafios: Record<string, string> = {};
  for (const agendamento of respostaAgendados.desafiosAgendados) {
    prazosDesafios[agendamento.acaoSlug] = agendamento.prazo;
  }

  return {
    id: usuarioApi.id,
    nome: usuarioApi.nome,
    email: usuarioApi.email,
    telefone: usuarioApi.telefone,
    dataNascimento: usuarioApi.dataNascimento ?? "",
    cidade: usuarioApi.cidade,
    estado: usuarioApi.estado,
    tipo: usuarioApi.tipo as Usuario["tipo"],
    pontos: usuarioApi.totalPontos,
    nivel: usuarioApi.nivel,
    streakDias: usuarioApi.streakDias,
    atividadesConcluidas,
    historicoConclusoes,
    codigoIndicacao: usuarioApi.codigoIndicacao,
    indicadoPorCodigo: usuarioApi.indicadoPorCodigo,
    avatarTipo: usuarioApi.avatarTipo as Usuario["avatarTipo"],
    avatarPersonagemId: usuarioApi.avatarPersonagemId,
    avatarFotoDataUrl: usuarioApi.avatarFotoBase64,
    prazosDesafios,
  };
}

export async function cadastrarUsuario(dados: {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string;
  cidade: string;
  estado: string;
  tipo: string;
  codigoIndicacao?: string;
}): Promise<{ usuario?: Usuario; erro?: string }> {
  try {
    const usuarioApi = await cadastrarUsuarioApi({
      ...dados,
      indicadoPorCodigo: dados.codigoIndicacao,
    });
    const usuario = await montarUsuarioCompleto(usuarioApi);
    return { usuario };
  } catch (erro) {
    return { erro: erro instanceof ErroApi ? erro.message : "Erro inesperado ao cadastrar." };
  }
}

export async function autenticar(email: string, senha: string): Promise<{ usuario?: Usuario; erro?: string }> {
  try {
    const usuarioApi = await loginApi(email, senha);
    const usuario = await montarUsuarioCompleto(usuarioApi);
    return { usuario };
  } catch (erro) {
    return { erro: erro instanceof ErroApi ? erro.message : "Erro inesperado ao entrar." };
  }
}

// Se a API falhar, o erro SOBE para quem chamou (Ranking e Perfil público),
// que decide mostrar a mensagem de erro. Antes, o erro era engolido e a tela
// dizia "ainda não há usuários", o que enganava a pessoa.
export async function listarRanking(): Promise<Array<Pick<Usuario, "id" | "nome" | "pontos" | "nivel" | "tipo">>> {
  const resposta = await listarRankingApi();
  return resposta.ranking
    .filter((u) => u.tipo !== "admin")
    .map((u) => ({
      id: u.id,
      nome: u.nome,
      pontos: u.totalPontos,
      nivel: u.nivel,
      tipo: u.tipo as Usuario["tipo"],
    }));
}

// Persiste alterações de perfil/avatar. "Fire and forget" na prática —
// quem chama já atualizou o estado local otimisticamente, isso só
// sincroniza com o banco em segundo plano.
export async function sincronizarPerfil(
  usuarioId: string,
  dados: Partial<{
    nome: string;
    telefone: string;
    cidade: string;
    estado: string;
    avatarTipo: string;
    avatarPersonagemId: string;
    avatarFotoBase64: string;
  }>
): Promise<void> {
  try {
    await atualizarPerfilApi(usuarioId, dados);
  } catch (erro) {
    console.error("Falha ao sincronizar perfil com o servidor:", erro);
  }
}

// Mantido só por compatibilidade de tipos em quem ainda importa
// UsuarioArmazenado — não é mais usado para persistência de verdade.
export type { UsuarioArmazenado };
