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

