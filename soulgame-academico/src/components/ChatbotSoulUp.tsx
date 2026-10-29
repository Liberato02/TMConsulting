import { useEffect, useRef, useState } from "react";
import { RESPOSTAS_CHATBOT, buscarRespostaPorTexto } from "../data/chatbotRespostas";

interface Mensagem {
  id: string;
  autor: "bot" | "usuario";
  texto: string;
}

const MENSAGEM_BOAS_VINDAS: Mensagem = {
  id: "boas-vindas",
  autor: "bot",
  texto:
    "Oi! Eu sou o assistente SoulUp 🌱 Posso ajudar com dúvidas sobre pontos, validação, indicação e a Trilha Soul. Escolhe uma pergunta abaixo ou digita a sua!",
};

export function ChatbotSoulUp() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([MENSAGEM_BOAS_VINDAS]);
  const [textoDigitado, setTextoDigitado] = useState("");
  const fimDaListaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fimDaListaRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, aberto]);

  function enviarPergunta(pergunta: string) {
    if (!pergunta.trim()) return;

    const mensagemUsuario: Mensagem = {
      id: crypto.randomUUID(),
      autor: "usuario",
      texto: pergunta,
    };

    const resposta = buscarRespostaPorTexto(pergunta);
    const mensagemBot: Mensagem = {
      id: crypto.randomUUID(),
      autor: "bot",
      texto: resposta,
    };

    setMensagens((atual) => [...atual, mensagemUsuario, mensagemBot]);
    setTextoDigitado("");
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
