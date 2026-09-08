import { useState } from "react";

const PERGUNTAS = [
  {
    pergunta: "O que é o SoulGame?",
    resposta:
      "É uma plataforma que gamifica ações de impacto social e ambiental, como doação de sangue, reciclagem e campanhas sociais, transformando-as em desafios com pontos e níveis.",
  },
  {
    pergunta: "Preciso pagar para usar?",
    resposta: "Não. O cadastro e o uso da plataforma são gratuitos.",
  },
  {
    pergunta: "Como funcionam os pontos?",
    resposta:
      "Cada atividade concluída soma pontos ao seu perfil. A cada 500 pontos, você sobe de nível. Além disso, cada ponto equivale a R$ 0,009 — o saldo em reais é exibido no seu painel de desafios.",
  },
  {
    pergunta: "Qual a diferença entre conta de usuário e conta do time de cadastro?",
    resposta:
      "A conta de usuário participa dos desafios e acumula pontos. A conta do time de cadastro (admin) é responsável por manter a base de atividades, campanhas e campeonatos atualizada.",
  },
  {
    pergunta: "Meus dados estão seguros?",
    resposta:
      "Sim. Os dados de autenticação são tratados pela API do backend do projeto, seguindo boas práticas de segurança da informação.",
  },
];

export function Faq() {
  const [abertoIndice, setAbertoIndice] = useState<number | null>(0);

  return (
    <main aria-label="Perguntas frequentes" className="flex-1 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Perguntas frequentes
        </h1>

        <div className="space-y-3">
          {PERGUNTAS.map((item, indice) => {
            const aberto = abertoIndice === indice;
            return (
              <div key={item.pergunta} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setAbertoIndice(aberto ? null : indice)}
                  aria-expanded={aberto}
                  className="w-full flex items-center justify-between text-left px-5 py-4 font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  {item.pergunta}
                  <span className="text-blue-600 text-xl leading-none">
                    {aberto ? "−" : "+"}
                  </span>
                </button>
                {aberto && (
                  <p className="px-5 pb-4 text-sm text-slate-500">{item.resposta}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}


