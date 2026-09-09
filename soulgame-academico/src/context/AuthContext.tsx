import { useState, type ReactNode } from "react";
import { AuthContext } from "./authContextInstance";
import type {
  DadosCadastro,
  ResultadoAuth,
  Usuario,
  UsuarioArmazenado,
} from "../types";
import {
  atualizarUsuario,
  buscarUsuarioPorEmail,
  inserirUsuario,
  lerSessao,
  limparSessao,
  salvarSessao,
} from "../data/usuariosStorage";

const PONTOS_POR_NIVEL = 500;

// Remove a senha antes de expor o usuário para o restante da aplicação.
function paraUsuarioPublico(armazenado: UsuarioArmazenado): Usuario {
  const { senha: _senha, ...usuarioPublico } = armazenado;
  return usuarioPublico;
}

// Lê a sessão salva no localStorage (se houver) e já devolve o usuário
// pronto. Como localStorage é síncrono, isso roda direto na
// inicialização do estado — nenhum useEffect necessário, nenhum
// "piscar" de tela de carregamento à toa.
function restaurarUsuarioDaSessao(): Usuario | null {
  const emailSessao = lerSessao();
  if (!emailSessao) return null;

  const encontrado = buscarUsuarioPorEmail(emailSessao);
  return encontrado ? paraUsuarioPublico(encontrado) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(restaurarUsuarioDaSessao);
  const [carregando, setCarregando] = useState(false);

  async function login(email: string, senha: string): Promise<ResultadoAuth> {
    setCarregando(true);

    const encontrado = buscarUsuarioPorEmail(email);

    if (!encontrado) {
      setCarregando(false);
      return { sucesso: false, mensagem: "Não existe conta com esse e-mail." };
    }

    // TODO: em produção, comparar hash de senha (ex: bcrypt), nunca texto puro.
    if (encontrado.senha !== senha) {
      setCarregando(false);
      return { sucesso: false, mensagem: "Senha incorreta." };
    }

    salvarSessao(encontrado.email);
    setUsuario(paraUsuarioPublico(encontrado));
    setCarregando(false);
    return { sucesso: true };
  }

  async function cadastrar(dados: DadosCadastro): Promise<ResultadoAuth> {
    setCarregando(true);

    if (buscarUsuarioPorEmail(dados.email)) {
      setCarregando(false);
      return { sucesso: false, mensagem: "Já existe uma conta com esse e-mail." };
    }

    const novoUsuario: UsuarioArmazenado = {
      id: crypto.randomUUID(),
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      telefone: dados.telefone,
      dataNascimento: dados.dataNascimento,
      cidade: dados.cidade,
      estado: dados.estado,
      tipo: dados.tipo,
      pontos: 0,
      nivel: 1,
      streakDias: 1,
      atividadesConcluidas: [],
    };

    inserirUsuario(novoUsuario);
    salvarSessao(novoUsuario.email);
    setUsuario(paraUsuarioPublico(novoUsuario));
    setCarregando(false);
    return { sucesso: true };
  }

  function logout() {
    limparSessao();
    setUsuario(null);
  }

  // Marca uma atividade como concluída, soma pontos, recalcula o nível,
  // e persiste a mudança no "banco" (localStorage).
  function concluirAtividade(idAtividade: string, pontos: number) {
    setUsuario((atual) => {
      if (!atual) return atual;
      if (atual.atividadesConcluidas.includes(idAtividade)) return atual;

      const novosPontos = atual.pontos + pontos;
      const novoNivel = Math.floor(novosPontos / PONTOS_POR_NIVEL) + 1;

      const atualizado: Usuario = {
        ...atual,
        pontos: novosPontos,
        nivel: novoNivel,
        atividadesConcluidas: [...atual.atividadesConcluidas, idAtividade],
      };

      const registroCompleto = buscarUsuarioPorEmail(atual.email);
      if (registroCompleto) {
        atualizarUsuario({ ...registroCompleto, ...atualizado });
      }

      return atualizado;
    });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, login, cadastrar, logout, concluirAtividade, carregando }}
    >
      {children}
    </AuthContext.Provider>
  );
}
