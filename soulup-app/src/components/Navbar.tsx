import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

const linksPublicos = [
  { rota: "/", label: "Home" },
  { rota: "/sobre", label: "Sobre" },
  { rota: "/faq", label: "FAQ" },
  { rota: "/integrantes", label: "Integrantes" },
  { rota: "/contato", label: "Contato" },
];

export function Navbar() {
  const { usuario, logout } = useAuth();
  const { mostrarToast } = useToast();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  function handleLogout() {
    logout();
    mostrarToast("Você saiu da sua conta.", "info");
    setMenuAberto(false);
    navigate("/");
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header aria-label="Cabeçalho" className="bg-blue-700 text-white sticky top-0 z-40 shadow-md">
      <nav
        aria-label="Navegação principal"
        className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3"
      >
        <Link to="/" className="text-xl font-bold tracking-tight" onClick={fecharMenu}>
          Soul<span className="text-teal-300">Game</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {linksPublicos.map((link) => (
            <li key={link.rota}>
              <Link to={link.rota} className="hover:text-blue-200 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {usuario ? (
            <>
              <Link
                to={usuario.tipo === "admin" ? "/admin/cadastros" : "/desafios"}
                className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
              >
                {usuario.tipo === "admin" ? "Painel Admin" : "Meus Desafios"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-blue-100 hover:text-white underline underline-offset-2"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold hover:text-blue-200 transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
              >
                Cadastre-se
              </Link>
            </>
          )}
        </div>

        {/* Botão hambúrguer — só aparece abaixo do breakpoint md */}
        <button
          type="button"
          onClick={() => setMenuAberto((atual) => !atual)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          aria-label={menuAberto ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuAberto ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile: só renderiza quando aberto */}
      {menuAberto && (
        <div id="menu-mobile" className="md:hidden bg-blue-700 border-t border-blue-600 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2 text-sm font-medium">
            {linksPublicos.map((link) => (
              <li key={link.rota}>
                <Link
                  to={link.rota}
                  onClick={fecharMenu}
                  className="block py-2 hover:text-blue-200 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 pt-3 border-t border-blue-600 mt-3">
            {usuario ? (
              <>
                <Link
                  to={usuario.tipo === "admin" ? "/admin/cadastros" : "/desafios"}
                  onClick={fecharMenu}
                  className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-center transition-colors"
                >
                  {usuario.tipo === "admin" ? "Painel Admin" : "Meus Desafios"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-blue-100 hover:text-white py-2 text-center"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={fecharMenu}
                  className="text-sm font-semibold py-2 text-center hover:text-blue-200 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  onClick={fecharMenu}
                  className="text-sm font-semibold bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-center transition-colors"
                >
                  Cadastre-se
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
