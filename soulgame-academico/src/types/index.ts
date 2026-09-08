// Tipo de usuário: define o que cada papel pode acessar (RBAC simples)
export type TipoUsuario = "usuario" | "admin";

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
}

export interface ResultadoAuth {
  sucesso: boolean;
  mensagem?: string;
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
}

export interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, senha: string) => Promise<ResultadoAuth>;
  cadastrar: (dados: DadosCadastro) => Promise<ResultadoAuth>;
  logout: () => void;
  concluirAtividade: (idAtividade: string, pontos: number) => void;
  carregando: boolean;
}
