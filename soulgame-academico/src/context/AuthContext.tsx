import { useState, type ReactNode } from "react";
import type { DadosCadastro, ResultadoAuth, Usuario } from "../types";
import { AuthContext } from "./authContextInstance";
import {
  autenticar,
  cadastrarUsuario,
  limparSessao,
  salvarSessao,
  sincronizarPerfil,
} from "../data/usuariosStorage";
import { registrarAcaoApi, ErroApi } from "../api/clienteApi";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Inicialização direta (lazy initializer, sem useEffect): como ainda
  // não existe autenticação por token no back-end, não dá pra restaurar
  // a sessão com segurança só a partir do e-mail salvo (não temos a
  // senha, e chamar login de novo sem ela seria inseguro). Então só
  // limpamos qualquer sessão antiga do navegador — login volta a ser
  // exigido a cada F5, até existir um token de verdade.
  const [carregando, setCarregando] = useState(() => {
    limparSessao();
    return false;
  });

  async function login(email: string, senha: string): Promise<ResultadoAuth> {
    setCarregando(true);
    const { usuario: encontrado, erro } = await autenticar(email, senha);
    setCarregando(false);

    if (!encontrado) {
      return { sucesso: false, mensagem: erro ?? "E-mail ou senha incorretos." };
    }

    salvarSessao(encontrado.email);
    setUsuario(encontrado);
    return { sucesso: true };
  }

  async function cadastrar(dados: DadosCadastro): Promise<ResultadoAuth> {
    setCarregando(true);
    const { usuario: novoUsuario, erro } = await cadastrarUsuario(dados);
    setCarregando(false);

    if (!novoUsuario) {
      return { sucesso: false, mensagem: erro ?? "Não foi possível criar a conta." };
    }

    salvarSessao(novoUsuario.email);
    setUsuario(novoUsuario);
    return { sucesso: true };
  }

  function logout() {
    limparSessao();
    setUsuario(null);
  }

  // A evidência (foto) é obrigatória. O servidor decide o status:
  //  - VALIDADO : a IA aprovou -> pontos creditados e atividade concluída;
  //  - PENDENTE : IA indisponível ou em dúvida -> revisão humana, sem pontos;
  //  - REJEITADO: a foto não comprova a atividade -> sem pontos.
  async function concluirAtividade(
    idAtividade: string,
    imagemBase64Evidencia: string,
    tipoEvidencia: string
  ): Promise<ResultadoAuth> {
    if (!usuario) return { sucesso: false, mensagem: "Você precisa estar logado." };
    if (usuario.atividadesConcluidas.includes(idAtividade)) {
      return { sucesso: false, mensagem: "Atividade já concluída." };
    }
    if (!imagemBase64Evidencia) {
      return { sucesso: false, mensagem: "Anexe uma foto que comprove a atividade." };
    }

    try {
      const resposta = await registrarAcaoApi(
        usuario.id,
        idAtividade,
        imagemBase64Evidencia,
        tipoEvidencia
      );
      const status = resposta.registro.statusValidacao;

      if (status === "REJEITADO") {
        return {
          sucesso: false,
          mensagem: `A IA não validou a evidência: "${resposta.veredito_ia?.motivo ?? "sem motivo informado"}"`,
        };
      }

      if (status !== "VALIDADO") {
        const motivo = resposta.veredito_ia?.indisponivel
          ? "A IA está indisponível no momento"
          : "A IA ficou em dúvida";

        return {
          sucesso: true,
          pendente: true,
          mensagem: `${motivo}. Sua evidência foi enviada para revisão e os pontos entram quando for aprovada.`,
        };
      }

      const { [idAtividade]: _removido, ...prazosRestantes } =
        usuario.prazosDesafios;

      setUsuario({
        ...usuario,
        pontos: resposta.usuario.totalPontos,
        nivel: resposta.usuario.nivel,
        atividadesConcluidas: [
          ...usuario.atividadesConcluidas,
          idAtividade,
        ],
        historicoConclusoes: {
          ...usuario.historicoConclusoes,
          [idAtividade]: new Date().toISOString(),
        },
        prazosDesafios: prazosRestantes,
      });

      const conquistasDesbloqueadas =
        resposta.conquistas_desbloqueadas?.map((c) => ({
          nome: c.nome,
          descricao: c.descricao,
          icone: c.icone,
        }));

      return { sucesso: true, conquistasDesbloqueadas };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem:
          erro instanceof ErroApi
            ? erro.message
            : "Não foi possível registrar a atividade.",
      };
    }
  }

  function definirAvatarPersonagem(personagemId: string) {
    setUsuario((atual) => {
      if (!atual) return atual;

      const atualizado: Usuario = {
        ...atual,
        avatarTipo: "personagem",
        avatarPersonagemId: personagemId,
      };

      sincronizarPerfil(atual.id, {
        avatarTipo: "personagem",
        avatarPersonagemId: personagemId,
      });

      return atualizado;
    });
  }

  function definirAvatarFoto(dataUrl: string) {
    setUsuario((atual) => {
      if (!atual) return atual;

      const atualizado: Usuario = {
        ...atual,
        avatarTipo: "foto",
        avatarFotoDataUrl: dataUrl,
      };

      sincronizarPerfil(atual.id, {
        avatarTipo: "foto",
        avatarFotoBase64: dataUrl,
      });

      return atualizado;
    });
  }

  // Prazo de desafio continua só local por enquanto — a rota
  // /api/desafios-agendados já existe no back-end, mas a troca
  // completa aqui pode ser feita numa próxima iteração sem afetar
  // o restante do fluxo (o campo prazosDesafios já é lido via API
  // em montarUsuarioCompleto, então já reflete o servidor no login).
  function definirPrazoDesafio(
    idAtividade: string,
    prazoISO: string
  ) {
    setUsuario((atual) => {
      if (!atual) return atual;

      return {
        ...atual,
        prazosDesafios: {
          ...atual.prazosDesafios,
          [idAtividade]: prazoISO,
        },
      };
    });
  }

  function atualizarPerfil(dados: {
    nome: string;
    telefone: string;
    cidade: string;
    estado: string;
  }) {
    setUsuario((atual) => {
      if (!atual) return atual;

      const atualizado: Usuario = {
        ...atual,
        ...dados,
      };

      sincronizarPerfil(atual.id, dados);

      return atualizado;
    });
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        cadastrar,
        logout,
        concluirAtividade,
        definirAvatarPersonagem,
        definirAvatarFoto,
        definirPrazoDesafio,
        atualizarPerfil,
        carregando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}