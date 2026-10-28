import type { Atividade } from "../types";

function formatarDataICS(dataISO: string): string {
  return dataISO.replace(/-/g, "");
}

function escaparTextoICS(texto: string): string {
  return texto.replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function gerarConteudoICS(atividade: Atividade, dataISO: string): string {
  const dataFormatada = formatarDataICS(dataISO);
  const agora = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid = `soulgame-${atividade.id}-${dataFormatada}@soulup`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SoulGame//Trilha Soul//PT",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${agora}`,
    `DTSTART;VALUE=DATE:${dataFormatada}`,
    `SUMMARY:${escaparTextoICS(atividade.nome)} — SoulGame`,
    `DESCRIPTION:${escaparTextoICS(atividade.descricao)}. Vale +${atividade.pontos} pontos na Trilha Soul.`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Lembrete SoulGame",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function baixarLembreteICS(atividade: Atividade, dataISO: string): void {
  const conteudo = gerarConteudoICS(atividade, dataISO);
  const blob = new Blob([conteudo], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `soulgame-${atividade.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function linkGoogleCalendar(atividade: Atividade, dataISO: string): string {
  const data = formatarDataICS(dataISO);
  const parametros = new URLSearchParams({
    action: "TEMPLATE",
    text: `${atividade.nome} — SoulGame`,
    dates: `${data}/${data}`,
    details: `${atividade.descricao} Vale +${atividade.pontos} pontos na Trilha Soul.`,
  });
  return `https://calendar.google.com/calendar/render?${parametros.toString()}`;
}
