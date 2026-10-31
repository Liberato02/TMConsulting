import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { TipoUsuario } from "../types";

interface RotaProtegidaProps {
  children: ReactNode;
  tipoPermitido?: TipoUsuario;
}

// Componente "guarda": só libera o conteúdo se o usuário estiver logado
// (e, opcionalmente, se for do tipo certo - ex: só admin entra em /admin).
export function RotaProtegida({ children, tipoPermitido }: RotaProtegidaProps) {
  const { usuario, carregando } = useAuth();

  // Enquanto a sessão salva no localStorage ainda está sendo checada,
  // evita redirecionar por engano para o login.
  if (carregando) {
    return (
      <main className="flex-1 flex items-center justify-center py-20 text-slate-400 text-sm">
        Carregando...
      </main>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (tipoPermitido && usuario.tipo !== tipoPermitido) {
    return <Navigate to="/desafios" replace />;
  }

  return <>{children}</>;
}