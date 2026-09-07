import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { RotaProtegida } from "./routes/RotaProtegida.tsx";
import { MainLayout } from "./layouts/MainLayout";

// Cada rota mora em sua própria pasta (src/routes/nome/index.tsx),
// seguindo o padrão ensinado em aula: pasta = nome da rota, index.tsx
// dentro = o componente daquela rota.
import { Home } from "./routes/home";
import { Sobre } from "./routes/sobre";
import { Contato } from "./routes/contato";
import { Faq } from "./routes/faq";
import { Integrantes } from "./routes/integrantes";
import { Login } from "./routes/login";
import { Cadastro } from "./routes/cadastro";
import { Desafios } from "./routes/desafios";
import { Cadastros as AdminCadastros } from "./routes/admin-cadastros";
import { NaoEncontrada } from "./routes/error";

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