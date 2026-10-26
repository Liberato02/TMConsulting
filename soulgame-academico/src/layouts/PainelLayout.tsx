import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ehValidador } from "../data/tiposConta";

const itemBase =
  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors";
const itemInativo = "text-slate-600 hover:bg-slate-100";
const itemAtivo = "bg-blue-600 text-white";

export function PainelLayout() {
  const { usuario } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  if (!usuario) return null;

  const souValidador = ehValidador(usuario.tipo === "admin" ? "soulgamer" : usuario.tipo);
  const souSoulsport = usuario.tipo === "soulsport";

  const itens = (
    <>
      <NavLink
        to="/desafios"
        end
        onClick={() => setMenuAberto(false)}
        className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
      >
        📊 Painel
      </NavLink>
      <NavLink
        to="/trilha"
        onClick={() => setMenuAberto(false)}
        className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
      >
        🗺️ Trilha Soul
      </NavLink>
      <NavLink
        to="/mapa-ods"
        onClick={() => setMenuAberto(false)}
        className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
      >
        🌍 Mapa ODS
      </NavLink>
      <NavLink
        to="/conquistas"
        onClick={() => setMenuAberto(false)}
        className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
      >
        🏆 Conquistas
      </NavLink>
      <NavLink
        to="/historico"
        onClick={() => setMenuAberto(false)}
        className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
      >
        📜 Histórico
      </NavLink>
      <NavLink
        to="/ranking"
        onClick={() => setMenuAberto(false)}
        className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
      >
        🏆 Ranking
      </NavLink>
      <NavLink
        to="/perfil"
        onClick={() => setMenuAberto(false)}
        className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
      >
        👤 Perfil
      </NavLink>
      {souSoulsport && (
        <NavLink
          to="/comunidade"
          onClick={() => setMenuAberto(false)}
          className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
        >
          🏃 Comunidade
        </NavLink>
      )}
      {souValidador && (
        <NavLink
          to="/validador"
          onClick={() => setMenuAberto(false)}
          className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
        >
          🔑 Validador
        </NavLink>
      )}
      {usuario.tipo === "admin" && (
        <NavLink
          to="/admin/cadastros"
          onClick={() => setMenuAberto(false)}
          className={({ isActive }) => `${itemBase} whitespace-nowrap ${isActive ? itemAtivo : itemInativo}`}
        >
          🗂️ Cadastros
        </NavLink>
      )}
    </>
  );

  return (
    <div className="flex-1 flex flex-col sm:flex-row bg-slate-50">
      {/* Botão hambúrguer — só aparece abaixo do breakpoint sm */}
      <div className="sm:hidden bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between">
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
      </div>

      {/* Menu lateral: sempre visível em telas sm+, colapsável (hambúrguer) no celular */}
      <nav
        id="menu-painel-mobile"
        aria-label="Menu da área logada"
        className={`sm:w-56 sm:shrink-0 sm:!flex bg-white border-b sm:border-b-0 sm:border-r
                    border-slate-200 px-3 py-3 flex-col gap-1 ${menuAberto ? "flex" : "hidden"}`}
      >
        {itens}
      </nav>

      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
