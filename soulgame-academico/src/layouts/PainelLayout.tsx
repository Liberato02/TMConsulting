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

