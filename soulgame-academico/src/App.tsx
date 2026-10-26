import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { RotaProtegida } from "./pages/RotaProtegida";
// Estrutura oficial do Challenge: cada página mora em sua própria pasta
// (src/pages/nome/index.tsx).
import { MainLayout } from "./layouts/MainLayout";
import { PainelLayout } from "./layouts/PainelLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";

import { Home } from "./pages/home";
import { Sobre } from "./pages/sobre";
import { Contato } from "./pages/contato";
import { Faq } from "./pages/faq";
import { Integrantes } from "./pages/integrantes";
import { Login } from "./pages/login";
import { Cadastro } from "./pages/cadastro";
import { Desafios } from "./pages/desafios";
import { DetalheAtividade } from "./pages/detalhe-atividade";
import { Trilha } from "./pages/trilha";
import { MapaOds } from "./pages/mapa-ods";
import { PainelConquistas } from "./pages/painel-conquistas";
import { Perfil } from "./pages/perfil";
import { PerfilPublico } from "./pages/perfil-publico";
import { Historico } from "./pages/historico";
import { Ranking } from "./pages/ranking";
import { ComunidadeSoulsport } from "./pages/comunidade-soulsport";
import { PainelValidador } from "./pages/validador";
import { Cadastros as AdminCadastros } from "./pages/admin-cadastros";
import { NaoEncontrada } from "./pages/error";

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Todas as rotas abaixo compartilham Navbar + Footer via MainLayout */}
              <Route element={<MainLayout />}>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/integrantes" element={<Integrantes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />

                {/* Área logada: tudo aqui dentro compartilha o menu lateral
                    (Painel / Trilha Soul / Validador / Cadastros) */}
                <Route
                  element={
                    <RotaProtegida>
                      <PainelLayout />
                    </RotaProtegida>
                  }
                >
                  <Route path="/desafios" element={<Desafios />} />
                  {/* Rota dinâmica: :atividadeId é lido via useParams dentro
                      de DetalheAtividade */}
                  <Route path="/desafios/:atividadeId" element={<DetalheAtividade />} />
                  <Route path="/trilha" element={<Trilha />} />
                  <Route path="/mapa-ods" element={<MapaOds />} />
                  <Route path="/conquistas" element={<PainelConquistas />} />
                  <Route path="/perfil" element={<Perfil />} />
                  {/* rota dinâmica: :usuarioId vem da URL via useParams,
                      usada pelos links de cada linha do Ranking */}
                  <Route path="/perfil/:usuarioId" element={<PerfilPublico />} />
                  <Route path="/historico" element={<Historico />} />
                  <Route path="/ranking" element={<Ranking />} />

                  {/* checagem de tipo "soulsport" acontece dentro da própria página */}
                  <Route path="/comunidade" element={<ComunidadeSoulsport />} />

                  {/* checagem de capacidade "validador" acontece dentro
                      da própria página, já que vale pra vários tipos */}
                  <Route path="/validador" element={<PainelValidador />} />

                  {/* só admin acessa — a página também confere o tipo,
                      dupla camada de proteção */}
                  <Route
                    path="/admin/cadastros"
                    element={
                      <RotaProtegida tipoPermitido="admin">
                        <AdminCadastros />
                      </RotaProtegida>
                    }
                  />
                </Route>

                {/* Coringa: qualquer URL não mapeada cai aqui, mantendo
                    Navbar/Footer/Chatbot consistentes */}
                <Route path="*" element={<NaoEncontrada />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
