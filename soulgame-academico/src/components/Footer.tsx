import { Link } from "react-router-dom";

const LINKS_NAVEGACAO = [
  { rota: "/sobre", label: "Sobre a equipe" },
  { rota: "/faq", label: "FAQ" },
  { rota: "/contato", label: "Contato" },
];

export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer aria-label="Rodapé institucional" className="bg-blue-950 text-blue-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="text-lg font-bold text-white mb-2">SoulGame</p>
          <p className="text-blue-300">
            Gamificação de ações de impacto social e ambiental.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <p className="font-semibold text-white mb-2">Navegação</p>
          <ul className="space-y-1 text-blue-300">
            {LINKS_NAVEGACAO.map((link) => (
              <li key={link.rota}>
                <Link to={link.rota} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-semibold text-white mb-2">Projeto FIAP</p>
          <p className="text-blue-300">
            Desenvolvido para as Sprints 3 e 4 — Desenvolvimento de Software
            para Internet.
          </p>
        </div>
      </div>

      <div className="border-t border-blue-800 text-center text-xs text-blue-400 py-4">
        © {anoAtual} TMConsulting / SoulGame. Todos os direitos reservados.
      </div>
    </footer>
  );
}
