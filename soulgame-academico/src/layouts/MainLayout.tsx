import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Layout compartilhado: Navbar e Footer aparecem em TODAS as páginas,
// e <Outlet /> é onde o React Router injeta a página da rota atual.
// Isso evita repetir <Navbar /><Footer /> em cada arquivo de página.
export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Link "pular para o conteúdo" — só aparece com foco de teclado (Tab).
          Ajuda quem navega sem mouse a não precisar passar pela Navbar
          inteira toda vez que muda de página. */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50
                   focus:bg-white focus:text-blue-800 focus:px-4 focus:py-2 focus:rounded-lg
                   focus:shadow-lg focus:font-semibold"
      >
        Pular para o conteúdo
      </a>

      <Navbar />
      <div id="conteudo-principal" className="flex-1 flex flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}