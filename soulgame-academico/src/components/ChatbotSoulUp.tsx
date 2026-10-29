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
      {aberto && (
        <div
          role="dialog"
          aria-label="Assistente SoulUp"
          className="mb-3 w-80 max-w-[85vw] bg-white rounded-2xl shadow-2xl border border-slate-200
                     flex flex-col overflow-hidden animate-toast-in"
          style={{ height: "min(480px, 70vh)" }}
        >
          {/* Cabeçalho com o avatar do SoulUp */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-3 flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
              🌱
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-tight">Assistente SoulUp</p>
              <p className="text-[11px] text-blue-100 leading-tight">Suporte e dúvidas</p>
            </div>
            <button
              onClick={() => setAberto(false)}
              aria-label="Fechar chat"
              className="text-white/80 hover:text-white text-lg leading-none px-1"
            >
              ×
            </button>
          </div>

          {/* Lista de mensagens */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 bg-slate-50">
            {mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className={`flex ${mensagem.autor === "usuario" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                    mensagem.autor === "usuario"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white text-slate-700 shadow-sm rounded-bl-sm"
                  }`}
                >
                  {mensagem.texto}
                </div>
              </div>
            ))}
            <div ref={fimDaListaRef} />
          </div>

          {/* Sugestões rápidas — sempre visíveis, facilita quem não quer digitar */}
          <div className="px-3 pt-2 flex flex-wrap gap-1.5 bg-slate-50">
            {RESPOSTAS_CHATBOT.slice(0, 3).map((r) => (
              <button
                key={r.id}
