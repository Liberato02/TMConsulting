export interface RespostaChatbot {
  id: string;
  pergunta: string; // texto do botão de sugestão
  palavrasChave: string[]; // usadas para casar com o texto livre do usuário
  resposta: string;
}

// Base de respostas do chatbot — regra simples por palavra-chave, sem
// depender de nenhum serviço externo de IA. Fácil de expandir: só
// adicionar um item novo aqui, sem mexer no componente.
export const RESPOSTAS_CHATBOT: RespostaChatbot[] = [
  {
    id: "pontos",
    pergunta: "Como funcionam os pontos?",
    palavrasChave: ["ponto", "pontos", "nivel", "nível", "xp"],
    resposta:
      "Cada atividade concluída soma pontos ao seu perfil. A cada 500 pontos, você sobe de nível. Cada ponto também vale R$ 0,009 — o saldo aparece no seu Painel.",
  },
  {
    id: "validacao",
    pergunta: "O que é uma chave de validação?",
    palavrasChave: ["chave", "validacao", "validação", "validador", "qr"],
    resposta:
      "É um código único emitido por uma instituição parceira (Soulhealth, Ecosoul, etc.) que confirma que você realmente cumpriu a atividade. Sem ela, atividades que exigem validação não são concluídas.",
  },
  {
    id: "indicacao",
    pergunta: "Como funciona o código de indicação?",
    palavrasChave: ["indicacao", "indicação", "codigo", "código", "multiplicador"],
    resposta:
      "Contas do tipo multiplicador (Soulfluencer, Soulbrain, Soulsport, Ecosoul) têm um código próprio. Quem se cadastra usando esse código faz o multiplicador ganhar o dobro dos pontos de cada atividade dessa pessoa.",
  },
  {
    id: "trilha",
    pergunta: "O que é a Trilha Soul?",
    palavrasChave: ["trilha", "mapa", "avatar"],
    resposta:
      "É o mapa visual dos seus desafios! Escolha uma data para cada atividade, acompanhe seu avatar subindo pela trilha, e receba lembretes no seu calendário.",
  },
  {
    id: "senha",
    pergunta: "Esqueci minha senha, e agora?",
    palavrasChave: ["senha", "esqueci", "login", "entrar"],
    resposta:
      "Por enquanto não temos recuperação automática de senha nesta versão de testes — fale com o time de suporte pelo e-mail tmconsulting.challenge@gmail.com.",
  },
  {
    id: "tipos-conta",
    pergunta: "Quais são os tipos de conta?",
    palavrasChave: ["tipo", "conta", "soulgamer", "soulhealth", "ecosoul"],
    resposta:
      "São 7: Soulgamer (jogador), Soulfluencer, Soulhealth, Soulsport, Soulbrain, Educasoul e Ecosoul — cada um com papéis diferentes de multiplicador e/ou validador. Você escolhe no cadastro.",
  },
];

export const RESPOSTA_PADRAO =
  "Não tenho certeza sobre isso ainda 🤔 Tenta perguntar sobre pontos, validação, indicação, trilha ou tipos de conta — ou toca em uma das sugestões abaixo.";

export function buscarRespostaPorTexto(texto: string): string {
  const textoNormalizado = texto.toLowerCase();
  const encontrada = RESPOSTAS_CHATBOT.find((r) =>
    r.palavrasChave.some((palavra) => textoNormalizado.includes(palavra))
  );
  return encontrada ? encontrada.resposta : RESPOSTA_PADRAO;
}
