import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ehValidador } from "../data/tiposConta";

const itemBase =
  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors";
const itemInativo = "text-slate-600 hover:bg-slate-100";
const itemAtivo = "bg-blue-600 text-white";

export function PainelLayout() {
  const { usuario } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);

  if (!usuario) return null;

  const souValidador = ehValidador(usuario.tipo === "admin" ? "soulgamer" : usuario.tipo);
  const souSoulsport = usuario.tipo === "soulsport";

