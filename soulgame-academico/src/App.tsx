import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { RotaProtegida } from "./pages/RotaProtegida";
// Estrutura oficial do Challenge: cada página mora em sua própria pasta
// (src/pages/nome/index.tsx).
import { MainLayout } from "./layouts/MainLayout";
import { PainelLayout } from "./layouts/PainelLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Code splitting: cada página vira um "chunk" separado, baixado só quando
// o usuário acessa a rota. O <Suspense> fica no MainLayout.
const Home = lazy(() => import("./pages/home").then((m) => ({ default: m.Home })));
const Sobre = lazy(() => import("./pages/sobre").then((m) => ({ default: m.Sobre })));
const Contato = lazy(() => import("./pages/contato").then((m) => ({ default: m.Contato })));
const Faq = lazy(() => import("./pages/faq").then((m) => ({ default: m.Faq })));
const Integrantes = lazy(() =>
  import("./pages/integrantes").then((m) => ({ default: m.Integrantes }))
);
const Login = lazy(() => import("./pages/login").then((m) => ({ default: m.Login })));
const Cadastro = lazy(() => import("./pages/cadastro").then((m) => ({ default: m.Cadastro })));
const Desafios = lazy(() => import("./pages/desafios").then((m) => ({ default: m.Desafios })));
const DetalheAtividade = lazy(() =>
  import("./pages/detalhe-atividade").then((m) => ({ default: m.DetalheAtividade }))
);
const Trilha = lazy(() => import("./pages/trilha").then((m) => ({ default: m.Trilha })));
const MapaOds = lazy(() => import("./pages/mapa-ods").then((m) => ({ default: m.MapaOds })));
const PainelConquistas = lazy(() =>
  import("./pages/painel-conquistas").then((m) => ({ default: m.PainelConquistas }))
);
const Perfil = lazy(() => import("./pages/perfil").then((m) => ({ default: m.Perfil })));
const PerfilPublico = lazy(() =>
  import("./pages/perfil-publico").then((m) => ({ default: m.PerfilPublico }))
);
const Historico = lazy(() => import("./pages/historico").then((m) => ({ default: m.Historico })));
const Ranking = lazy(() => import("./pages/ranking").then((m) => ({ default: m.Ranking })));
const ComunidadeSoulsport = lazy(() =>
  import("./pages/comunidade-soulsport").then((m) => ({ default: m.ComunidadeSoulsport }))
);
const PainelValidador = lazy(() =>
  import("./pages/validador").then((m) => ({ default: m.PainelValidador }))
);
const AdminCadastros = lazy(() =>
  import("./pages/admin-cadastros").then((m) => ({ default: m.Cadastros }))
);
const NaoEncontrada = lazy(() =>
  import("./pages/error").then((m) => ({ default: m.NaoEncontrada }))
);


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
