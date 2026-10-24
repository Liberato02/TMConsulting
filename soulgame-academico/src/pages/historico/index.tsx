import { useAuth } from "../../hooks/useAuth";
import { ATIVIDADES } from "../../data/atividades";
import { converterPontosParaReais, formatarReais } from "../../data/conversao";
import { useTituloDocumento } from "../../hooks/useTituloDocumento";

const ICONE_CATEGORIA: Record<string, string> = {
  saude: "❤️",
  "meio-ambiente": "🌱",
  social: "🤝",
};

function formatarDataHora(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}