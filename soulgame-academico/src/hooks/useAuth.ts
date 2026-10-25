import { useContext } from "react";
import { AuthContext } from "../context/authContextInstance";
import type { AuthContextType } from "../types";

// Fica num arquivo separado do AuthProvider de propósito: quando um
// arquivo mistura componente + hook/utilitário, o Fast Refresh do Vite
// (hot reload) perde a capacidade de atualizar só aquele componente
// sem recarregar a página inteira.
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
    }
    return context;
}
