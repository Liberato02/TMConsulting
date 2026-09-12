import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { RotaProtegida } from "./pages/RotaProtegida";
import { MainLayout } from "./layouts/MainLayout";

// Cada página mora em sua própria pasta (src/pages/nome/index.tsx),
// seguindo a estrutura oficial do Challenge: componentes de página
// organizados dentro de /src/pages.
import { Home } from "./pages/home";
import { Sobre } from "./pages/sobre";
import { Contato } from "./pages/contato";
import { Faq } from "./pages/faq";
import { Integrantes } from "./pages/integrantes";
import { Login } from "./pages/login";
import { Cadastro } from "./pages/cadastro";
import { Desafios } from "./pages/desafios";
import { DetalheAtividade } from "./pages/detalhe-atividade";
import { Cadastros as AdminCadastros } from "./pages/admin-cadastros";
import { NaoEncontrada } from "./pages/error";

function App() {
  return (
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

              {/* Rota protegida: qualquer usuário logado */}
              <Route
                path="/desafios"
                element={
                  <RotaProtegida>
                    <Desafios />
                  </RotaProtegida>
                }
              />

              {/* Rota dinâmica: :atividadeId é lido via useParams dentro
                  de DetalheAtividade, para exibir os dados daquela
                  atividade específica */}
              <Route
                path="/desafios/:atividadeId"
                element={
                  <RotaProtegida>
                    <DetalheAtividade />
                  </RotaProtegida>
                }
              />

              {/* Rota protegida: só admin (time que cuida da base) */}
              <Route
                path="/admin/cadastros"
                element={
                  <RotaProtegida tipoPermitido="admin">
                    <AdminCadastros />
                  </RotaProtegida>
                }
              />

              {/* Coringa: qualquer URL não mapeada cai aqui (não deixa
                  o usuário numa tela em branco) */}
              <Route path="*" element={<NaoEncontrada />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;