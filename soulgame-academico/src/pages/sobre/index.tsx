import { Card } from "../../components/Card";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

const VALORES = [
  {
    titulo: "Qualidade sobre atalhos",
    descricao:
      "Cada funcionalidade passa por testes automatizados, revisão de código e validação real antes de ser considerada pronta. Preferimos entregar menos, mas sólido.",
  },
  {
    titulo: "Colaboração de verdade",
    descricao:
      "Nenhuma decisão de arquitetura nasceu sozinha. Rotas, componentes e regras de negócio foram discutidos e revisados em equipe, do primeiro commit ao último.",
  },
  {
    titulo: "Impacto social genuíno",
    descricao:
      "O produto não gamifica por gamificar — cada ponto do SoulGame representa uma ação real de doação, reciclagem ou apoio social que já aconteceu.",
  },
  {
    titulo: "Aprendizado contínuo",
    descricao:
      "Tratamos cada dificuldade técnica como oportunidade: bugs de fuso horário, conflitos de merge e ajustes de acessibilidade viraram conhecimento real da equipe.",
  },
];

const TECNOLOGIAS = [
  { titulo: "React + Vite", descricao: "Interface rápida e componentizada" },
  { titulo: "TypeScript", descricao: "Tipagem segura em todo o projeto" },
  { titulo: "Tailwind CSS", descricao: "Design consistente e responsivo" },
];

export function Sobre() {
  useTituloDocumento("Sobre | SoulGame");

  return (
    <main aria-label="Sobre o SoulGame e a equipe TMConsulting" className="flex-1">
      {/* Cabeçalho com gradiente, mesmo padrão visual da Home */}
      <section className="bg-gradient-to-b from-blue-700 to-blue-600 text-white px-4 py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Sobre o SoulGame</h1>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Um produto acadêmico construído com padrão de entrega real — da
          arquitetura ao último detalhe de acessibilidade.
        </p>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-14">
        {/* Sobre o produto */}
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            O SoulGame nasceu do Challenge da FIAP em parceria com a SoulUp, com
            o objetivo de incentivar práticas sustentáveis e sociais através
            de mecânicas de gamificação simples, modernas e intuitivas.
          </p>
          <p>
            Assim como aplicativos de aprendizagem que usam pontos, níveis e
            sequências de dias para manter as pessoas engajadas, o SoulGame
            aplica essa mesma lógica a ações reais de impacto: doação de
            sangue, reciclagem, campanhas sociais e apoio a instituições
            parceiras.
          </p>
          <p>
            Cada ação registrada gera pontos, que acumulam para subir de
            nível — transformando o engajamento social em uma jornada visível
            e recompensadora.
          </p>
        </div>

        {/* Quem somos — TMConsulting, falado como equipe única */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Quem somos</h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              A <strong>TMConsulting</strong> é a equipe por trás do SoulGame:
              um grupo de estudantes de Análise e Desenvolvimento de Sistemas
              da FIAP que decidiu tratar este desafio acadêmico como um
              produto de verdade, não apenas como uma entrega de disciplina.
            </p>
            <p>
              Isso significou migrar toda a base de HTML/CSS/JS para uma
              aplicação React completa, escrever testes automatizados para
              proteger regras de negócio, corrigir bugs reais encontrados no
              caminho — de fuso horário a acessibilidade — e documentar cada
              decisão técnica, para que o projeto pudesse crescer de forma
              organizada entre cinco pessoas trabalhando ao mesmo tempo.
            </p>
            <p>
              Mais do que cumprir os requisitos do Challenge, a equipe se
              propôs a construir algo que resistisse a uma pergunta simples:
              "isso funcionaria numa empresa de verdade?" — e ajustou o
              projeto até a resposta ser sim.
            </p>
          </div>
        </div>

        {/* Missão e Visão, lado a lado */}
        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          <Card className="border-l-4 border-blue-600">
            <h3 className="font-bold text-blue-800 mb-2">Missão</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transformar desafios acadêmicos em soluções com padrão de
              mercado, entregando tecnologia que resolve problemas reais de
              forma simples, acessível e bem construída.
            </p>
          </Card>
          <Card className="border-l-4 border-teal-400">
            <h3 className="font-bold text-blue-800 mb-2">Visão</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ser reconhecida, mesmo em contexto acadêmico, pela qualidade de
              engenharia e pelo cuidado com quem usa o produto — tratando
              cada entrega como se fosse para um cliente real.
            </p>
          </Card>
        </div>

        {/* Valores */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Nossos valores</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {VALORES.map((valor) => (
              <Card key={valor.titulo} className="bg-blue-50 shadow-none">
                <h3 className="font-semibold text-blue-800 mb-1">{valor.titulo}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{valor.descricao}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tecnologias */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Tecnologias utilizadas
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {TECNOLOGIAS.map((tec) => (
              <div key={tec.titulo} className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="font-semibold text-blue-800">{tec.titulo}</p>
                <p className="text-sm text-slate-500 mt-1">{tec.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
