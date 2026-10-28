// Os 7 tipos de conta públicos do ecossistema SoulUp.
export type TipoConta =
  | "soulgamer"
  | "soulfluencer"
  | "soulhealth"
  | "soulsport"
  | "soulbrain"
  | "educasoul"
  | "ecosoul";

// TipoUsuario amplia TipoConta com "admin" — o time interno que mantém
// a base de atividades/campanhas. "admin" não é um tipo de conta pública
// (não faz parte do ecossistema de usuários finais), por isso fica à parte.
export type TipoUsuario = TipoConta | "admin";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string; // formato AAAA-MM-DD
  cidade: string;
  estado: string; // sigla, ex: "SP"
  tipo: TipoUsuario;
  pontos: number;
  nivel: number;
  streakDias: number;
  atividadesConcluidas: string[]; // ids das Atividade já concluídas
  historicoConclusoes: Record<string, string>; // id da atividade -> data/hora ISO de conclusão

  // Programa de indicação (papel "multiplicador"):
  codigoIndicacao?: string; // código próprio, só existe se tipo é multiplicador
  indicadoPorCodigo?: string; // código que essa pessoa usou ao se cadastrar

  // Avatar na trilha: OU um personagem pronto, OU a própria foto.
  avatarTipo: "personagem" | "foto";
  avatarPersonagemId?: string; // id de um PERSONAGENS_AVATAR
  avatarFotoDataUrl?: string; // imagem enviada pelo usuário (base64, redimensionada)

  // Prazos escolhidos pelo usuário para cada desafio "iniciado" na
  // trilha (exceto doação de sangue, que não tem prazo por não poder
  // ser repetida). Chave = id da atividade, valor = prazo em ISO date.
  prazosDesafios: Record<string, string>;
}

// Registro salvo no "banco" (localStorage) — inclui a senha, que NUNCA
// deve ser exposta pelo restante da aplicação (por isso é um tipo à parte).
export interface UsuarioArmazenado extends Usuario {
  senha: string;
}

// Cada ação de impacto vem da lista oficial das diretrizes do projeto
// (o que o backend Java vai gerenciar). Isso é a "config tipada" que
// decidimos: para adicionar uma ação nova, só adiciona um item aqui,
// nenhuma lógica de if/else precisa mudar.
export interface Atividade {
  id: string;
  nome: string;
  descricao: string;
  pontos: number;
  categoria: "saude" | "meio-ambiente" | "social";
  exigeValidacao: boolean; // true = precisa de chave gerada por um validador
}

// Chave única e não-transferível emitida por uma conta validadora
// (Soulhealth, Soulsport, Educasoul, Ecosoul) para confirmar que um
// Soulgamer cumpriu uma atividade específica.
export interface ChaveValidacao {
  codigo: string;
  atividadeId: string;
  instituicaoId: string; // id do usuário validador que emitiu
  instituicaoNome: string;
  limiteUsos: number; // 1 = padrão (não-transferível); >1 = chave de comunidade/evento
  usadoPorIds: string[]; // quem já resgatou — cada pessoa só resgata uma vez
  criadaEm: string; // ISO date
}

export interface ResultadoAuth {
  sucesso: boolean;
  mensagem?: string;
  /** Evidência recebida, mas aguardando revisão (sem pontos ainda). */
  pendente?: boolean;
  conquistasDesbloqueadas?: { nome: string; descricao: string; icone: string }[];
}

export interface DadosCadastro {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string;
  cidade: string;
  estado: string;
  tipo: TipoUsuario;
  codigoIndicacao?: string; // código de quem indicou, opcional
}

export interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<ResultadoAuth>;
  cadastrar: (dados: DadosCadastro) => Promise<ResultadoAuth>;
  logout: () => void;
  concluirAtividade: (
    idAtividade: string,
    imagemBase64Evidencia: string,
    tipoEvidencia: string
  ) => Promise<ResultadoAuth>;
  definirAvatarPersonagem: (personagemId: string) => void;
  definirAvatarFoto: (dataUrl: string) => void;
  definirPrazoDesafio: (idAtividade: string, prazoISO: string) => void;
  atualizarPerfil: (dados: { nome: string; telefone: string; cidade: string; estado: string }) => void;
  carregando: boolean;
}
