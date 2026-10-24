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

    function handleBaixarICS() {
    baixarLembreteICS(atividade, dataISO);
    onFechar();
  }

  function handleGoogleCalendar() {
    window.open(linkGoogleCalendar(atividade, dataISO), "_blank", "noopener,noreferrer");
    onFechar();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Confirmar lembrete de calendário"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold text-blue-800 mb-1">Data salva! 📅</h2>
        <p className="text-sm text-slate-600 mb-4">
          <strong>{atividade.nome}</strong> agendada para{" "}
          <strong>{dataFormatada}</strong>. Quer enviar um lembrete para o
          calendário do seu celular?
        </p>
