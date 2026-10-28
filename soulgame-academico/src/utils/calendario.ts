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
