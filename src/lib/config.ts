// Endereço da plataforma (painel do motorista). Configure em `.env.local`:
// NEXT_PUBLIC_APP_URL=https://app.midiabordo.com.br
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.midiabordo.com.br").replace(/\/$/, "");

export const CADASTRO_URL = `${APP_URL}/cadastro`;
export const LOGIN_URL = `${APP_URL}/login`;

export const DIAS_TESTE = 14;

/** Mesmos valores da plataforma (midiabordo-plataforma/src/domain/regras.ts). Anual = pague 10, leve 12. */
export const PLANOS = [
  {
    codigo: "essencial",
    nome: "Essencial",
    mensal: 29.9,
    anual: 299,
    itens: ["Só anúncios estáticos (imagem)", "Até 10 anúncios no ar", "Ciclo de até 5 minutos"],
  },
  {
    codigo: "profissional",
    nome: "Profissional",
    mensal: 39.9,
    anual: 399,
    itens: ["Anúncios estáticos e em vídeo", "Até 15 anúncios no ar", "Ciclo de até 5 minutos"],
    destaque: true,
  },
  {
    codigo: "ilimitado",
    nome: "Ilimitado",
    mensal: 59.9,
    anual: 599,
    itens: ["Anúncios estáticos e em vídeo", "Anúncios ilimitados no ar", "Ciclo de até 8 minutos"],
  },
] as const;

export type CodigoPlanoSite = (typeof PLANOS)[number]["codigo"];

export const MENOR_MENSALIDADE = Math.min(...PLANOS.map((p) => p.mensal));

export const TELA_MINIMA_POLEGADAS = "8,7";

export function brl(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
