import { createContext } from "react";
import type { AuthContextType } from "../types";

// Só o objeto de contexto, sem nenhum componente — separado do
// AuthProvider por causa da mesma regra de Fast Refresh: um arquivo
// que mistura componente com "outra coisa" (aqui, o Context em si)
// perde a atualização a quente no Vite.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
