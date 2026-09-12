import type { UsuarioArmazenado } from "../types";

// Simula um banco de dados de usuários usando localStorage — critério de
// avaliação da disciplina (persistência com localStorage). Na versão
// SoulUp/MVP, isso é substituído por chamadas reais à API Java.
const CHAVE_USUARIOS = "soulgame:usuarios";
const CHAVE_SESSAO = "soulgame:sessao";

// Defesa contra dado corrompido: se por qualquer motivo
// atividadesConcluidas não vier como array (ex: editado manualmente no
// DevTools, ou vindo de uma versão antiga do app), isso travava TODOS
// os botões de atividade daquele usuário — .includes() num valor que
// não é array pode se comportar de forma inesperada. Aqui garantimos
// que sempre volta um array de verdade.
function normalizarUsuario(usuario: UsuarioArmazenado): UsuarioArmazenado {
    return {
        ...usuario,
        atividadesConcluidas: Array.isArray(usuario.atividadesConcluidas)
            ? usuario.atividadesConcluidas
            : [],
    };
}

function lerUsuarios(): UsuarioArmazenado[] {
    try {
        const bruto = localStorage.getItem(CHAVE_USUARIOS);
        const usuarios = bruto ? (JSON.parse(bruto) as UsuarioArmazenado[]) : [];
        return usuarios.map(normalizarUsuario);
    } catch {
        // localStorage indisponível (ex: modo privado) ou JSON corrompido
        return [];
    }
}

function salvarUsuarios(usuarios: UsuarioArmazenado[]): void {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

export function buscarUsuarioPorEmail(email: string): UsuarioArmazenado | undefined {
    return lerUsuarios().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function inserirUsuario(usuario: UsuarioArmazenado): void {
    const usuarios = lerUsuarios();
    usuarios.push(usuario);
    salvarUsuarios(usuarios);
}

export function atualizarUsuario(usuario: UsuarioArmazenado): void {
    const usuarios = lerUsuarios().map((u) => (u.id === usuario.id ? usuario : u));
    salvarUsuarios(usuarios);
}

// Sessão: guarda só o e-mail de quem está logado, em localStorage,
// para sobreviver a um F5 na página.
export function salvarSessao(email: string): void {
    localStorage.setItem(CHAVE_SESSAO, email);
}

export function lerSessao(): string | null {
    return localStorage.getItem(CHAVE_SESSAO);
}

export function limparSessao(): void {
    localStorage.removeItem(CHAVE_SESSAO);
}

