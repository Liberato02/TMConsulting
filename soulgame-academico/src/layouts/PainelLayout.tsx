import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ehValidador } from "../data/tiposConta";

interface ItemMenu {
  rota: string;
  icone: string;
  rotulo: string;
  exato?: boolean; // true = só fica "ativo" na rota exata
  visivel: boolean;
}

const itemBase =
  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap";
const itemInativo = "text-slate-600 hover:bg-slate-100";
const itemAtivo = "bg-blue-600 text-white";

export function PainelLayout() {
  const { usuario } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  if (!usuario) return null;

  const souValidador = ehValidador(usuario.tipo === "admin" ? "soulgamer" : usuario.tipo);

  // Menu guiado por dados (DRY): para criar um item novo, basta
  // acrescentar uma linha aqui, sem copiar bloco de JSX.
  const itensMenu: ItemMenu[] = [
    { rota: "/desafios", icone: "📊", rotulo: "Painel", exato: true, visivel: true },
    { rota: "/trilha", icone: "🗺️", rotulo: "Trilha Soul", visivel: true },
    { rota: "/mapa-ods", icone: "🌍", rotulo: "Mapa ODS", visivel: true },
    { rota: "/conquistas", icone: "🏆", rotulo: "Conquistas", visivel: true },
    { rota: "/historico", icone: "📜", rotulo: "Histórico", visivel: true },
    { rota: "/ranking", icone: "🏆", rotulo: "Ranking", visivel: true },
    { rota: "/perfil", icone: "👤", rotulo: "Perfil", visivel: true },
    { rota: "/comunidade", icone: "🏃", rotulo: "Comunidade", visivel: usuario.tipo === "soulsport" },
    { rota: "/validador", icone: "🔑", rotulo: "Validador", visivel: souValidador },
    { rota: "/admin/cadastros", icone: "🗂️", rotulo: "Cadastros", visivel: usuario.tipo === "admin" },
  ];

  return (
    <div className="flex-1 flex flex-col sm:flex-row bg-slate-50">
      {/* Botão hambúrguer — só aparece abaixo do breakpoint sm */}
      <section
        aria-label="Controle do menu"
        className="sm:hidden bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between"
      >
        <span className="text-sm font-semibold text-slate-700">Menu</span>
        <button
          type="button"
          onClick={() => setMenuAberto((atual) => !atual)}
          aria-expanded={menuAberto}
          aria-controls="menu-painel-mobile"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuAberto ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </section>

      {/* Menu lateral: sempre visível em telas sm+, colapsável (hambúrguer) no celular.
          Em telas grandes (lg) fica mais largo. */}
      <nav
        id="menu-painel-mobile"
        aria-label="Menu da área logada"
        className={`sm:w-56 lg:w-64 sm:shrink-0 sm:!flex bg-white border-b sm:border-b-0 sm:border-r
                    border-slate-200 px-3 py-3 flex-col gap-1 ${menuAberto ? "flex" : "hidden"}`}
      >
        {itensMenu
          .filter((item) => item.visivel)
          .map((item) => (
            <NavLink
              key={item.rota}
              to={item.rota}
              end={item.exato}
              onClick={() => setMenuAberto(false)}
              className={({ isActive }) => `${itemBase} ${isActive ? itemAtivo : itemInativo}`}
            >
              {/* emoji é decorativo: aria-hidden evita o leitor de tela ler "mapa-múndi" etc. */}
              <span aria-hidden="true">{item.icone}</span>
              {item.rotulo}
            </NavLink>
          ))}
      </nav>

      {/* min-w-0: permite que o conteúdo encolha (e role por dentro) em vez de
          alargar a página inteira, o que causava rolagem horizontal. */}
      <div className="flex-1 min-w-0 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
