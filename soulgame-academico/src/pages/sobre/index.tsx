export function Sobre() {
  return (
    <main aria-label="Sobre o SoulGame" className="flex-1 px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Sobre o SoulGame</h1>

        <div className="space-y-6 text-slate-600 leading-relaxed">
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

        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {[
            { titulo: "React + Vite", descricao: "Interface rápida e componentizada" },
            { titulo: "TypeScript", descricao: "Tipagem segura em todo o projeto" },
            { titulo: "Tailwind CSS", descricao: "Design consistente e responsivo" },
          ].map((tec) => (
            <div key={tec.titulo} className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="font-semibold text-blue-800">{tec.titulo}</p>
              <p className="text-sm text-slate-500 mt-1">{tec.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
