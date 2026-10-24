import type { Atividade } from "../types";
import { baixarLembreteICS, linkGoogleCalendar } from "../utils/calendario";

export function ModalConfirmarLembrete({
  atividade,
  dataISO,
  onFechar,
}: {
  atividade: Atividade;
  dataISO: string;
  onFechar: () => void;
}) {
  const dataFormatada = new Date(dataISO + "T00:00:00").toLocaleDateString("pt-BR");
